/// <reference types="jest" />
import { describe, it, expect } from '@jest/globals';
export {};
import { rootReducer } from './store';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: '' });
    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(initialState);
  });
});
