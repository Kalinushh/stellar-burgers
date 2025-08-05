import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getOrdersApi } from '../utils/burger-api';
import { RootState } from '../services/store';

type ProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: ProfileOrdersState = {
  orders: [],
  isLoading: false
};

export const fetchUserOrders = createAsyncThunk(
  'profileOrders/fetchUserOrders',
  async (_, thunkAPI) => {
    try {
      return await getOrdersApi();
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка получения заказов пользователя');
    }
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.orders = action.payload;
          state.isLoading = false;
        }
      )
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
export const selectUserOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectUserOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;
