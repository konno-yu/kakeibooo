import DailyReceiptModel from "../receipt/model/DailyReceiptModel";
import { CalendarBodyDay } from './CalendarBodyDay';
import styled from "styled-components";
import { getDate } from "date-fns";

interface CalendarBodyWeekProps {
    value: [DailyReceiptModel, DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel,DailyReceiptModel]
}

export const CalendarBodyWeek: React.FC<CalendarBodyWeekProps> = (props) => {

    return (
        <SC.CalendarBodyWeek>
            {props.value.map(dailyReceipt => {
                return dailyReceipt ?
                    <CalendarBodyDay value={dailyReceipt.getDailyTotalCost()}>{getDate(dailyReceipt.date)}</CalendarBodyDay>
                    :<CalendarBodyDay value={null} />
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