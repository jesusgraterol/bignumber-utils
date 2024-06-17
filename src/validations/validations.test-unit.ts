import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { ERRORS } from '../shared/errors.js';
import { validateDecimalPlaces, validateValuesArray } from './validations.js';

describe('validateDecimalPlaces', () => {
  test('does not throw if a valid number of decimal places is provided', () => {
    [
      0, 2, 6, 18, 8, 100,
    ].forEach((v) => {
      expect(validateDecimalPlaces(v)).toBeUndefined();
    });
  });

  test('throws if an invalid value is provided', () => {
    [
      -1, -545, '11231', 101, 900,
    ].forEach((v: any) => {
      expect(() => validateDecimalPlaces(v)).toThrowError(ERRORS.INVALID_DECIMAL_PLACES);
    });
  });
});




describe('validateValuesArray', () => {
  test('does not throw if a valid array is provided', () => {
    [
      [], [1, 2], [1, '2', BigNumber(3)],
    ].forEach((v) => {
      expect(validateValuesArray(v, 'test')).toBeUndefined();
    });
  });

  test('throws if an invalid array is provided', () => {
    [
      undefined, null, {}, new Set([1, 2, 3]), new Map([['dog', 'woof'], ['asd', 'true']]),
    ].forEach((v: any) => {
      expect(() => validateValuesArray(v, 'test')).toThrowError(ERRORS.INVALID_VALUES_ARRAY);
    });
  });
});
