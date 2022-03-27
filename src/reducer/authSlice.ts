import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiError, Session } from '@supabase/supabase-js';
import * as authRest from '../rest/auth';

interface AuthState {
  /** セッション情報 */
  session: Session | null;
  /** エラー情報 */
  error: ApiError | null;
}

const initialState: AuthState = {
  session: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state: AuthState, action: PayloadAction<Pick<AuthState, 'session'>>) => {
      state.session = action.payload.session;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.session = action.payload;
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.error = action.payload;
      });
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
// export const signIn = createAsyncThunk<
//   { error: Error | null | undefined; session: Session | null },
//   { email: string; password: string; name: string },
//   { rejectValue: Error }
// >('auth/signIn', async (args, thunkAPI) => {
//   const response = await authRest.signIn(args);
//   if (response.error) {
//     return thunkAPI.rejectWithValue(response.error);
//   }
//   return response;
// });
