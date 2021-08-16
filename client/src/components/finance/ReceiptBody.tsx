import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { financeContext } from './FinanceContext';
import DailyReceiptModel from './model/DailyReceiptModel';
import { WeekIndex } from './model/MonthlyReceiptModel';
import ReceiptModel from './model/ReceiptModel';
import { receiptContext } from './ReceiptContext';
import { ReceiptTag } from './ReceiptTag';
import { getDay, getMonth, getWeekOfMonth } from 'date-fns';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';

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
        <SC.ReceiptBody>
            <SC.ReceiptPart>
                {
                    (rContext.dailyReceipt.receipts).map((receipt, ordinary) => <ReceiptTag model={receipt} ordinary={ordinary}></ReceiptTag>)
                }
                <SC.AddReceiptButton fullWidth variant="outlined" onClick={addReceiptTag} disabled={isAddButtonDisabled}>+ レシートを追加</SC.AddReceiptButton>
            </SC.ReceiptPart>
            <SC.SummartionPart>
                <div>合計</div>
                <div>￥{rContext.dailyReceipt.getDailyTotalCost()}</div>
            </SC.SummartionPart>
        </SC.ReceiptBody>
    )
}

const SC = {
    ReceiptBody: styled.div`
        height: 70%;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `,
    ReceiptPart: styled.div`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `,
    AddReceiptButton: styled(Button)`
        width: 80%;
        border-color: #546e7a;
        color: #546e7a;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 600;
        font-family: "M PLUS Rounded 1c", sans-serif;
    `,
    SummartionPart: styled.div`
        width: calc(100% - 16px);
        font-size: 24px;
        font-weight: 900;
        color: #546E7A;
        display: flex;
        justify-content: space-between;
    `
};