/// <reference types="jest" />
import { describe, it, expect } from '@jest/globals';
export {};

import { userReducer, checkAuth } from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice (checkAuth)', () => {
  const initialState = {
    user: null as TUser | null,
    isAuthChecked: false
  };

  it('pending: isAuthChecked → false', () => {
    const state = userReducer(initialState, {
      type: checkAuth.pending.type
    });
    expect(state.isAuthChecked).toBe(false);
  });

  it('fulfilled: сохраняет user и isAuthChecked → true', () => {
    const user: TUser = { name: 'John', email: 'john@example.com' } as TUser;

    const state = userReducer(initialState, {
      type: checkAuth.fulfilled.type,
      payload: user
    });

    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('rejected: user → null и isAuthChecked → true', () => {
    const state = userReducer(
      { ...initialState, user: { name: 'X', email: 'x@x.x' } as TUser },
      { type: checkAuth.rejected.type }
    );

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
