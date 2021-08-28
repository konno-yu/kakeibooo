import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMonth, getYear, setDate, setMonth } from "date-fns";
import DailyReceiptModel from "../components/finance/model/DailyReceiptModel";
import MonthlyReceiptModel from "../components/finance/model/MonthlyReceiptModel";
import ReceiptModel from "../components/finance/model/ReceiptModel";
import { ErrorType } from "../components/finance/ReceiptErrorDialog";

type ErrorStatus = {
    isError: boolean,
    type?: ErrorType
};

interface HouseholdBookState {
    // 表示対象の年月日
    targetDate: Date;
    // 表示対象月における日別の食費
    monthlyReceipt: MonthlyReceiptModel;
    // 登録中の食費（1日分）
    dailyReceipt: DailyReceiptModel;
    // 食費登録時のエラー状況
    errorStatus: ErrorStatus
}

const initialState: HouseholdBookState = {
    targetDate: new Date(),
    monthlyReceipt: new MonthlyReceiptModel(getYear(new Date()), getMonth(new Date())),
    dailyReceipt: new DailyReceiptModel([]),
    errorStatus: { isError: false }
}

export const householdBookSlice = createSlice({
    name: 'household_book',
    initialState,
    reducers: {
        showNextMonth: (state: HouseholdBookState) => {
            state.targetDate = setMonth(state.targetDate, getMonth(state.targetDate) + 1)
        },
        showPrevMonth: (state: HouseholdBookState) => {
            state.targetDate = setMonth(state.targetDate, getMonth(state.targetDate) - 1)
        },
        showSpecifyDate: (state: HouseholdBookState, action: PayloadAction<number>) => {
            state.targetDate = setDate(state.targetDate, action.payload);
        },
        updateDailyReceipt: (state: HouseholdBookState, action: PayloadAction<ReceiptModel[]>) => {
            state.dailyReceipt = new DailyReceiptModel(action.payload);
        },
        updateMonthlyReceipt: (state: HouseholdBookState, action: PayloadAction<MonthlyReceiptModel>) => {
            state.monthlyReceipt = action.payload;
        },
        causeError: (state: HouseholdBookState, action: PayloadAction<string>) => {
            state.errorStatus = {
                isError: true,
                type: action.payload as ErrorType
            }
        },
        resolveError: (state: HouseholdBookState) => {
            state.errorStatus = { isError: false };
        }
    }
})

export const {
    showNextMonth,
    showPrevMonth,
    showSpecifyDate,
    updateDailyReceipt,
    updateMonthlyReceipt,
    causeError,
    resolveError,
} = householdBookSlice.actions;