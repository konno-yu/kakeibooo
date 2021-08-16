import { CalendarBodyWeek } from "./CalendarBodyWeek";
import { useContext } from "react";
import { financeContext } from "./FinanceContext";
import { useEffect } from "react";
import * as FinanceRest from '../../rest/financeRest';
import MonthlyReceiptModel from "./model/MonthlyReceiptModel";
import { getYear, getMonth } from 'date-fns';
import { useRef } from "react";
import { receiptContext } from "./ReceiptContext";
import styled from "styled-components";

export const CalendarBody: React.FC = () => {
    const context = useContext(financeContext);
    const rContext = useContext(receiptContext);
    const prevTargetDate = useRef<Date>();

    useEffect(() => {
        if (prevTargetDate.current && (getMonth(prevTargetDate.current) === getMonth(context.targetDate))) return;
        const fetch = async () => {
            const thisYear = getYear(context.targetDate);
            const thisMonth = getMonth(context.targetDate)
            const res = await FinanceRest.getByMonth(thisYear, thisMonth);
            context.setMonthlyReceipt(new MonthlyReceiptModel(thisYear, thisMonth, res.data));
        }
        fetch();
    }, [context.targetDate]);

    return (
        <SC.CalendarBody>
            {
                Object.values((context.monthlyReceipt).monthlyReceipt).map(week => {
                    return <CalendarBodyWeek value={ week }/>
                })
            }
        </SC.CalendarBody>
    )
}

const SC = {
    CalendarBody: styled.div`
        height: 90%;
        padding-top: 12px;
    `
};