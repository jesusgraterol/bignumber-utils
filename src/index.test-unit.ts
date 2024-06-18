import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { ERRORS } from './shared/errors.js';
import {
  IBigNumberRoundingModeName,
  IBuildType,
  getBigNumber,
  prettifyNumber,
  buildNumber,
  isBigNumber,
  isNumber,
  isInteger,
  isFloat,
  calculateSum,
  calculateMin,
  calculateMax,
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

    test('regardless of how BigNumber is instantiated, the value is always identical', () => {
      const fromString = getBigNumber('456452154.5645412');
      const fromNumber = getBigNumber(456452154.5645412);
      const fromBigNumber = getBigNumber(BigNumber(456452154.5645412));

      // ensure they are all instances of BigNumber
      expect(BigNumber.isBigNumber(fromString)).toBe(true);
      expect(BigNumber.isBigNumber(fromNumber)).toBe(true);
      expect(BigNumber.isBigNumber(fromBigNumber)).toBe(true);

      // they should be all equals to one another
      expect(fromString.isEqualTo(fromNumber)).toBe(true);
      expect(fromNumber.isEqualTo(fromBigNumber)).toBe(true);
      expect(fromString.isEqualTo(fromBigNumber)).toBe(true);
    });

    test('can make use of any of the instance methods', () => {
      expect(getBigNumber(1).absoluteValue().toNumber()).toBe(1);
      expect(getBigNumber(-1).absoluteValue().toNumber()).toBe(1);

      expect(getBigNumber(355).dividedBy(113).toString()).toBe('3.14159292035398230088');

      expect(getBigNumber(5).dividedToIntegerBy(3).toString()).toBe('1');

      expect(getBigNumber(0.7).exponentiatedBy(2).toString()).toBe('0.49');

      expect(getBigNumber(-12.7).integerValue().toString()).toBe('-13');

      expect(getBigNumber(1).isEqualTo(1)).toBe(true);

      expect(getBigNumber(1).isFinite()).toBe(true);
      expect(getBigNumber(Infinity).isFinite()).toBe(false);

      expect(getBigNumber(0.1).isGreaterThan(0.01)).toBe(true);
      expect(getBigNumber(0.1).isGreaterThanOrEqualTo(0.1)).toBe(true);

      expect(getBigNumber(1).isInteger()).toBe(true);
      expect(getBigNumber(0.11).isInteger()).toBe(false);

      expect(getBigNumber(0.11).isLessThan(0.2)).toBe(true);
      expect(getBigNumber(0.11).isLessThanOrEqualTo(0.11)).toBe(true);

      expect(getBigNumber(-1).isNegative()).toBe(true);

      expect(getBigNumber(1).isPositive()).toBe(true);

      expect(getBigNumber(0).isZero()).toBe(true);

      expect(getBigNumber(5).minus(1).toString()).toBe('4');

      expect(getBigNumber(1).modulo(0.9).toString()).toBe('0.1');

      expect(getBigNumber(0.6).multipliedBy(3).toString()).toBe('1.8');

      expect(getBigNumber(0.6).negated().toString()).toBe('-0.6');
      expect(getBigNumber(-0.6).negated().toString()).toBe('0.6');

      expect(getBigNumber(0.1).plus(0.2).toString()).toBe('0.3');

      expect(getBigNumber(1.23).shiftedBy(3).toString()).toBe('1230');
      expect(getBigNumber(1.23).shiftedBy(-3).toString()).toBe('0.00123');

      expect(getBigNumber(16).squareRoot().toString()).toBe('4');

      expect(getBigNumber(45.6).toExponential().toString()).toBe('4.56e+1');

      expect(getBigNumber(1.75).toFraction().toString()).toBe('7,4');
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
      expect(prettifyNumber(15426525.846545124, { build: { decimalPlaces: 8 }, format: { prefix: 'BTC ' } })).toBe('BTC 15,426,525.84654512');
      expect(prettifyNumber('15426525.846545124846545124', { build: { decimalPlaces: 18 }, format: { prefix: 'ETH ' } })).toBe('ETH 15,426,525.846545124846545124');
    });

    test('can add a suffix to any number', () => {
      expect(prettifyNumber(15426525.84, { format: { suffix: '$' } })).toBe('15,426,525.84$');
      expect(prettifyNumber(15426525.84, { format: { suffix: ' USD' } })).toBe('15,426,525.84 USD');
      expect(prettifyNumber(15426525.846545124, { build: { decimalPlaces: 8 }, format: { suffix: ' BTC' } })).toBe('15,426,525.84654512 BTC');
      expect(prettifyNumber('15426525.846545124846545124', { build: { decimalPlaces: 18 }, format: { suffix: ' ETH' } })).toBe('15,426,525.846545124846545124 ETH');
    });
  });
});





