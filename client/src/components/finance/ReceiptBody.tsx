import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { financeContext } from './FinanceContext';
import DailyReceiptModel from './model/DailyReceiptModel';
import { WeekIndex } from './model/MonthlyReceiptModel';
import ReceiptModel from './model/ReceiptModel';
import { receiptContext } from './ReceiptContext';
import { getDate, getDay, getMonth, getWeekOfMonth } from 'date-fns';
import { ReceiptTag } from './ReceiptTag';
import { useEffect } from 'react';
import { useRef } from 'react';

export const ReceiptBody: React.FC = () => {
    const rContext = useContext(receiptContext);
    const fContext = useContext(financeContext);
    const isAddButtonDisabled = rContext.dailyReceipt.isReachDailyMax();
    const prevTargetDate = useRef<Date>();

    useEffect(() => {
        if (prevTargetDate.current && (getMonth(prevTargetDate.current) !== getMonth(fContext.targetDate))) return;
        const targetDateReceipt = fContext.monthlyReceipt.monthlyReceipt[getWeekOfMonth(fContext.targetDate) as WeekIndex][getDay(fContext.targetDate)];
        if (targetDateReceipt && targetDateReceipt.getDailyTotalCost() > 0) {
            rContext.setDailyReceipt(new DailyReceiptModel(targetDateReceipt.receipts));
        } else {
            rContext.setDailyReceipt(new DailyReceiptModel([]));
        }
    }, [fContext.targetDate]);

    const addReceiptTag = () => {
        const current = rContext.dailyReceipt;
        current.add(new ReceiptModel(new Date(), "", 0));
        rContext.setDailyReceipt(new DailyReceiptModel(current.receipts));
    }

    return (
        <div className="root--body">
            <div className="sample">
                {
                    (rContext.dailyReceipt.receipts).map((receipt, ordinary) => <ReceiptTag model={receipt} ordinary={ordinary}></ReceiptTag>)
                }
                <Button className={isAddButtonDisabled ? "btn--add-receipt disabled" : "btn--add-receipt"} fullWidth variant="outlined" onClick={addReceiptTag} disabled={isAddButtonDisabled}>+ レシートを追加</Button>
            </div>
            <div　className="sum">
                <div>合計</div>
                <div>￥{rContext.dailyReceipt.getDailyTotalCost()}</div>
            </div>
        </div>
    )
}

