import { Button } from '@material-ui/core';
import { getMonth, getYear } from 'date-fns';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import MonthlyReceiptModel from '../receipt/model/MonthlyReceiptModel';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { showNextMonth, showPrevMonth, updateMonthlyReceipt } from '../../reducer/householdBookSlice';

export const CalendarHeader: React.FC = () => {
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const dispatch = useAppDispatch();
    const dayOfWeekLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const getPreviousMonth = () => {
        dispatch(showPrevMonth());
        const monthlyReceipt = new MonthlyReceiptModel(targetDate, undefined);
        dispatch(updateMonthlyReceipt(monthlyReceipt));
    }

    const getNextMonth = () => {
        dispatch(showNextMonth());
        const monthlyReceipt = new MonthlyReceiptModel(targetDate, undefined);
        dispatch(updateMonthlyReceipt(monthlyReceipt));
    }

    return (
        <SC.CalendarHeader>
            <SC.MonthSelector>
                <div>
                    {(targetDate).toLocaleDateString('en-US', { month: 'long' })} {getYear(targetDate)}
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