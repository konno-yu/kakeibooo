import { getDay, getWeekOfMonth } from 'date-fns';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import DailyReceiptModel from '../model/DailyReceiptModel';
import MonthlyReceiptModel, { WeekIndex } from '../model/MonthlyReceiptModel';
import ReceiptModel from '../model/ReceiptModel';
import { ErrorType } from '../ReceiptErrorDialog';
import * as ReceiptRest from '../../../rest/financeRest';
import { updateMonthlyReceipt } from '../../../reducer/householdBookSlice';

export const useReceipt = () => {
    const targetDate = useAppSelector(state => state.householdBook.targetDate);
    const monthlyReceipt = useAppSelector(state => state.householdBook.monthlyReceipt);
    const dispatch = useAppDispatch();
    const [dailyReceipt, setDailyReceipt] = useState<DailyReceiptModel>(new DailyReceiptModel(targetDate, []));
    const [snackbarStatus, setSnackbarStatus] = useState<{ isShow: boolean, message?: string }>({ isShow: false });
    const [errorDialogStatus, setErrorDialogStatus] = useState<{ isShow: boolean, type?: ErrorType }>({ isShow: false });

    useEffect(() => {
        const weekIndex = getWeekOfMonth(targetDate) as WeekIndex;
        const dayIndex = getDay(targetDate);
        const targetDateReceipt = monthlyReceipt.receipts[weekIndex][dayIndex];
        if (targetDateReceipt && targetDateReceipt.getDailyTotalCost() > 0) {
            setDailyReceipt(new DailyReceiptModel(targetDate, targetDateReceipt.receipts));
        } else {
            setDailyReceipt(new DailyReceiptModel(targetDate, []));
        }
    }, [targetDate, monthlyReceipt])

    const onAddReceipt = useCallback(() => {
        dailyReceipt.add(new ReceiptModel('', 0));
        setDailyReceipt(new DailyReceiptModel(targetDate, dailyReceipt.receipts));
    }, [dailyReceipt]);

    const onDeleteReceipt = useCallback((ordinary: number) => {
        dailyReceipt.delete(ordinary);
        setDailyReceipt(new DailyReceiptModel(targetDate, dailyReceipt.receipts));
    }, [dailyReceipt]);

    const onChangeReceipt = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, target: 'store' | 'cost', ordinary: number) => {
        const current = dailyReceipt;
        const inputText = (event.target as HTMLInputElement).value;
        if (target === 'store') {
            current.receipts[ordinary].storeName = inputText;
        } else {
            current.receipts[ordinary].cost = +inputText;
        }
        setDailyReceipt(new DailyReceiptModel(targetDate, current.receipts));
    }, [dailyReceipt]);

    const validateReceipt = useCallback(() => {
        if (dailyReceipt.isExistEmptyStore()) {
            setErrorDialogStatus({ isShow: true, type: 'exists_empty_store_name' });
            return false;
        }
        if (dailyReceipt.isExistZeroCost()) {
            setErrorDialogStatus({ isShow: true, type: 'exists_zero_receipt' });
            return false;
        }
        if (dailyReceipt.isExistNaNCost()) {
            setErrorDialogStatus({ isShow: true, type: 'exists_invalid_receipt' });
            return false;
        }
        if (dailyReceipt.isDuplicate()) {
            setErrorDialogStatus({ isShow: true, type: 'exists_duplicate_receipt' });
            return false;
        }
        if (dailyReceipt.isExistSameStore()) {
            setErrorDialogStatus({ isShow: true, type: 'exists_same_store_receipt' });
            return false;
        }
        return true;
    }, [dailyReceipt]);

    const onClickRegister = useCallback(() => {
        if (!validateReceipt()) {
            return;
        }
        const isPost = monthlyReceipt.receipts[getWeekOfMonth(targetDate) as WeekIndex][getDay(targetDate)].receipts[0].cost === null;
        const dailyCost: { storeName: string, cost: number }[] = [...dailyReceipt.receipts.map(r => r.getDailyCost())];
        if (isPost) {
            ReceiptRest.post({ purchaseDate: targetDate, dailyCost }).then(res => {
                if (res.status === 201) {
                    AfterPost(res.data.dailyCost);
                } else {
                    alert('追加時に予期しないエラーが発生しました');
                }
            })
        } else {
            ReceiptRest.update({ purchaseDate: targetDate, dailyCost }).then(res => {
                if (res.status === 200) {
                    AfterPut(res.data.dailyCost);
                } else {
                    alert('更新時に予期しないエラーが発生しました');
                }
            })
        }
    }, [dailyReceipt]);

    const onClickNoMoneyDay = useCallback(() => {
        const isPost = monthlyReceipt.receipts[getWeekOfMonth(targetDate) as WeekIndex][getDay(targetDate)].receipts[0].cost === null;
        if (isPost) {
            ReceiptRest.post({ purchaseDate: targetDate, dailyCost: [] }).then(res => {
                if (res.status === 201) {
                    AfterPost(res.data.dailyCost);
                } else {
                    alert('予期しないエラーが発生しました');
                }
            });
        } else {
            ReceiptRest.update({ purchaseDate: targetDate, dailyCost: [] }).then(res => {
                if (res.status === 200) {
                    AfterPut(res.data.dailyCost);
                } else {
                    alert(('予期しないエラーが発生しました'));
                }
            })
        }
    }, [dailyReceipt]);

    const AfterPost = (dailyCost?: { storeName: string, cost: number }[]) => {
        showSnackbar('登録が完了しました');
        setTimeout(closeSnackbar, 1500);
        const receiptModel: ReceiptModel[] = dailyCost.map(d => new ReceiptModel(d.storeName, d.cost));
        setDailyReceipt(new DailyReceiptModel(targetDate, receiptModel));
        monthlyReceipt.setSpecifyDateReceipt(targetDate, receiptModel);
        dispatch(updateMonthlyReceipt(new MonthlyReceiptModel(targetDate, monthlyReceipt.receipts)));
    }

    const AfterPut = (dailyCost?: { storeName: string, cost: number }[]) => {
        showSnackbar('更新が完了しました');
        setTimeout(closeSnackbar, 1500);
        const receiptModel: ReceiptModel[] = dailyCost.map(d => new ReceiptModel(d.storeName, d.cost));
        setDailyReceipt(new DailyReceiptModel(targetDate, receiptModel));
        monthlyReceipt.setSpecifyDateReceipt(targetDate, receiptModel);
        dispatch(updateMonthlyReceipt(new MonthlyReceiptModel(targetDate, monthlyReceipt.receipts)));
    }

    const showSnackbar = useCallback((message: string) => {
        setSnackbarStatus({ isShow: true, message });
    }, []);

    const closeSnackbar = useCallback(() => {
        setSnackbarStatus({ isShow: false });
    }, []);

    const onDialogClose = useCallback(() => {
        setErrorDialogStatus({ isShow: false });
    },[]);

    return [
        {
            dailyReceipt,
            snackbarStatus,
            errorDialogStatus
        },
        {
            onAddReceipt,
            onDeleteReceipt,
            onChangeReceipt,
            showSnackbar,
            closeSnackbar,
            validateReceipt,
            onClickRegister,
            onClickNoMoneyDay,
            onDialogClose
        }
    ] as const;
}