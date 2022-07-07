import { css, Theme } from '@emotion/react';
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

export const Calendar = () => {
  const dispatch = useAppDispatch();
  const today = new Date(new Date().setHours(9, 0, 0, 0));
  const expenses = useAppSelector((state) => state.householdBook.expenses);
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
        <Header />
      </div>
      <div css={monthContainer}>
        {Object.values(expenses).map((week) => (
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

const container = (theme: Theme) => css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.units.px8};
`;

const weekContainer = (theme: Theme) => css`
  width: 100%;
  height: calc(100% / 6);
  display: flex;
  gap: ${theme.units.px8};
`;

const monthContainer = (theme: Theme) => css`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.units.px8};
`;
