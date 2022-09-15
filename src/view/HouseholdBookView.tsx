import { css, Theme } from '@emotion/react';
import { getDay, getWeekOfMonth, isEqual } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { FlexBox } from '../components/common/flex_box/FlexBox';
import { Drawer } from '../components/drawer/Drawer';
import { Receipt } from '../components/receipt/Receipt';
import {
  fetchMonthlyExpenses,
  postDailyExpenses,
  Receipt as ReceiptDef,
  selectEdittingDate,
  shiftNextMonth,
  shiftPreviousMonth,
  updateDailyExpenses,
} from '../reducer/householdBookSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const HouseholdBookView = () => {
  const expenses = useAppSelector((state) => state.householdBook.expenses);
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);
  const dispatch = useAppDispatch();

  const extractTargetDateReceipts = useCallback(() => {
    const weeklyReceipts = expenses[getWeekOfMonth(targetDate)].filter((r) => r);
    return weeklyReceipts.filter((wr) => wr.date && isEqual(wr.date, targetDate))[0].receipts;
  }, [expenses, targetDate]);

  const isNoPersistenceReceipt = useCallback(
    () => expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts == null,
    [expenses, targetDate]
  );

  const [receipts, setReceipts] = useState(extractTargetDateReceipts());
  const [isPost, setIsPost] = useState(isNoPersistenceReceipt());

  useEffect(() => {
    setReceipts(extractTargetDateReceipts());
  }, [extractTargetDateReceipts]);

  useEffect(() => {
    setIsPost(isNoPersistenceReceipt());
  }, [isNoPersistenceReceipt]);

  useEffect(() => {
    // 日付が変わったらその月の食費を取得し直す
    // TODO ほんとうは日付変更時に月が変わった時だけ発火させるべき
    const fetch = async () => {
      await dispatch(fetchMonthlyExpenses());
    };
    void fetch();
  }, [targetDate, dispatch]);

  // TODO useCallback化
  const handleRegist = async (_receipts: ReceiptDef[] | [] | null) => {
    if (isPost) {
      await dispatch(postDailyExpenses(_receipts));
    } else {
      await dispatch(updateDailyExpenses(_receipts));
    }
  };

  // TODO useCallback化
  // TODO 結局dispatchの中身は一緒なので↑と統一できる？
  const handleNoMoney = async () => {
    if (isPost) {
      await dispatch(postDailyExpenses([]));
    } else {
      await dispatch(updateDailyExpenses([]));
    }
  };

  const handleClick = useCallback(
    (index: number) => {
      dispatch(selectEdittingDate(index));
    },
    [dispatch]
  );

  const handleClickOnPrev = useCallback(() => {
    dispatch(shiftPreviousMonth());
  }, [dispatch]);

  const handleClickOnNext = useCallback(() => {
    dispatch(shiftNextMonth());
  }, [dispatch]);

  return (
    <>
      <div css={drawer}>
        <Drawer />
      </div>
      <FlexBox direction="row" justifyContent="space-between" gap={8} css={householdBookContainer}>
        <div css={calendarContainer}>
          <Calendar
            expenses={expenses}
            targetDate={targetDate}
            onClick={handleClick}
            onClickPrev={handleClickOnPrev}
            onClickNext={handleClickOnNext}
          />
        </div>
        <div css={receiptContainer}>
          <Receipt
            receipts={receipts}
            targetDate={targetDate}
            onClickRegist={handleRegist}
            onClickNoMoney={handleNoMoney}
          />
        </div>
      </FlexBox>
    </>
  );
};

export const drawer = (theme: Theme) => css`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: 100vh;
  width: 15%;
  border-right: 1px solid ${theme.colors.gray_300};
`;

const householdBookContainer = (theme: Theme) => css`
  background: ${theme.colors.gray_100};
  height: calc(100vh - 24px);
  width: calc(85% - 24px);
  padding: ${theme.units.px12};
`;

const calendarContainer = css`
  width: 75%;
`;

const receiptContainer = css`
  width: 25%;
`;
