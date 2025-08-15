/// <reference types="jest" />
import { describe, it, expect } from '@jest/globals';
export {};

import { profileOrdersReducer, fetchUserOrders } from './profileOrdersSlice';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    isLoading: false
  };

  it('pending: isLoading → true', () => {
    const state = profileOrdersReducer(initialState, {
      type: fetchUserOrders.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  it('fulfilled: сохраняет заказы и снимает isLoading', () => {
    const orders: TOrder[] = [
      {
        _id: '1',
        status: 'done',
        name: 'order',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        number: 777,
        ingredients: []
      } as unknown as TOrder
    ];

    const state = profileOrdersReducer(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload: orders
    });

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  it('rejected: снимает isLoading', () => {
    const state = profileOrdersReducer(initialState, {
      type: fetchUserOrders.rejected.type
    });
    expect(state.isLoading).toBe(false);
  });
});
