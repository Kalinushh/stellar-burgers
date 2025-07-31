import {
  createSlice,
  nanoid,
  PayloadAction,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { RootState } from '../services/store';
import { orderBurgerApi } from '../utils/burger-api';

type ConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: { number: number } | null;
};

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const orderBurger = createAsyncThunk<
  { number: number },
  string[],
  { rejectValue: string }
>('constructor/orderBurger', async (ingredientIds, thunkAPI) => {
  try {
    const response = await orderBurgerApi(ingredientIds);
    return response.order;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при оформлении заказа');
  }
});

const constructorSlice = createSlice({
  name: 'bconstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const item = action.payload;
        if (item.type === 'bun') {
          state.bun = item;
        } else {
          state.ingredients.push(item);
        }
      },
      prepare: (ingredient: TIngredient) => {
        return {
          payload: {
            ...ingredient,
            id: nanoid()
          }
        };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<{ number: number }>) => {
          state.orderRequest = false;
          state.orderModalData = action.payload;
        }
      )
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const constructorReducer = constructorSlice.reducer;
export const constructorActions = constructorSlice.actions;

export const selectBun = (state: RootState) => state.bconstructor.bun;
export const selectIngredients = (state: RootState) =>
  state.bconstructor.ingredients;
export const selectOrderRequest = (state: RootState) =>
  state.bconstructor.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.bconstructor.orderModalData;
