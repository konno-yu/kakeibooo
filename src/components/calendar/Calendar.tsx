import { getDate, isEqual } from "date-fns";
import { setDate } from "date-fns/esm";
import styled from "styled-components";
import { selectEdittingDate } from "../../reducer/householdBookSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { MonthSelector } from "../common/month_selector/MonthSelector";
import { DayPanel } from "./day_panel/DayPanel";
import { Header } from "./header/Header";

interface Props {
    datas: { [key in number]: { date: Date, totalCost: number }[] },
    today: Date;
}

export const Calendar: React.FC<Props> = ({
    datas,
    today,
}) => {
    const getPanelType = (cost: number) => {
        if (cost === 0) return 'zero';
        if (cost <= 1000) return 'low';
        if (cost > 2500) return 'high';
        return 'normal';
    }
    const dispatch = useAppDispatch();
    const targetDate = useAppSelector(state => state.householdBook.targetDate);

    const handleOnClick = (dateIndex: number) => {
        dispatch(selectEdittingDate(dateIndex));
    }
    return (
        <Container>
            <div><MonthSelector targetDate={targetDate} locale="en" /></div>
            <div><Header locale="en" /></div>
            <Sample>
                {
                    Object.values(datas).map(week => {
                        return <Week>{
                            week.map(day => {
                                if (day === null) {
                                    return <DayPanel type="normal" dayIndex={null} isSelected={false} isToday={false} />
                                }
                                return <DayPanel
                                    type={getPanelType(day.totalCost)}
                                    dayIndex={getDate(day.date)}
                                    isSelected={isEqual(day.date, targetDate)}
                                    isToday={isEqual(day.date, today)}
                                    onClick={handleOnClick}
                                >{day.totalCost}</DayPanel>
                            })
                        }</Week>
                    })
                }
            </Sample>
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
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
`