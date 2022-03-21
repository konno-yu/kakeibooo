import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endOfMonth, getDate, getDay, getMonth, getWeekOfMonth, getYear, setDate, setMonth } from 'date-fns';
import { Get, Post } from '../rest/expenses';
import * as expenseRest from '../rest/expenses';
import { RootState } from '../store';

export type Receipt = { index: number; storeName: string; cost: number };
/**
 * 食費を表す型
 * weekIndex ... 対象月における週を表すインデックス（1 ~ 6）
 * receiptsが空配列 ... ノーマネーデイ
 * receiptsがnull ... 未入力
 */
export type Expenses = {
  [weekIndex: number]: (null | { date: Date; receipts: Receipt[] | [] | null })[];
};

interface HouseholdBookState {
  /** 編集対象の年月日 */
  targetDate: Date;
  /** 表示中の月における食費 */
  expenses: Expenses;
}

/** 指定された年月のテンプレートをつくる */
export const createMonthTemplate = (targetDate: Date): Expenses => {
  const template: Expenses = {
    1: [null, null, null, null, null, null, null],
    2: [null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null],
    6: [null, null, null, null, null, null, null],
  };
  const lastDayOfMonth = getDate(endOfMonth(targetDate));
  for (let day = 1; day <= lastDayOfMonth; day += 1) {
    const date = new Date(getYear(targetDate), getMonth(targetDate), day, 9, 0, 0);
    const weekIndex = getWeekOfMonth(date);
    const dayIndex = getDay(date);

    template[weekIndex][dayIndex] = { date, receipts: null };
  }
  return template;
};

const initialState: HouseholdBookState = {
  targetDate: new Date(new Date().setHours(9, 0, 0, 0)),
  expenses: createMonthTemplate(new Date()),
};

export const householdBookSlice = createSlice({
  name: 'household_book',
  initialState,
  reducers: {
    /** 編集日を選択する */
    selectEdittingDate: (state: HouseholdBookState, action: PayloadAction<number>) => {
      state.targetDate = setDate(state.targetDate, action.payload);
    },
    /** 月の食費を設定する */
    setMonthExpenses: (state: HouseholdBookState, action: PayloadAction<Get[]>) => {
      action.payload.forEach((payload) => {
        const targetDate = new Date(payload.purchase_date);
        state.expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts = payload.receipts;
      });
    },
    /** 編集日の食費を設定する */
    setDailyExpense: (state: HouseholdBookState, action: PayloadAction<Post>) => {
      const targetDate = new Date(action.payload.purchase_date);
      state.expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts = action.payload.receipts;
    },
    /** 前月を表示する */
    shiftPreviousMonth: (state: HouseholdBookState) => {
      state.targetDate = setMonth(state.targetDate, getMonth(state.targetDate) - 1);
      state.expenses = createMonthTemplate(state.targetDate);
    },
    /** 来月を表示する */
    shiftNextMonth: (state: HouseholdBookState) => {
      state.targetDate = setMonth(state.targetDate, getMonth(state.targetDate) + 1);
      state.expenses = createMonthTemplate(state.targetDate);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyExpenses.fulfilled, (state, action) => {
        action.payload.forEach((payload) => {
          const targetDate = new Date(payload.purchase_date);
          state.expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts = payload.receipts;
        });
      })
      .addCase(postDailyExpenses.fulfilled, (state, action) => {
        const targetDate = new Date(action.payload.purchase_date);
        state.expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts = action.payload.receipts;
      })
      .addCase(updateDailyExpenses.fulfilled, (state, action) => {
        const targetDate = new Date(action.payload.purchase_date);
        state.expenses[getWeekOfMonth(targetDate)][getDay(targetDate)].receipts = action.payload.receipts;
      });
  },
});

/** ある月の食費をDBから取得する */
export const fetchMonthlyExpenses = createAsyncThunk<Get[], undefined, { state: RootState }>(
  'household_book/fetchMonthlyExpenses',
  async (_, thunkAPI) => {
    const { targetDate } = thunkAPI.getState().householdBook;
    const response = await expenseRest.get(targetDate);
    return response.data;
  }
);

/** 編集日の食費をDBに登録する */
export const postDailyExpenses = createAsyncThunk<Post, Receipt[], { state: RootState }>(
  'household_book/postDailyExpenses',
  async (args, thunkAPI) => {
    const { targetDate } = thunkAPI.getState().householdBook;
    const response = await expenseRest.post(targetDate, args);
    return response.data[0];
  }
);

/** 編集日の食費を更新する */
export const updateDailyExpenses = createAsyncThunk<Post, Receipt[], { state: RootState }>(
  'household_book/updateDailyExpenses',
  async (args, thunkAPI) => {
    const { targetDate } = thunkAPI.getState().householdBook;
    const response = await expenseRest.put(targetDate, args);
    return response.data[0];
  }
);

export const { selectEdittingDate, shiftPreviousMonth, shiftNextMonth, setMonthExpenses, setDailyExpense } =
  householdBookSlice.actions;
