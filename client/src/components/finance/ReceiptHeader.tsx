import * as React from 'react';
import { financeContext, useFinance } from './FinanceContext';
import * as dfns from 'date-fns';

const ReceiptHeader: React.FC = () => {
    const dayOfWeekLabel = ['日', '月', '火', '水', '木', '金', '土'];
    const getDisplayYMDD = (targetDate: Date) => {
        const zeroPadding = (val: number) => ('000' + val).slice(-2);
        return [
            dfns.getYear(targetDate),
            zeroPadding(dfns.getMonth(targetDate) + 1),
            zeroPadding(dfns.getDate(targetDate)),
            dayOfWeekLabel[dfns.getDay(targetDate)]
        ]
    }
    const context = React.useContext(financeContext);
    const [dispYear, dispMonth, dispDate, dispDay] = getDisplayYMDD(context.targetDate);

    return (
        <div className="root--header">
            <div className="title">Kakeibooo</div>
            <div className="date">
                {dispYear}/{dispMonth}/{dispDate}（{dispDay}）</div>
        </div>
    )
}

export default ReceiptHeader;