describe('Helpers', () => {
  describe('isBigNumber', () => {
    test('can identify when a value is a BigNumber Instance', () => {
      [
        getBigNumber(1), getBigNumber('123'), getBigNumber(BigNumber(1)),
      ].forEach((val) => {
        expect(isBigNumber(val)).toBe(true);
      });
    });

    test('can identify when a value is not a BigNumber Instance', () => {
      [
        112.55, '1234.55', new Date(), getBigNumber('123').toString(),
      ].forEach((val) => {
        expect(isBigNumber(val)).toBe(false);
      });
    });
  });

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





describe('Essential Calculations', () => {
  describe('calculateSum', () => {
    test('can calculate the sum for any array of numeric values', () => {
      expect(calculateSum([1, 86, '55', 46.33, '47.55', BigNumber(8041.663321), 485, '99.11', BigNumber(-800.654)])).toBe(8061);
      expect(calculateSum([100, 50, 99.11, 68.3])).toBe(317.41);
      expect(calculateSum([])).toBe(0);
      expect(calculateSum([
        '0.286304850273819327', '0.00290532', '0.00251940040614675', '0.03506759540691015',
      ], { decimalPlaces: 18, buildType: 'string' })).toBe('0.326797166086876227');
    });

    test('throws if an invalid array of values is provided', () => {
      expect(() => calculateSum(undefined!)).toThrowError(ERRORS.INVALID_VALUES_ARRAY);
      expect(() => calculateSum(null!)).toThrowError(ERRORS.INVALID_VALUES_ARRAY);
      // @ts-ignore
      expect(() => calculateSum({})).toThrowError(ERRORS.INVALID_VALUES_ARRAY);
      // @ts-ignore
      expect(() => calculateSum(1)).toThrowError(ERRORS.INVALID_VALUES_ARRAY);
      // @ts-ignore
      expect(() => calculateSum('asd')).toThrowError(ERRORS.INVALID_VALUES_ARRAY);
    });

    test('throws if any of the values in the array is invalid', () => {
      expect(() => calculateSum([1, 86, '55', 46.33, '47.55', BigNumber(8041.663321), 485, '99.11', BigNumber(-800.654), NaN])).toThrowError(ERRORS.INVALID_VALUE);
    });

    test('throws if the decimal places is invalid', () => {
      expect(
        () => calculateSum([1, 86], { decimalPlaces: -1 }),
      ).toThrowError(ERRORS.INVALID_DECIMAL_PLACES);
    });

    test('throws if the build type is invalid', () => {
      expect(
        () => calculateSum([1, 86], { buildType: <IBuildType>'invalid' }),
      ).toThrowError(ERRORS.INVALID_BUILD_TYPE);
    });

    test('throws if the rounding mode is invalid', () => {
      expect(
        () => calculateSum([1, 86], { roundingMode: <IBigNumberRoundingModeName>'invalid' }),
      ).toThrowError(ERRORS.INVALID_ROUNDING_MODE);
    });
  });



  describe('calculateMin', () => {
    test('can identify the smallest value in an array of ints and floats', () => {
      expect(calculateMin([100, 200, 300, 400, 500])).toBe(100);
      expect(calculateMin([100.54, 201.69, 302.55, 988.25, 631.12])).toBe(100.54);
    });

    test('can identify the smallest value in an array of mixed types', () => {
      expect(calculateMin([1, 86, '55', 46.33, '47.55', BigNumber(8041.663321), 485, '99.11', BigNumber(-800.654)])).toBe(-800.65);
    });
  });



  describe('calculateMax', () => {
    test('can identify the largest value in an array of ints and floats', () => {
      expect(calculateMax([100, 200, 300, 400, 500])).toBe(500);
      expect(calculateMax([100.54, 201.69, 302.55, 988.25, 631.12])).toBe(988.25);
    });

    test('can identify the largest value in an array of mixed types', () => {
      expect(calculateMax([1, 86, '55', 46.33, '47.55', BigNumber(8041.663321), 485, '99.11', BigNumber(-800.654)])).toBe(8041.66);
    });
  });
});
