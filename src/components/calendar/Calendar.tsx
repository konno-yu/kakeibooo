import { css } from '@emotion/react';
import { getDate, isEqual } from 'date-fns';
import { Expenses } from '../../reducer/householdBookSlice';
import { FlexBox } from '../common/flex_box/FlexBox';
import { MonthSelector } from '../common/month_selector/MonthSelector';
import { DayPanel } from './day_panel/DayPanel';
import { Header } from './header/Header';

interface CalendarProps {
  /** 編集対象の日付 */
  targetDate: Date;
  /** 編集対象月の食費 */
  expenses: Expenses;
  /** セルをクリックしたときの動作 */
  onClick: (index: number) => void;
  /** 「←」をクリックしたときの動作 */
  onClickPrev: () => void;
  /** 「→」をクリックしたときの動作 */
  onClickNext: () => void;
}

export const Calendar = ({ targetDate, expenses, onClick, onClickPrev, onClickNext }: CalendarProps) => {
  const today = new Date(new Date().setHours(9, 0, 0, 0));

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
    onClick(dateIndex);
  };

  const handleOnPrev = () => {
    onClickPrev();
  };

  const handleOnNext = () => {
    onClickNext();
  };

  return (
    <FlexBox direction="column" gap={8} css={container}>
      <div>
        <MonthSelector targetDate={targetDate} locale="en" onPrev={handleOnPrev} onNext={handleOnNext} />
      </div>
      <div>
        <Header />
      </div>
      <FlexBox direction="column" gap={8} css={monthContainer}>
        {Object.values(expenses).map((week) => (
          <FlexBox direction="row" gap={8} css={weekContainer}>
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
          </FlexBox>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

const container = css`
  width: 100%;
  height: 100%;
`;

const weekContainer = css`
  width: 100%;
  height: calc(100% / 6);
`;

const monthContainer = css`
  height: 100%;
`;
