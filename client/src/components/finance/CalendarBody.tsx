import CalendarBodyWeek from "./CalendarBodyWeek";
import { useContext } from "react";
import { financeContext } from "./FinanceContext";
import { useEffect } from "react";
import * as FinanceRest from '../../rest/financeRest';
import MonthlyReceiptModel from "./model/MonthlyReceiptModel";
import { getYear, getMonth } from 'date-fns';
import { useRef } from "react";
import { receiptContext } from "./ReceiptContext";

const CalendarBody: React.FC = () => {
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
        <div className="root--body">
            {
                Object.values((context.monthlyReceipt).monthlyReceipt).map(week => {
                    return <CalendarBodyWeek value={ week }/>
                })
            }
        </div>
    )
}

export default CalendarBody;