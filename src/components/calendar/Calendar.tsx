import { css } from '@emotion/react';
import { getDate, isEqual } from 'date-fns';
import { useEffect } from 'react';
import {
  selectEdittingDate,
  shiftPreviousMonth,
  shiftNextMonth,
  fetchMonthlyExpenses,
} from '../../reducer/householdBookSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { MonthSelector } from '../common/month_selector/MonthSelector';
import { DayPanel } from './day_panel/DayPanel';
import { Header } from './header/Header';

export interface CalendarProps {
  /** カレンダーに表示するデータを指定します */
  datas: {
    // TODO 型もっとキレイに書けるはず
    [key: number]: (null | { date: Date; receipts: { storeName: string; cost: number }[] | [] | null })[];
  };
  /** 今日の日付を指定します */
  // TODO 明示的に指定する必要はないかも
  today: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ datas, today }: CalendarProps) => {
  const dispatch = useAppDispatch();
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchMonthlyExpenses());
    };
    void fetch();
  }, [targetDate, dispatch]);

  const getPanelType = (cost: number) => {
    if (cost === 0) return 'zero';
    if (cost <= 1000) return 'low';
    if (cost > 2500) return 'high';
    return 'normal';
  };

  const calculateTotalCost = (receipts: { storeName: string; cost: number }[]) => {
    let totalCost = 0;
    // eslint-disable-next-line no-return-assign
    receipts.forEach((r) => (totalCost += r.cost));
    return totalCost;
  };

  const handleOnClick = (dateIndex: number) => {
    dispatch(selectEdittingDate(dateIndex));
  };

  const handleOnPrev = () => {
    dispatch(shiftPreviousMonth());
  };

  const handleOnNext = () => {
    dispatch(shiftNextMonth());
  };

  return (
    <div css={container}>
      <div>
        <MonthSelector targetDate={targetDate} locale="en" onPrev={handleOnPrev} onNext={handleOnNext} />
      </div>
      <div>
        <Header locale="en" />
      </div>
      <div css={monthContainer}>
        {Object.values(datas).map((week) => (
          <div css={weekContainer}>
            {week.map((day) => {
              if (day === null) {
                return <DayPanel type="normal" dayIndex={null} isSelected={false} isToday={false} />;
              }
              if (day.receipts === null) {
                return (
                  <DayPanel
                    type="normal"
                    dayIndex={getDate(day.date)}
                    isSelected={isEqual(day.date, targetDate)}
                    isToday={isEqual(day.date, today)}
                    onClick={handleOnClick}
                  >
                    {null}
                  </DayPanel>
                );
              }
              const totalCost = day.receipts.length === 0 ? 0 : calculateTotalCost(day.receipts);
              return (
                <DayPanel
                  type={getPanelType(totalCost)}
                  dayIndex={getDate(day.date)}
                  isSelected={isEqual(day.date, targetDate)}
                  isToday={isEqual(day.date, today)}
                  onClick={handleOnClick}
                >
                  {totalCost}
                </DayPanel>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const container = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const weekContainer = css`
  width: 100%;
  height: calc(100% / 6);
  display: flex;
  gap: 8px;
`;

const monthContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
