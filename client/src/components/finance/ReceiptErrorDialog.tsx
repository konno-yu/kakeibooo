import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { IoAlertCircle } from 'react-icons/io5';
import { useContext } from 'react';
import { receiptContext } from './ReceiptContext';
import styled from 'styled-components';


interface ReceiptErrorDlgProps {
    isOpen: boolean;
    type: ErrorType;
}

// TODO のちのち切り出す

export type ErrorType = 'exists_zero_receipt' | 'exists_empty_store_name' | 'exists_duplicate_receipt' | 'exists_same_store_receipt' | 'exists_invalid_receipt';
type ErrorMessages = {
    message: string,
    subMessage?: string
}
const ErrorDetails: { [P in ErrorType]: ErrorMessages } = {
    'exists_zero_receipt': {
        message: '0円のレシートがありませんか？',
        subMessage: 'レシートには金額が入力されている必要があります。'
    },
    'exists_empty_store_name': {
        message: '店舗名が入力されていないレシートがありませんか？',
        subMessage: 'レシートには店舗名が入力されている必要があります。'
    },
    'exists_duplicate_receipt': {
        message: '全く同じレシートが複数ありませんか？',
        subMessage: '1日に同じ店舗/同じ金額のレシートは1枚しか登録できません'
    },
    'exists_same_store_receipt': {
        message: '同じ店舗のレシートが複数ありませんか？',
        subMessage: '1日で同じ店舗のレシートが複数ある場合は合算しましょう'
    },
    'exists_invalid_receipt': {
        message: '金額に数値以外が入力されたレシートがありませんか？',
        subMessage: 'レシートの金額は数値しか受け付けません'
    }
}

export const ReceiptErrorDialog: React.FC<ReceiptErrorDlgProps> = (props) => {
    const context = useContext(receiptContext);
    const paperPropsStyle = {
        borderRadius: 8,
        padding: "8px 16px 8px 16px"
    };

    const handleClose = () => {
        context.setErrorStatus({ isError: false });
    }

    return (
        <Dialog open={props.isOpen} PaperProps={{ style: paperPropsStyle }}>
            <SC.DialogTitle disableTypography>
                <IoAlertCircle size={24} color="#FF5252" fontWeight={800} />
                <SC.DialogTitleLabel>エラー</SC.DialogTitleLabel>
            </SC.DialogTitle>
            <SC.DialogContent>
                <SC.ContentNotice>{ErrorDetails[props.type].message}</SC.ContentNotice>
                {
                    ErrorDetails[props.type].subMessage &&
                    <SC.ContentSubNotice>※{ErrorDetails[props.type].subMessage}</SC.ContentSubNotice>
                }
            </SC.DialogContent>
            <DialogActions>
                <SC.CloseButton onClick={handleClose}>閉じる</SC.CloseButton>
            </DialogActions>
        </Dialog>
    )
}

const SC = {
    DialogTitle: styled(DialogTitle)`
        display: flex;
        align-items: center;
        padding: 16px 24px 12px 4px !important;
    `,
    DialogTitleLabel: styled.div`
        color: #FF5252;
        font-size: 18px;
        font-weight: 800;
        margin-left: 4px;
    `,
    DialogContent: styled(DialogContent)`
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `,
    ContentNotice: styled.div`
        color: #333333;
        font-weight: 700;
    `,
    ContentSubNotice: styled.div`
        color: #9e9e9e;
        font-size: 0.9rem;
        margin-top: 2px;
    `,
    CloseButton: styled(Button)`
        font-family: "M PLUS Rounded 1c", sans-serif;
        color: #333333;
        font-weight: 600;
    `
};