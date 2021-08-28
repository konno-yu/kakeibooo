import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { householdBookSlice } from './reducer/householdBookSlice';

export const store = configureStore({
    reducer: {
        householdBook: householdBookSlice.reducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;