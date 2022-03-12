import * as React from 'react';
import { css } from '@emotion/react';
import { getWeekOfMonth, isEqual } from 'date-fns';
import { Calendar } from '../components/calendar/Calendar';
import { Receipt } from '../components/receipt/Receipt';
import { useAppSelector } from '../store';

/**
 * 特定の日のレシートだけ抽出する
 * TODO ここにいてよいのかは謎、Sliceに移すべきかもしれない
 */
export const extractTargetDayReceipt = (
  receipts: {
    [key: number]: (null | {
      date: Date;
      receipts: { index: number; storeName: string; cost: number }[] | [] | null;
    })[];
  },
  targetDate: Date
) => {
  const weeklyReceipt = receipts[getWeekOfMonth(targetDate)].filter((receipt) => receipt);
  const dailyReceipt = weeklyReceipt.filter((wr) => wr.date && isEqual(wr.date, targetDate))[0].receipts;
  return dailyReceipt;
};

export const HouseholdBookView: React.FC = () => {
  const receipts = useAppSelector((state) => state.householdBook.receipts);
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  const getTags = () => extractTargetDayReceipt(receipts, targetDate);

  return (
    <div css={householdBookContainer}>
      <div css={calendarContainer}>
        <Calendar today={today} datas={receipts} />
      </div>
      <div css={receiptContainer}>
        <Receipt tags={getTags()} />
      </div>
    </div>
  );
};

const householdBookContainer = css`
  height: calc(100vh - 24px);
  width: calc(100% - 24px);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const calendarContainer = css`
  width: 75%;
`;

const receiptContainer = css`
  width: 25%;
`;
