import { Button } from '@material-ui/core';
import * as ReceiptRest from '../../rest/financeRest';
import { ReceiptErrorDialog } from './ReceiptErrorDialog';
import { useState } from 'react';
import { ReceiptSnackbar } from './ReceiptSnackbar';
import { getDay, getWeekOfMonth } from 'date-fns';
import { WeekIndex } from './model/MonthlyReceiptModel';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store';
import { causeError } from '../../reducer/householdBookSlice';

export const ReceiptFooter: React.FC = () => {
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const dailyReceipt = useAppSelector(state => state.householdBook.dailyReceipt);
    const monthlyReceipt = useAppSelector(state => state.householdBook.monthlyReceipt);
    const errorStatus = useAppSelector(state => state.householdBook.errorStatus);
    const dispatch = useAppDispatch();

    const isRegisterButtonDisabled = dailyReceipt.getCount() === 0;
    const isNMDayButtonDisabled = dailyReceipt.getCount() > 0;
    const [isShowSnackbar, setIsShowSnackbar] = useState<boolean>(false);

    const validate = (dailyCost: Array<{ storeName: string, cost: number }>) => {
        const existEmptyStoreName = dailyCost.filter(dCost => dCost.storeName === '').length > 0;
        const existZeroCost = dailyCost.filter(dCost => dCost.cost === 0 || dCost.cost === null).length > 0;
        const existInvalidReceipt = dailyCost.filter(dCost => isNaN(dCost.cost)).length > 0;
        const existSameStoreReceipt = dailyCost.filter((dCost, index, self) => self.findIndex(e => e.storeName === dCost.storeName) === index).length !== dailyCost.length;
        const existSameReceipt = dailyCost.filter((dCost, index, self) => self.findIndex(e => e.cost === dCost.cost && e.storeName === dCost.storeName) === index).length !== dailyCost.length;
        if (existEmptyStoreName) {
            dispatch(causeError('exists_empty_store_name'));
            return false;
        }
        if (existZeroCost) {
            dispatch(causeError('exists_invalid_receipt'));
            return false;
        }
        if (existInvalidReceipt) {
            dispatch(causeError('exists_invalid_receipt'));
            return false;
        }
        if (existSameReceipt) {
            dispatch(causeError('exists_duplicate_receipt'));
            return false;
        }
        if (existSameStoreReceipt) {
            dispatch(causeError('exists_same_store_receipt'));
            return false;
        }
        return true;
    }

    const registerDailyReceipt = () => {
        const purchaseDate = targetDate;
        const dailyCost: Array<{ storeName: string, cost: number }> = [...dailyReceipt.receipts.map(receipt => receipt.getDailyCost())];
        if (!validate(dailyCost)) {
            return;
        }
        const isPost = !!monthlyReceipt.monthlyReceipt[getWeekOfMonth(purchaseDate) as WeekIndex][getDay(purchaseDate)];
        if (isPost) {
            ReceiptRest.post({ purchaseDate, dailyCost }).then(res => {
                if (res.status === 201) {
                    setIsShowSnackbar(true);
                    setTimeout(() => setIsShowSnackbar(false), 1500);
                } else {
                    alert("追加時に予期しないエラーが発生しました");
                }
            });
        } else {
            ReceiptRest.update({ purchaseDate, dailyCost }).then(res => {
                if (res.status === 201) {
                    setIsShowSnackbar(true);
                    setTimeout(() => setIsShowSnackbar(false), 1500);
                } else {
                    alert('更新時に予期しないエラーが発生しました')
                }
            })
        }
    }

    const registerNoMoneyDay = () => {
        const purchaseDate = targetDate;
        const dailyCost: Array<{ storeName: string, cost: number }> = [];
        ReceiptRest.post({ purchaseDate, dailyCost }).then((res) => {
            if (res.status === 201) {
                setIsShowSnackbar(true);
                setTimeout(() => setIsShowSnackbar(false), 2000);
            } else {
                alert("予期しないエラーが発生しました");
            }
        });
    }
    return (
        <SC.ReceiptFooter>
            {
                errorStatus.isError &&  <ReceiptErrorDialog isOpen={errorStatus.isError} type={errorStatus.type}/>
            }
            {
                isShowSnackbar && <ReceiptSnackbar message="登録が完了しました" />
            }
            <SC.RegisterButton disabled={isRegisterButtonDisabled} fullWidth onClick={registerDailyReceipt}>食費を確定</SC.RegisterButton>
            <SC.NoMoneyButton disabled={isNMDayButtonDisabled} fullWidth onClick={registerNoMoneyDay}>NOマネーデイとして登録</SC.NoMoneyButton>
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