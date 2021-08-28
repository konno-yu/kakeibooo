import { Button } from '@material-ui/core';
import { WeekIndex } from './model/MonthlyReceiptModel';
import ReceiptModel from './model/ReceiptModel';
import { ReceiptTag } from './ReceiptTag';
import { getDay, getMonth, getWeekOfMonth } from 'date-fns';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateDailyReceipt } from '../../reducer/householdBookSlice';

export const ReceiptBody: React.FC = () => {
    const dailyReceipt = useAppSelector(state => state.householdBook.dailyReceipt);
    const monthlyReceipt = useAppSelector(state => state.householdBook.monthlyReceipt);
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const dispatch = useAppDispatch();

    const isAddButtonDisabled = dailyReceipt.isReachDailyMax();
    const prevTargetDate = useRef<Date>();

    useEffect(() => {
        if (prevTargetDate.current && (getMonth(prevTargetDate.current) !== getMonth(targetDate))) return;
        const targetDateReceipt = monthlyReceipt.monthlyReceipt[getWeekOfMonth(targetDate) as WeekIndex][getDay(targetDate)];
        if (targetDateReceipt && targetDateReceipt.getDailyTotalCost() > 0) {
            dispatch(updateDailyReceipt(targetDateReceipt.receipts));
        } else {
            dispatch(updateDailyReceipt([]));
        }
    }, [targetDate]);

    const addReceiptTag = () => {
        const current = dailyReceipt;
        current.add(new ReceiptModel(new Date(), "", 0));
        dispatch(updateDailyReceipt(current.receipts));
    }

    return (
        <SC.ReceiptBody>
            <SC.ReceiptPart>
                {
                    (dailyReceipt.receipts).map((receipt, ordinary) => <ReceiptTag model={receipt} ordinary={ordinary}></ReceiptTag>)
                }
                <SC.AddReceiptButton fullWidth variant="outlined" onClick={addReceiptTag} disabled={isAddButtonDisabled}>+ レシートを追加</SC.AddReceiptButton>
            </SC.ReceiptPart>
            <SC.SummartionPart>
                <div>合計</div>
                <div>￥{dailyReceipt.getDailyTotalCost()}</div>
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