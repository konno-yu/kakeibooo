import { Button } from '@material-ui/core';
import * as ReceiptRest from '../../rest/financeRest';
import { ReceiptErrorDialog } from './ReceiptErrorDialog';
import { useState } from 'react';
import { ReceiptSnackbar } from './ReceiptSnackbar';
import { getDay, getWeekOfMonth, getWeeksInMonth } from 'date-fns';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { causeError } from '../../reducer/householdBookSlice';
import { WeekIndex } from './model/MonthlyReceiptModel';
import DailyReceiptModel from './model/DailyReceiptModel';

interface ReceiptFooterProps {
    dailyReceipt: DailyReceiptModel;
    onClickRegister: () => void;
    onClickNoMoneyDay: () => void;
}

export const ReceiptFooter: React.FC<ReceiptFooterProps> = (props) => {
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const monthlyReceipt = useAppSelector(state => state.householdBook.monthlyReceipt);
    const errorStatus = useAppSelector(state => state.householdBook.errorStatus);
    const dispatch = useAppDispatch();

    const isRegisterButtonDisabled = props.dailyReceipt.getCount() === 0;
    const isNMDayButtonDisabled = props.dailyReceipt.getCount() > 0;
    const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);

    return (
        <SC.ReceiptFooter>
            {
                errorStatus.isError &&  <ReceiptErrorDialog isOpen={errorStatus.isError} type={errorStatus.type}/>
            }
            {
                isShowSnackbar && <ReceiptSnackbar message="登録が完了しました" />
            }
            <SC.RegisterButton disabled={isRegisterButtonDisabled} fullWidth onClick={props.onClickRegister}>食費を確定</SC.RegisterButton>
            <SC.NoMoneyButton disabled={isNMDayButtonDisabled} fullWidth onClick={props.onClickNoMoneyDay}>NOマネーデイとして登録</SC.NoMoneyButton>
        </SC.ReceiptFooter>
    )
}

const SC = {
    ReceiptFooter: styled.div`
        height: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        border-top: 2px dashed #CFD8DC;
    `,
    RegisterButton: styled(Button) <{ disabled: boolean }>`
        width: 80%;
        background: ${(props) => props.disabled ? '#F5F5F5' : '#546E7A'};
        color: ${(props) => props.disabled ? '#BDBDBD' : '#FFFFFF'};
        border: ${(props) => props.disabled ? '1px solid #BDBDBD' : '1px solid #546E7A'};
        border-radius: 100px;
        font-size: 14px;
        font-weight: 600;
        font-family: "M PLUS Rounded 1c", sans-serif;
        &:hover {
            background: ${(props) => props.disabled ? '#F5F5F5' : '#546E7A'};
            opacity: 0.7;
        }
    `,
    NoMoneyButton: styled(Button)`
        width: 80%;
        background: ${(props) => props.disabled ? '#F5F5F5' : '#FFB74D'};
        color: ${(props) => props.disabled ? '#BDBDBD' : '#FFFFFF'};
        border: ${(props) => props.disabled ? '1px solid #BDBDBD' : '1px solid #FFB74D'};
        border-radius: 100px;
        font-size: 14px;
        font-weight: 600;
        font-family: "M PLUS Rounded 1c", sans-serif;
        &:hover {
            background: ${(props) => props.disabled ? '#F5F5F5' : '#FFB74D'};
            opacity: 0.7;
        }
    `,
};