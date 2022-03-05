import { getDate, isEqual } from 'date-fns';
import styled from 'styled-components';
import { selectEdittingDate } from '../../reducer/householdBookSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { MonthSelector } from '../common/month_selector/MonthSelector';
import { DayPanel } from './day_panel/DayPanel';
import { Header } from './header/Header';

interface Props {
  datas: {
    [key: number]: (null | { date: Date; receipts: { storeName: string; cost: number }[] | [] | null })[];
  };
  today: Date;
}

export const Calendar: React.FC<Props> = ({ datas, today }: Props) => {
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
  const dispatch = useAppDispatch();
  const targetDate = useAppSelector((state) => state.householdBook.targetDate);

  const handleOnClick = (dateIndex: number) => {
    dispatch(selectEdittingDate(dateIndex));
  };
  return (
    <Container>
      <div>
        <MonthSelector targetDate={targetDate} locale="en" />
      </div>
      <div>
        <Header locale="en" />
      </div>
      <Sample>
        {Object.values(datas).map((week) => (
          <Week>
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
          </Week>
        ))}
      </Sample>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Week = styled.div`
  width: 100%;
  height: calc(100% / 6);
  display: flex;
  gap: 8px;
`;

const Sample = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
