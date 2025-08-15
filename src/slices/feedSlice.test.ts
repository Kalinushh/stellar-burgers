/// <reference types="jest" />
import { describe, it, expect } from '@jest/globals';
export {};

import { feedReducer, fetchFeed } from './feedSlice';
import { TOrder } from '@utils-types';

describe('feedSlice', () => {
  const initialState = {
    orders: [] as TOrder[],
    total: 0,
    totalToday: 0,
    isLoading: false
  };

  it('pending: isLoading → true', () => {
    const state = feedReducer(initialState, { type: fetchFeed.pending.type });
    expect(state.isLoading).toBe(true);
  });

  it('fulfilled: сохраняет данные и снимает isLoading', () => {
    const payload = {
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'test',
          createdAt: '2025-01-01',
          updatedAt: '2025-01-01',
          number: 1,
          ingredients: []
        } as unknown as TOrder
      ],
      total: 10,
      totalToday: 2
    };

    const state = feedReducer(initialState, {
      type: fetchFeed.fulfilled.type,
      payload
    });

    expect(state.isLoading).toBe(false);
    expect(state.orders.length).toBe(1);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  it('rejected: снимает isLoading', () => {
    const state = feedReducer(initialState, { type: fetchFeed.rejected.type });
    expect(state.isLoading).toBe(false);
  });
});
