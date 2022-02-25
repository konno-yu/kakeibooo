import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setDate } from 'date-fns';

interface HouseholdBookState {
  // 表示対象の年月日
  targetDate: Date;
  tags: { index: number; storeName: string; cost: number }[];
}

const initialState: HouseholdBookState = {
  // TODO 暫定（ほんとうは今日の日付にしておくべき）
  targetDate: new Date(2022, 0, 31),
  tags: [],
};

export const householdBookSlice = createSlice({
  name: 'household_book',
  initialState,
  reducers: {
    selectEdittingDate: (state: HouseholdBookState, action: PayloadAction<number>) => {
      state.targetDate = setDate(state.targetDate, action.payload);
    },
    addTag: (state: HouseholdBookState) => {
      state.tags.push({ index: state.tags.length, storeName: '', cost: null });
    },
    deleteTag: (state: HouseholdBookState, action: PayloadAction<number>) => {
      state.tags = state.tags.filter((tag) => tag.index !== action.payload);
      state.tags = state.tags.map((tag, i) => ({ index: i, ...tag }));
    },
    inputStoreName: (state: HouseholdBookState, action: PayloadAction<{ index: number; storeName: string }>) => {
      state.tags[action.payload.index].storeName = action.payload.storeName;
    },
    inputCost: (state: HouseholdBookState, action: PayloadAction<{ index: number; cost: number }>) => {
      state.tags[action.payload.index].cost = action.payload.cost;
    },
  },
});

export const { selectEdittingDate, addTag, deleteTag, inputStoreName, inputCost } = householdBookSlice.actions;
