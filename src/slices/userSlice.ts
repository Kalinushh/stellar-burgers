import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  TLoginData,
  registerUserApi,
  TRegisterData,
  updateUserApi,
  getUserApi
} from '../utils/burger-api';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false
};
export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(loginData);

      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      document.cookie = 'accessToken=; Max-Age=0';
      document.cookie = `accessToken=${response.accessToken}`;

      return response.user;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка авторизации');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(registerData);

      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));
      document.cookie = 'accessToken=; Max-Age=0';
      document.cookie = `accessToken=${response.accessToken}`;

      return response.user;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка регистрации');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkAPI) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err) {
      return thunkAPI.rejectWithValue('Пользователь не авторизован');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuthChecked = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthChecked = true;
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => !!state.user
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isAuthChecked = false;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      });
  }
});
export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        return rejectWithValue((error as { message: string }).message);
      }
      return rejectWithValue('Ошибка обновления данных');
    }
  }
);

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
