import * as React from 'react';
import { ReceiptBody } from './ReceiptBody';
import { ReceiptFooter } from './ReceiptFooter';
import { ReceiptHeader } from './ReceiptHeader';
import styled from 'styled-components';
import { CommonSnackbar } from '../common/CommonSnackbar';
import { FiCheckCircle } from 'react-icons/fi';
import { ReceiptErrorDialog } from './ReceiptErrorDialog';
import { useReceipt } from './hook/useReceipt';


export const Receipt: React.FC = () => {
     const [state, action] = useReceipt();

    return (
        <SC.ReceiptRoot>
            {
                state.errorDialogStatus.isShow &&
                    <ReceiptErrorDialog onDialogClose={action.onDialogClose} type={state.errorDialogStatus.type}/>
            }
            {
                state.snackbarStatus.isShow && <CommonSnackbar message={state.snackbarStatus.message} icon={<FiCheckCircle />}/>
            }
            <ReceiptHeader />
            <ReceiptBody
                dailyReceipt={state.dailyReceipt}
                onAddReceipt={action.onAddReceipt}
                onDeleteReceipt={action.onDeleteReceipt}
                onChangeReceipt={action.onChangeReceipt}
            />
            <ReceiptFooter
                dailyReceipt={state.dailyReceipt}
                onClickRegister={action.onClickRegister}
                onClickNoMoneyDay={action.onClickNoMoneyDay}
            />
        </SC.ReceiptRoot>
    )
}

const SC = {
    ReceiptRoot: styled.div`
        width: 25%;
        height: calc(100vh - 24px);
        background: #FFFFFF;
        border: 2px solid #FFFFFF;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    `
};