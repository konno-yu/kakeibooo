import DailyReceiptModel from "./model/DailyReceiptModel";
import { CalendarBodyDay } from './CalendarBodyDay';
import styled from "styled-components";

interface CalendarBodyWeekProps {
    value: [DailyReceiptModel, DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel]
}

export const CalendarBodyWeek: React.FC<CalendarBodyWeekProps> = (props) => {

    return (
        <SC.CalendarBodyWeek>
            {props.value.map(dailyReceipt => {
                if (dailyReceipt) {
                    return <CalendarBodyDay value={dailyReceipt.getDailyTotalCost()}>{dailyReceipt.getDate()}</CalendarBodyDay>
                } else {
                    return <CalendarBodyDay value={null} />
                }
            })}
        </SC.CalendarBodyWeek>
    )
}

const SC = {
    CalendarBodyWeek: styled.div`
        height: calc(100% / 6);
        display: flex;
    `
};