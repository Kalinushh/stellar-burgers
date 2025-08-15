/// <reference types="jest" />
import { describe, it, expect } from '@jest/globals';
export {};
import ingredientsReducer, {
  fetchIngredients
} from './ingredientsSlice';

import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [] as TIngredient[],
    isLoading: false,
    error: null as string | null
  };

  it('должен возвращать начальное состояние', () => {
    const state = ingredientsReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });

  it('должен установить isLoading в true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить items при fetchIngredients.fulfilled', () => {
    const ingredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 200,
        price: 100,
        image: 'image.jpg',
        image_large: 'image_large.jpg',
        image_mobile: 'image_mobile.jpg'
      }
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.items).toEqual(ingredients);
    expect(state.isLoading).toBe(false);
  });

  it('должен установить error при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: 'Ошибка загрузки'
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
