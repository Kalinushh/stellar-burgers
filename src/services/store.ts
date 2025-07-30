import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import { constructorReducer } from '../slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userReducer } from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  bconstructor: constructorReducer,
  user: userReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
