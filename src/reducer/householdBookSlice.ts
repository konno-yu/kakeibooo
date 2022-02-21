import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setDate } from "date-fns";

interface HouseholdBookState {
    // 表示対象の年月日
    targetDate: Date;
}

const initialState: HouseholdBookState = {
    // TODO 暫定（ほんとうは今日の日付にしておくべき）
    targetDate: new Date(2022, 0, 31),
}

export const householdBookSlice = createSlice({
    name: 'household_book',
    initialState,
    reducers: {
        selectEdittingDate: (state: HouseholdBookState, action: PayloadAction<number>) => {
            state.targetDate = setDate(state.targetDate, action.payload);
        },
    }
})

export const {
    selectEdittingDate,
} = householdBookSlice.actions;