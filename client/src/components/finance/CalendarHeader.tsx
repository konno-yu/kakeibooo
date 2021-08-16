import { Button } from '@material-ui/core';
import { getMonth, setMonth, getYear } from 'date-fns';
import { useContext } from 'react';
import { financeContext } from './FinanceContext';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import MonthlyReceiptModel from './model/MonthlyReceiptModel';
import styled from 'styled-components';

export const CalendarHeader: React.FC = () => {
    const dayOfWeekLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const context = useContext(financeContext);

    const getPreviousMonth = () => {
        const targetDate = setMonth(context.targetDate, getMonth(context.targetDate) - 1);
        const monthlyReceipt = new MonthlyReceiptModel(getYear(targetDate), getMonth(targetDate));
        context.setMonthlyReceipt(monthlyReceipt);
        context.setTargetDate(targetDate);
    }

    const getNextMonth = () => {
        const targetDate = setMonth(context.targetDate, getMonth(context.targetDate) + 1);
        const monthlyReceipt = new MonthlyReceiptModel(getYear(targetDate), getMonth(targetDate));
        context.setMonthlyReceipt(monthlyReceipt);
        context.setTargetDate(targetDate);
    }

    return (
        <SC.CalendarHeader>
            <SC.MonthSelector>
                <div>
                    {(context.targetDate).toLocaleDateString('en-US', { month: 'long' })} {getYear(context.targetDate)}
                </div>
                <div>
                    <Button onClick={getPreviousMonth}>
                        <HiArrowCircleLeft size={28} color="#546e7a" />
                    </Button>
                    <Button onClick={getNextMonth}>
                        <HiArrowCircleRight size={28} color="#546e7a" />
                    </Button>
                </div>
            </SC.MonthSelector>
            <SC.DayOfWeek>
                {
                    dayOfWeekLabel.map(str => <SC.DayOfWeekElm>{str}</SC.DayOfWeekElm>)
                }
            </SC.DayOfWeek>
        </SC.CalendarHeader>
    )
}

const SC = {
    CalendarHeader: styled.div`
        height: 10%;
        display: flex;
        flex-direction: column;
    `,
    MonthSelector: styled.div`
        height: 50%;
        font-size: 24px;
        color: #546E7A;
        font-weight: 900;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    DayOfWeek: styled.div`
        height: 50%;
        display: flex;
        align-items: flex-end;
    `,
    DayOfWeekElm: styled.div`
        width: calc(100% / 7);
        padding-bottom: 2px;
        font-size: 14px;
        font-weight: 800;
        color: #546E7A;
        border-bottom: 1.5px solid #546E7A;
    `
};