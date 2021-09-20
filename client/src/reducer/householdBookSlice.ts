import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMonth, getYear, setDate, setMonth } from "date-fns";
import MonthlyReceiptModel from "../components/receipt/model/MonthlyReceiptModel";
import { ErrorType } from "../components/receipt/ReceiptErrorDialog";

type ErrorStatus = {
    isError: boolean,
    type?: ErrorType
};

interface HouseholdBookState {
    // 表示対象の年月日
    targetDate: Date;
    // 表示対象月における日別の食費
    monthlyReceipt: MonthlyReceiptModel;
    // 食費登録時のエラー状況
    errorStatus: ErrorStatus
}

const initialState: HouseholdBookState = {
    targetDate: new Date(),
    monthlyReceipt: new MonthlyReceiptModel(getYear(new Date()), getMonth(new Date())),
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
    updateMonthlyReceipt,
    causeError,
    resolveError,
} = householdBookSlice.actions;