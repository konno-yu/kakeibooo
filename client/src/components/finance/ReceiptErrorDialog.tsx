import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { IoAlertCircle } from 'react-icons/io5';
import '../../style/dialog.scss';
import { useContext } from 'react';
import { receiptContext } from './ReceiptContext';


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

const ReceiptErrorDialog: React.FC<ReceiptErrorDlgProps> = (props) => {
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
            <DialogTitle disableTypography>
                <IoAlertCircle size={24} color="#FF5252" fontWeight={800} />
                <div className="title-label">エラー</div>
            </DialogTitle>
            <DialogContent>
                <div className="notice">{ErrorDetails[props.type].message}</div>
                {
                    ErrorDetails[props.type].subMessage &&
                    <div className="notice--sub">※{ErrorDetails[props.type].subMessage}</div>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className="close-btn">閉じる</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReceiptErrorDialog;