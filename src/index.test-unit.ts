import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { ERRORS } from './shared/errors.js';
import {
  IBigNumberRoundingModeName,
  IBuildType,
  getBigNumber,
  buildNumber,
  isNumber,
  isInteger,
  isFloat,
  prettifyNumber,
} from './index.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// valid and invalid numeric values
const valid = [
  -854.11, 100.54, 154124564.655, 100.00,
  '-4561.551', '100.54', '9845418.455561', '100.00', '100.',
  BigNumber(-854.11), BigNumber(100.54), BigNumber('9845418.455561'), BigNumber('-4561.551'),
  0, -0, Infinity, -Infinity,
];
const invalid = [
  {}, [], [1, 2, 3], undefined, null, NaN, '', new Date(), Buffer.from('Hello!'), true, false,
  Symbol('Hello'), Symbol.for('Hello'), new Set([1, 2, 3]), new Map([['dog', 'woof'], ['asd', 'true']]),
  BigNumber(NaN), BigNumber('123,123.11'), BigNumber(undefined!), BigNumber(null!),
  '00.00.00', '123123.1231.555,28',
];





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('Number Builders', () => {
  describe('getBigNumber', () => {
    test('can instantiate BigNumber with any valid number', () => {
      valid.forEach((value) => {
        const bn = getBigNumber(value);
        expect(bn).toBeInstanceOf(BigNumber);
        expect(BigNumber.isBigNumber(bn)).toBe(true);
        expect(bn.toNumber()).toBe(Number(value));
      });
    });

    test('throws if an invalid value is provided', () => {
      invalid.forEach((value) => {
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

    test('can specify the number of decimal places for the build output', () => {
      expect(buildNumber('512.1111', { decimalPlaces: 2, buildType: 'string' })).toBe('512.11');
      expect(buildNumber('512.1111111111111111111', { decimalPlaces: 18, buildType: 'string' })).toBe('512.111111111111111111');
      expect(buildNumber('512.855', { decimalPlaces: 2, buildType: 'string' })).toBe('512.86');
      expect(buildNumber('512.855', { decimalPlaces: 15, buildType: 'string' })).toBe('512.855');
    });

    test('can specify the rounding mode for the build output', () => {
      expect(buildNumber(512.155, { roundingMode: 'ROUND_HALF_UP' })).toBe(512.16);
      expect(buildNumber(512.155, { roundingMode: 'ROUND_HALF_DOWN' })).toBe(512.15);
      expect(buildNumber(512.155, { roundingMode: 'ROUND_CEIL' })).toBe(513);
      expect(buildNumber(512.553, { roundingMode: 'ROUND_HALF_CEIL' })).toBe(513);
      expect(buildNumber(512.499, { roundingMode: 'ROUND_HALF_CEIL' })).toBe(512);
      expect(buildNumber(512.155, { roundingMode: 'ROUND_FLOOR' })).toBe(512);
      expect(buildNumber(512.51, { roundingMode: 'ROUND_HALF_FLOOR' })).toBe(513);
      expect(buildNumber(512.5, { roundingMode: 'ROUND_HALF_FLOOR' })).toBe(512);
    });

    test('throws if an invalid value is provided', () => {
      expect(() => buildNumber(undefined!)).toThrowError(ERRORS.INVALID_VALUE);
    });

    test('throws if an invalid build type is provided', () => {
      expect(() => buildNumber(1, { buildType: <IBuildType>'invalid' })).toThrowError(ERRORS.INVALID_BUILD_TYPE);
    });

    test('throws if an invalid rounding mode is provided', () => {
      expect(() => buildNumber(1, { roundingMode: <IBigNumberRoundingModeName>'invalid' })).toThrowError(ERRORS.INVALID_ROUNDING_MODE);
    });

    test('throws if an invalid number of decimal places is provided', () => {
      expect(
        () => buildNumber(1, { decimalPlaces: -5 }),
      ).toThrowError(ERRORS.INVALID_DECIMAL_PLACES);
    });
  });



  describe('prettifyNumber', () => {
    test('can prettify a number with any number of decimals and any rounding mode', () => {
      expect(prettifyNumber(1.555, { build: { roundingMode: 'ROUND_HALF_UP' } })).toBe('1.56');
      expect(prettifyNumber(1.555, { build: { roundingMode: 'ROUND_HALF_DOWN' } })).toBe('1.55');
      expect(prettifyNumber(105142.821546985, { build: { decimalPlaces: 8, roundingMode: 'ROUND_HALF_DOWN' } })).toBe('105,142.82154698');
    });

    test('can separate groups with any character', () => {
      expect(prettifyNumber(15426525.84, { format: { groupSeparator: ' ' } })).toBe('15 426 525.84');
      expect(prettifyNumber(15426525.84, { format: { groupSeparator: '-' } })).toBe('15-426-525.84');
    });

    test('can use any character to separate thousands and decimals', () => {
      expect(prettifyNumber(15426525.84, { format: { groupSeparator: '.', decimalSeparator: ',' } })).toBe('15.426.525,84');
    });

    test('can add a prefix to any number', () => {
      expect(prettifyNumber(15426525.84, { format: { prefix: '$' } })).toBe('$15,426,525.84');
      expect(prettifyNumber(15426525.84, { format: { prefix: 'USD ' } })).toBe('USD 15,426,525.84');
    });

    test('can add a suffix to any number', () => {
      expect(prettifyNumber(15426525.84, { format: { suffix: '$' } })).toBe('15,426,525.84$');
      expect(prettifyNumber(15426525.84, { format: { suffix: ' USD' } })).toBe('15,426,525.84 USD');
    });

    test.todo('throws if an invalid format config is provided');
  });
});





describe('Helpers', () => {
  describe('isNumber', () => {
    test('can determine if a value is a valid number', () => {
      expect(valid.every(isNumber)).toBe(true);
    });

    test('can determine if a value is an invalid number', () => {
      expect(invalid.every(isNumber)).toBe(false);
    });
  });


  describe('isInteger', () => {
    test('can determine if a value is an integer', () => {
      expect(isInteger(100)).toBe(true);
      expect(isInteger('4541534154')).toBe(true);
      expect(isInteger('1.')).toBe(true);
    });

    test('can determine if a value is not an integer', () => {
      expect(isInteger(undefined)).toBe(false);
      expect(isInteger(100.55)).toBe(false);
      expect(isInteger('1.01')).toBe(false);
    });
  });


  describe('isFloat', () => {
    test('can determine if a value is a float', () => {
      expect(isFloat(100.55)).toBe(true);
      expect(isFloat('4541534154.54641515645644512')).toBe(true);
      expect(isFloat('1.001')).toBe(true);
    });

    test('can determine if a value is not a float', () => {
      expect(isFloat(undefined)).toBe(false);
      expect(isFloat(100)).toBe(false);
      expect(isFloat('1.0')).toBe(false);
    });
  });
});
