import { Button } from '@material-ui/core';
import { ReceiptTag } from './ReceiptTag';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import DailyReceiptModel from './model/DailyReceiptModel';
import { ChangeEvent } from 'react';

interface ReceiptBodyProps {
    dailyReceipt: DailyReceiptModel;
    onAddReceipt: () => void;
    onDeleteReceipt: (ordinary: number) => void;
    onChangeReceipt: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: 'store' | 'cost', ordinary: number) => void;
}

export const ReceiptBody: React.FC<ReceiptBodyProps> = (props: ReceiptBodyProps) => {
    const isAddButtonDisabled = props.dailyReceipt.isReachDailyMax();

    return (
        <SC.ReceiptBody>
            <SC.ReceiptPart>
                {
                    (props.dailyReceipt.receipts).map((receipt, ordinary) => {
                        return (
                            <ReceiptTag
                                model={receipt}
                                ordinary={ordinary}
                                onDeleteReceipt={props.onDeleteReceipt}
                                onChangeReceipt={props.onChangeReceipt}
                            />
                        );
                    })
                }
                <SC.AddReceiptButton fullWidth variant="outlined" onClick={props.onAddReceipt} disabled={isAddButtonDisabled}>+ レシートを追加</SC.AddReceiptButton>
            </SC.ReceiptPart>
            <SC.SummartionPart>
                <div>合計</div>
                <div>￥{props.dailyReceipt.getDailyTotalCost()}</div>
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