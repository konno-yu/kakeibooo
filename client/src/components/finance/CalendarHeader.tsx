import { Button } from '@material-ui/core';
import * as dfns from 'date-fns';
import { useContext } from 'react';
import { financeContext, useFinance } from './FinanceContext';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import MonthlyReceiptModel from './model/MonthlyReceiptModel';
const CalendarHeader: React.FC = () => {
    const dayOfWeekLabel = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const context = useContext(financeContext);

    const getPreviousMonth = () => {
        const targetDate = dfns.setMonth(context.targetDate, dfns.getMonth(context.targetDate) - 1);
        const monthlyReceipt = new MonthlyReceiptModel(dfns.getYear(targetDate), dfns.getMonth(targetDate));
        context.setMonthlyReceipt(monthlyReceipt);
        context.setTargetDate(targetDate);
    }

    const getNextMonth = () => {
        const targetDate = dfns.setMonth(context.targetDate, dfns.getMonth(context.targetDate) + 1);
        const monthlyReceipt = new MonthlyReceiptModel(dfns.getYear(targetDate), dfns.getMonth(targetDate));
        context.setMonthlyReceipt(monthlyReceipt);
        context.setTargetDate(targetDate);
    }

    return (
        <div className="root--header">
            <div className="year-and-month">
                <div>
                    {(context.targetDate).toLocaleDateString('en-US', { month: 'long' })} {dfns.getYear(context.targetDate)}
                </div>
                <div>
                    <Button onClick={getPreviousMonth}>
                        <HiArrowCircleLeft size={28} color="#546e7a" />
                    </Button>
                    <Button onClick={getNextMonth}>
                        <HiArrowCircleRight size={28} color="#546e7a" />
                    </Button>
                </div>
            </div>
            <div className="day-of-week">
                {
                    dayOfWeekLabel.map(str => <div className="element">{str}</div>)
                }
            </div>
        </div>
    )
}

export default CalendarHeader;