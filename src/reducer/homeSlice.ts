import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  memo: { from: Date; to: Date; text: string }[];
}

const initialState: HomeState = {
  memo: [],
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateMemo: (state, action: PayloadAction<{ from: Date; to: Date; text: string }[]>) => {
      state.memo = action.payload;
    },
  },
});

export const { updateMemo } = homeSlice.actions;
