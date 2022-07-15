import { css, Theme } from '@emotion/react';
import { getDay, getWeekOfMonth, isEqual } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Calendar } from '../components/calendar/Calendar';
import { Drawer } from '../components/drawer/Drawer';
import { Receipt } from '../components/receipt/Receipt';
import { useAppSelector } from '../store';

export const HouseholdBookView = () => {
  const expenses = useAppSelector((state) => state.householdBook.expenses);
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);

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

  return (
    <>
      <div css={drawer}>
        <Drawer />
      </div>
      <div css={householdBookContainer}>
        <div css={calendarContainer}>
          <Calendar />
        </div>
        <div css={receiptContainer}>
          <Receipt receipts={receipts} targetDate={targetDate} isPost={isPost} />
        </div>
      </div>
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
  display: flex;
  justify-content: space-between;
  gap: ${theme.units.px8};
`;

const calendarContainer = css`
  width: 75%;
`;

const receiptContainer = css`
  width: 25%;
`;
