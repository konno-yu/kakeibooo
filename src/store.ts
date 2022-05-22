import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from './reducer/appSlice';
import { authSlice } from './reducer/authSlice';
import { homeSlice } from './reducer/homeSlice';
import { householdBookSlice } from './reducer/householdBookSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeSlice.reducer,
    householdBook: householdBookSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
