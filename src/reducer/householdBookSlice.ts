import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { endOfMonth, getDate, getDay, getMonth, getWeekOfMonth, getYear, setDate, setMonth } from 'date-fns';

interface HouseholdBookState {
  /** 編集対象の年月日 */
  targetDate: Date;
  /** 表示中の月におけるレシート */
  receipts: {
    [key: number]: (null | {
      date: Date;
      receipts: { index: number; storeName: string; cost: number }[] | [] | null;
    })[];
  };
}

/**
 * 指定された年月のテンプレートをつくる
 */
export const createMonthTemplate = (
  targetDate: Date
): {
  [key: number]: (null | { date: Date; receipts: { index: number; storeName: string; cost: number }[] | [] | null })[];
} => {
  const template: {
    [key: number]: (null | {
      date: Date;
      receipts: { index: number; storeName: string; cost: number }[] | [] | null;
    })[];
  } = {
    1: [null, null, null, null, null, null, null],
    2: [null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null],
    6: [null, null, null, null, null, null, null],
  };
  const lastDayOfMonth = getDate(endOfMonth(targetDate));
  for (let day = 1; day <= lastDayOfMonth; day += 1) {
    const date = new Date(getYear(targetDate), getMonth(targetDate), day);
    const weekIndex = getWeekOfMonth(date);
    const dayIndex = getDay(date);

    /** ほんとうはこっち */
    // template[weekIndex][dayIndex] = { date, receipts: null };
    if (dayIndex === 0) {
      template[weekIndex][dayIndex] = { date, receipts: [] };
    } else {
      template[weekIndex][dayIndex] = {
        date,
        receipts: [
          { index: 0, storeName: `サンプル${dayIndex}`, cost: 1000 * dayIndex },
          { index: 1, storeName: `サンプル${dayIndex}`, cost: 1000 * dayIndex },
        ],
      };
    }
  }
  return template;
};

const initialState: HouseholdBookState = {
  targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
  receipts: createMonthTemplate(new Date()),
};

export const householdBookSlice = createSlice({
  name: 'household_book',
  initialState,
  reducers: {
    /** 編集日を選択する */
    selectEdittingDate: (state: HouseholdBookState, action: PayloadAction<number>) => {
      state.targetDate = setDate(state.targetDate, action.payload);
    },
    /** 前月を表示する */
    shiftPreviousMonth: (state: HouseholdBookState) => {
      state.targetDate = setMonth(state.targetDate, getMonth(state.targetDate) - 1);
      state.receipts = createMonthTemplate(state.targetDate);
    },
    /** 来月を表示する */
    shiftNextMonth: (state: HouseholdBookState) => {
      state.targetDate = setMonth(state.targetDate, getMonth(state.targetDate) + 1);
      state.receipts = createMonthTemplate(state.targetDate);
    },
  },
});

export const { selectEdittingDate, shiftPreviousMonth, shiftNextMonth } = householdBookSlice.actions;
