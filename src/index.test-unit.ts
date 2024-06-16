import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { ERRORS } from './shared/errors.js';
import { getBigNumber, buildNumber } from './index.js';

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
      {}, [], [1, 2, 3], undefined, null, NaN, '', new Date(), Buffer.from('Hello!'), true, false,
      Symbol('Hello'), Symbol.for('Hello'), new Set([1, 2, 3]), new Map([['dog', 'woof'], ['asd', 'true']]),
      BigNumber(NaN), BigNumber('123,123.11'), BigNumber(undefined!), BigNumber(null!),
    ].forEach((value) => {
      expect(() => getBigNumber(<any>value)).toThrowError(ERRORS.INVALID_VALUE);
    });
  });
});


describe('buildNumber', () => {
  test('can build a number from any valid value w/ default config', () => {
    const val = buildNumber(100.585);
    expect(val).toBeTypeOf('number');
    expect(val).toBe(100.59);
  });

  test('can specify the type for the build output', () => {
    expect(buildNumber(110.55, { buildType: 'number' })).toBe(110.55);
    expect(buildNumber(110.55, { buildType: 'string' })).toBe('110.55');
    expect(BigNumber(110.55).isEqualTo(buildNumber(110.55, { buildType: 'bignumber' }))).toBe(true);
  });

  test.todo('can specify the number of decimal places for the build output', () => {

  });

  test.todo('can specify the rounding mode for the build output', () => {
    expect(buildNumber(512.155, { roundingMode: 'ROUND_HALF_UP' })).toBe(512.16);
    expect(buildNumber(512.155, { roundingMode: 'ROUND_HALF_DOWN' })).toBe(512.15);
    expect(buildNumber(512.155, { roundingMode: 'ROUND_CEIL' })).toBe(513);
    expect(buildNumber(512.155, { roundingMode: 'ROUND_FLOOR' })).toBe(512);
  });

  test.todo('throws if an invalid value is provided');

  test.todo('throws if an invalid build type is provided');

  test.todo('throws if an invalid rounding mode is provided');
});
