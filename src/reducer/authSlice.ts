import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiError, Session } from '@supabase/supabase-js';
import * as authRest from '../rest/auth';
import { supabase } from '../supabaseClient';

interface AuthState {
  /** セッション情報 */
  session: Session | null;
  /** エラー情報 */
  error: ApiError | null;
}

const initialState: AuthState = {
  session: supabase.auth.session(),
  error: null,
};

type SetSessionPayload = {
  session: Session | null;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state: AuthState, action: PayloadAction<SetSessionPayload>) => ({
      ...state,
      session: action.payload.session,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => ({
        ...state,
        session: action.payload,
        error: null,
      }))
      .addCase(signIn.rejected, (state, action) => ({
        ...state,
        session: null,
        error: action.payload,
      }));
  },
});

export const signIn = createAsyncThunk<Session | null, { email: string; password: string }, { rejectValue: ApiError }>(
  'auth/signIn',
  async (obj, thunkAPI) => {
    const { error, session } = await authRest.signIn(obj);
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return session;
  }
);
export const { setSession } = authSlice.actions;
