import { createSlice } from "@reduxjs/toolkit";

interface HomeState {
    memo: { from: Date, to: Date, text: string }[];
}

const initialState: HomeState = {
    memo: []
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        updateMemo: (state, action) => {
            state.memo = action.payload;
        }
    }
});

export const {
    updateMemo
} = homeSlice.actions;