import { css, Theme } from '@emotion/react';
import { getWeekOfMonth, isEqual } from 'date-fns';
import { Calendar } from '../components/calendar/Calendar';
import { Expenses } from '../reducer/householdBookSlice';
import { Drawer } from '../components/drawer/Drawer';
import { Receipt } from '../components/receipt/Receipt';

/**
 * 特定の日のレシートだけ抽出する
 * TODO ここにいてよいのかは謎、Sliceに移すべきかもしれない
 */
export const extractTargetDayReceipt = (expenses: Expenses, targetDate: Date) => {
  const weeklyReceipts = expenses[getWeekOfMonth(targetDate)].filter((receipt) => receipt);
  const dailyReceipt = weeklyReceipts.filter((wr) => wr.date && isEqual(wr.date, targetDate))[0].receipts;
  return dailyReceipt;
};

export const HouseholdBookView = () => (
  <>
    <div css={drawer}>
      <Drawer />
    </div>
    <div css={householdBookContainer}>
      <div css={calendarContainer}>
        <Calendar />
      </div>
      <div css={receiptContainer}>
        <Receipt />
      </div>
    </div>
  </>
);

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
