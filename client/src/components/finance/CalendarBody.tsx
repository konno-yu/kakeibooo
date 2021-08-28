import { CalendarBodyWeek } from "./CalendarBodyWeek";
import { useEffect } from "react";
import * as FinanceRest from '../../rest/financeRest';
import MonthlyReceiptModel from "./model/MonthlyReceiptModel";
import { getYear, getMonth } from 'date-fns';
import { useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateMonthlyReceipt } from "../../reducer/householdBookSlice";

export const CalendarBody: React.FC = () => {
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const monthlyReceipt = useAppSelector(state => state.householdBook.monthlyReceipt);
    const dispatch = useAppDispatch();

    const prevTargetDate = useRef<Date>();

    useEffect(() => {
        if (prevTargetDate.current && (getMonth(prevTargetDate.current) === getMonth(targetDate))) return;
        const fetch = async () => {
            const thisYear = getYear(targetDate);
            const thisMonth = getMonth(targetDate)
            const res = await FinanceRest.getByMonth(thisYear, thisMonth);
            dispatch(updateMonthlyReceipt(new MonthlyReceiptModel(thisYear, thisMonth, res.data)));
        }
        fetch();
    }, [targetDate]);

    return (
        <SC.CalendarBody>
            {
                Object.values((monthlyReceipt).monthlyReceipt).map(week => {
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