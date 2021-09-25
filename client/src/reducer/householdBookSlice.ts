import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMonth, getYear, setDate, setMonth } from "date-fns";
import MonthlyReceiptModel from "../components/receipt/model/MonthlyReceiptModel";

interface HouseholdBookState {
    // 表示対象の年月日
    targetDate: Date;
    // 表示対象月における日別の食費
    monthlyReceipt: MonthlyReceiptModel;
}

const initialState: HouseholdBookState = {
    targetDate: new Date(),
    monthlyReceipt: new MonthlyReceiptModel(getYear(new Date()), getMonth(new Date())),
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
    }
})

export const {
    showNextMonth,
    showPrevMonth,
    showSpecifyDate,
    updateMonthlyReceipt,
} = householdBookSlice.actions;