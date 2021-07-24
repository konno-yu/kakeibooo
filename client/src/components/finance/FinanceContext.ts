import { setMonth } from "date-fns";
import React from "react";
import MonthlyReceiptModel from "./model/MonthlyReceiptModel";
import { getYear, getMonth } from 'date-fns';

type FinanceContext = {
    targetDate: Date;
    monthlyReceipt: MonthlyReceiptModel;
    setTargetDate: (date: Date) => void;
    setMonthlyReceipt: (monthlyReceipt: MonthlyReceiptModel) => void;
}

const defaultFinanceContext: FinanceContext = {
    targetDate: new Date(),
    monthlyReceipt: new MonthlyReceiptModel(getYear(new Date()), getMonth(new Date())),
    setTargetDate: () => { },
    setMonthlyReceipt: () => { }
};

export const financeContext = React.createContext<FinanceContext>(defaultFinanceContext);

export const useFinance = (): FinanceContext => {
    const [targetDate, setDate] = React.useState<Date>(new Date());
    const setTargetDate = React.useCallback((current: Date) => {
        setDate(current);
    }, []);
    const [monthlyReceipt, setReceipt] = React.useState<MonthlyReceiptModel>(new MonthlyReceiptModel(getYear(new Date()), getMonth(new Date())));
    const setMonthlyReceipt = React.useCallback((current: MonthlyReceiptModel) => {
        setReceipt(current);
    }, []);
    return {
        targetDate,
        monthlyReceipt,
        setTargetDate,
        setMonthlyReceipt
    }
}