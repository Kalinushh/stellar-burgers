/// <reference types="jest" />
import { describe, it, expect } from '@jest/globals';
export {};
import { constructorReducer, constructorActions } from './constructorSlice';
import { TIngredient } from '@utils-types';

const testIngredient: TIngredient = {
  _id: '123',
  name: 'Тестовый ингредиент',
  type: 'sauce',
  proteins: 10,
  fat: 5,
  carbohydrates: 15,
  calories: 120,
  price: 100,
  image: 'image.png',
  image_large: 'image_large.png',
  image_mobile: 'image_mobile.png'
};

const testBun: TIngredient = {
  ...testIngredient,
  _id: 'bun-1',
  type: 'bun'
};

describe('constructorSlice reducer', () => {
  it('добавляет булку', () => {
    const state = constructorReducer(
      undefined,
      constructorActions.addIngredient(testBun)
    );
    expect(state.bun).toEqual(expect.objectContaining({ _id: 'bun-1' }));
  });

  it('добавляет ингредиент (не булку)', () => {
    const state = constructorReducer(
      undefined,
      constructorActions.addIngredient(testIngredient)
    );
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]._id).toBe('123');
  });

  it('удаляет ингредиент по id', () => {
    const ingredientWithId =
      constructorActions.addIngredient(testIngredient).payload;
    const withIngredient = constructorReducer(undefined, {
      type: constructorActions.addIngredient.type,
      payload: ingredientWithId
    });
    const state = constructorReducer(
      withIngredient,
      constructorActions.removeIngredient(ingredientWithId.id)
    );
    expect(state.ingredients).toHaveLength(0);
  });

  it('очищает конструктор', () => {
    const withStuff = {
      bun: testBun,
      ingredients: [constructorActions.addIngredient(testIngredient).payload],
      orderRequest: false,
      orderModalData: null
    };
    const state = constructorReducer(
      withStuff,
      constructorActions.clearConstructor()
    );
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  it('очищает данные заказа', () => {
    const withOrder = {
      bun: null,
      ingredients: [],
      orderRequest: false,
      orderModalData: { number: 123 }
    };
    const state = constructorReducer(
      withOrder,
      constructorActions.clearOrder()
    );
    expect(state.orderModalData).toBeNull();
    expect(state.orderRequest).toBe(false);
  });
});
