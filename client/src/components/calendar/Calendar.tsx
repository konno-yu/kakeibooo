import { getDate, isEqual } from "date-fns";
import styled from "styled-components";
import { MonthSelector } from "../common/MonthSelector";
import { DayPanel } from "./DayPanel";
import { Header } from "./Header";

interface Props {
    datas: { [key in number]: { date: Date, totalCost: number }[] },
    today: Date;
    selected: Date;
}

export const Calendar: React.FC<Props> = ({
    datas,
    today,
    selected
}) => {
    const getPanelType = (cost: number) => {
        if (cost === 0) return 'zero';
        if (cost <= 1000) return 'low';
        if (cost > 2500) return 'high';
        return 'normal';
    }
    return (
        <Container>
            <div><MonthSelector targetDate={new Date()} /></div>
            <div><Header /></div>
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
                                    isSelected={isEqual(day.date, selected)}
                                    isToday={isEqual(day.date, today)}
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