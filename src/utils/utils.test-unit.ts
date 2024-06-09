import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
// import { IBigNumber } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';
import { getBigNumber, buildNumber } from './utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('getBigNumber', () => {
  test('can instantiate BigNumber with any valid number', () => {
    [
      -854.11, 100.54, 154124564.655,
      '-4561.551', '100.54', '9845418.455561',
      BigNumber(-854.11), BigNumber(100.54), BigNumber('9845418.455561'), BigNumber('-4561.551'),
      0, -0, Infinity, -Infinity,
    ].forEach((value) => {
      const bn = getBigNumber(value);
      expect(bn).toBeInstanceOf(BigNumber);
      expect(BigNumber.isBigNumber(bn)).toBe(true);
      expect(bn.toNumber()).toBe(Number(value));
    });
  });

  test('throws if an invalid value is provided', () => {
    [
      {}, [], [1, 2, 3], undefined, null, NaN, '', new Date(), Buffer.from('Hello!'),
      true, false, Symbol('Hello'), new Set([1, 2, 3]), new Map([['dog', 'woof'], ['asd', 'true']]),
    ].forEach((value) => {
      expect(() => getBigNumber(<any>value)).toThrowError(ERRORS.INVALID_VALUE);
    });
  });
});


describe('buildNumber', () => {
  test('can build a BigNumber from any valid value', () => {
    const val = buildNumber(100.58, { buildType: 'string' });
    expect(typeof val).toBe('string');
    expect(val).toBe('100.58');
  });
});
