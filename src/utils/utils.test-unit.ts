import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { IBigNumberRoundingModeName, IBigNumberFormat, IConfig, IType } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';
import {
  buildInvalidValueErrorMessage,
  buildConfig,
  roundBigNumber,
  convertBigNumberToType,
  buildFormatConfig,
  sortBigNumbers,
} from './utils.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// invalid value mocks
const iv = BigNumber(NaN);

// default build config
const dbc: IConfig = { decimalPlaces: 2, roundingMode: 'ROUND_HALF_UP', type: 'number' };

// default format config
const dfc: IBigNumberFormat = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('buildInvalidValueErrorMessage', () => {
  test('can build an error from an invalid value', () => {
    const msg = buildInvalidValueErrorMessage(iv);
    expect(msg).toMatch('NaN');
    expect(msg).toMatch(ERRORS.INVALID_VALUE);
  });

  test('can build an error from an invalid value that also has an error', () => {
    const err = new Error('There has been an error while instantiating BigNumber');
    const msg = buildInvalidValueErrorMessage(iv, err);
    expect(msg).toMatch('NaN');
    expect(msg).toMatch(ERRORS.INVALID_VALUE);
    expect(msg).toMatch(err.message);
  });

  test('can build an error from an invalid value that cannot be stringified', () => {
    const msg = buildInvalidValueErrorMessage(Symbol('Hello'));
    expect(msg).toMatch('UNKNOWN');
    expect(msg).toMatch(ERRORS.INVALID_VALUE);
  });

  test('can build an error from an invalid value that cannot be stringified and also has an error', () => {
    const err = new Error('There has been an error while instantiating BigNumber');
    const msg = buildInvalidValueErrorMessage(Symbol('Hello'), err);
    expect(msg).toMatch('UNKNOWN');
    expect(msg).toMatch(ERRORS.INVALID_VALUE);
    expect(msg).toMatch(err.message);
  });
});

describe('buildConfig', () => {
  test('can build a default config object by providing invalid values', () => {
    [
      buildConfig(),
      buildConfig(undefined),
      buildConfig(null!),
      buildConfig({}),
      buildConfig({ decimalPlaces: undefined, roundingMode: undefined, type: undefined }),
    ].forEach((val) => {
      expect(val).toStrictEqual(dbc);
    });
  });

  test('can build a config object by providing a partial config object', () => {
    expect(buildConfig({ decimalPlaces: 8 })).toStrictEqual({ ...dbc, decimalPlaces: 8 });
    expect(buildConfig({ roundingMode: 'ROUND_HALF_EVEN' })).toStrictEqual({
      ...dbc,
      roundingMode: 'ROUND_HALF_EVEN',
    });
    expect(buildConfig({ type: 'string' })).toStrictEqual({ ...dbc, type: 'string' });
    expect(
      buildConfig({
        type: 'bignumber',
        decimalPlaces: 6,
      }),
    ).toStrictEqual({ ...dbc, type: 'bignumber', decimalPlaces: 6 });
  });

  test('can build a config object by providing a complete config object', () => {
    const config: IConfig = { decimalPlaces: 4, roundingMode: 'ROUND_HALF_DOWN', type: 'string' };
    expect(buildConfig(config)).toStrictEqual(config);
  });

  test('if the rounding mode specified is *_CEIL or *_FLOOR, it will set the decimal places to 0', () => {
    expect(buildConfig({ roundingMode: 'ROUND_UP' }).decimalPlaces).toBe(dbc.decimalPlaces);
    expect(buildConfig({ roundingMode: 'ROUND_DOWN' }).decimalPlaces).toBe(dbc.decimalPlaces);
    expect(buildConfig({ roundingMode: 'ROUND_CEIL' }).decimalPlaces).toBe(0);
    expect(buildConfig({ roundingMode: 'ROUND_FLOOR' }).decimalPlaces).toBe(0);
    expect(buildConfig({ roundingMode: 'ROUND_HALF_UP' }).decimalPlaces).toBe(dbc.decimalPlaces);
    expect(buildConfig({ roundingMode: 'ROUND_HALF_DOWN' }).decimalPlaces).toBe(dbc.decimalPlaces);
    expect(buildConfig({ roundingMode: 'ROUND_HALF_EVEN' }).decimalPlaces).toBe(dbc.decimalPlaces);
    expect(buildConfig({ roundingMode: 'ROUND_HALF_CEIL' }).decimalPlaces).toBe(0);
    expect(buildConfig({ roundingMode: 'ROUND_HALF_FLOOR' }).decimalPlaces).toBe(0);
  });

  test('throws if an invalid decimalPlaces value is provided', () => {
    [-0.001, -0.00542154, -100, Infinity, -Infinity, 101].forEach((val: any) => {
      expect(() => buildConfig({ decimalPlaces: val })).toThrowError(ERRORS.INVALID_DECIMAL_PLACES);
    });
  });
});

describe('roundBigNumber', () => {
  // test.todo('can apply the ROUND_UP mode with any number of decimal places');

  // test.todo('can apply the ROUND_DOWN mode with any number of decimal places');

  test('can apply the ROUND_CEIL mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.01'), 0, 'ROUND_CEIL').toString()).toBe('2');
    expect(roundBigNumber(BigNumber('1.5'), 0, 'ROUND_CEIL').toString()).toBe('2');
    expect(roundBigNumber(BigNumber('1.0000000000000005'), 0, 'ROUND_CEIL').toString()).toBe('2');
    expect(roundBigNumber(BigNumber('512.155'), 0, 'ROUND_CEIL').toString()).toBe('513');
    expect(roundBigNumber(BigNumber('999'), 0, 'ROUND_CEIL').toString()).toBe('999');
    expect(roundBigNumber(BigNumber('5.000000000001'), 0, 'ROUND_CEIL').toString()).toBe('6');
    expect(
      roundBigNumber(BigNumber('1005421251254.8841256948841256944'), 0, 'ROUND_CEIL').toString(),
    ).toBe('1005421251255');
  });

  test('can apply the ROUND_FLOOR mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.01'), 0, 'ROUND_FLOOR').toString()).toBe('1');
    expect(roundBigNumber(BigNumber('1.5'), 0, 'ROUND_FLOOR').toString()).toBe('1');
    expect(roundBigNumber(BigNumber('1.999999999999999999'), 0, 'ROUND_FLOOR').toString()).toBe(
      '1',
    );
    expect(roundBigNumber(BigNumber('512.155'), 0, 'ROUND_FLOOR').toString()).toBe('512');
    expect(roundBigNumber(BigNumber('999'), 2, 'ROUND_FLOOR').toString()).toBe('999');
    expect(roundBigNumber(BigNumber('5.000000000001'), 0, 'ROUND_FLOOR').toString()).toBe('5');
    expect(
      roundBigNumber(BigNumber('1005421251254.8841256948841256944'), 0, 'ROUND_FLOOR').toString(),
    ).toBe('1005421251254');
  });

  test('can apply the ROUND_HALF_UP mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.5'), 0, 'ROUND_HALF_UP').toString()).toBe('2');
    expect(roundBigNumber(BigNumber(1.556), 2, 'ROUND_HALF_UP').toString()).toBe('1.56');
    expect(roundBigNumber(BigNumber(1.555), 2, 'ROUND_HALF_UP').toString()).toBe('1.56');
    expect(roundBigNumber(BigNumber(1.554), 2, 'ROUND_HALF_UP').toString()).toBe('1.55');
    expect(roundBigNumber(BigNumber('1054.884125695'), 7, 'ROUND_HALF_UP').toString()).toBe(
      '1054.8841257',
    );
    expect(roundBigNumber(BigNumber('1054.884125694'), 8, 'ROUND_HALF_UP').toString()).toBe(
      '1054.88412569',
    );
    expect(
      roundBigNumber(
        BigNumber('1005421251254.8841256948841256944'),
        18,
        'ROUND_HALF_UP',
      ).toString(),
    ).toBe('1005421251254.884125694884125694');
    expect(
      roundBigNumber(
        BigNumber('1005421251254.8841256948841256945'),
        18,
        'ROUND_HALF_UP',
      ).toString(),
    ).toBe('1005421251254.884125694884125695');
  });

  test('can apply the ROUND_HALF_DOWN mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.5'), 0, 'ROUND_HALF_DOWN').toString()).toBe('1');
    expect(roundBigNumber(BigNumber(1.556), 2, 'ROUND_HALF_DOWN').toString()).toBe('1.56');
    expect(roundBigNumber(BigNumber(1.555), 2, 'ROUND_HALF_DOWN').toString()).toBe('1.55');
    expect(roundBigNumber(BigNumber(1.554), 2, 'ROUND_HALF_DOWN').toString()).toBe('1.55');
    expect(roundBigNumber(BigNumber('1054.884125695'), 7, 'ROUND_HALF_DOWN').toString()).toBe(
      '1054.8841257',
    );
    expect(roundBigNumber(BigNumber('1054.884125694'), 8, 'ROUND_HALF_DOWN').toString()).toBe(
      '1054.88412569',
    );
    expect(
      roundBigNumber(
        BigNumber('1005421251254.8841256948841256944'),
        18,
        'ROUND_HALF_DOWN',
      ).toString(),
    ).toBe('1005421251254.884125694884125694');
    expect(
      roundBigNumber(
        BigNumber('1005421251254.8841256948841256945'),
        18,
        'ROUND_HALF_DOWN',
      ).toString(),
    ).toBe('1005421251254.884125694884125694');
  });

  // test.todo('can apply the ROUND_HALF_EVEN mode with any number of decimal places');

  // test.todo('can apply the ROUND_HALF_CEIL mode with any number of decimal places');

  // test.todo('can apply the ROUND_HALF_FLOOR mode with any number of decimal places');

  test('throws if an invalid rounding mode is provided', () => {
    expect(() =>
      roundBigNumber(BigNumber(1.565), 2, <IBigNumberRoundingModeName>'invalid'),
    ).toThrowError(ERRORS.INVALID_ROUNDING_MODE);
  });
});

describe('convertBigNumberToType', () => {
  test('can convert a BigNumber into a string', () => {
    [
      BigNumber(123),
      BigNumber('54645.1254'),
      BigNumber('554154223548450215454.5451212445461242'),
    ].forEach((v) => {
      expect(convertBigNumberToType(v, 'string')).toBe(v.toString());
    });
  });

  test('can convert a BigNumber into a number', () => {
    [BigNumber(123), BigNumber(54645.1254), BigNumber(14512.546542124548)].forEach((v) => {
      expect(convertBigNumberToType(v, 'number')).toBe(v.toNumber());
    });
  });

  test('can convert a BigNumber into a BigNumber', () => {
    [BigNumber(123), BigNumber(54645.1254), BigNumber(14512.546542124548)].forEach((v) => {
      const val = convertBigNumberToType(v, 'bignumber');
      expect(BigNumber.isBigNumber(val)).toBe(true);
      expect(v.isEqualTo(val)).toBe(true);
    });
  });

  test('throws if an invalid type is provided', () => {
    expect(() => convertBigNumberToType(BigNumber(100), <IType>'something')).toThrowError(
      ERRORS.INVALID_TYPE,
    );
  });
});

describe('buildFormatConfig', () => {
  test('can build a default config object by providing invalid values', () => {
    [
      buildFormatConfig(),
      buildFormatConfig(undefined),
      buildFormatConfig(null!),
      buildFormatConfig({}),
      buildFormatConfig({
        prefix: undefined,
        decimalSeparator: undefined,
        groupSeparator: undefined,
        groupSize: undefined,
        secondaryGroupSize: undefined,
        fractionGroupSeparator: undefined,
        fractionGroupSize: undefined,
        suffix: undefined,
      }),
    ].forEach((val) => {
      expect(val).toStrictEqual(dfc);
    });
  });

  test('can build a config object by providing a partial config object', () => {
    expect(buildFormatConfig({ prefix: '$' })).toStrictEqual({ ...dfc, prefix: '$' });
    expect(
      buildFormatConfig({ decimalSeparator: ',', groupSeparator: '.', suffix: 'BTC' }),
    ).toStrictEqual({
      ...dfc,
      decimalSeparator: ',',
      groupSeparator: '.',
      suffix: 'BTC',
    });
  });

  test('can build a config object by providing a complete config object', () => {
    const config: IBigNumberFormat = {
      prefix: '$',
      decimalSeparator: ',',
      groupSeparator: '.',
      groupSize: 5,
      secondaryGroupSize: 3,
      fractionGroupSeparator: ' / ',
      fractionGroupSize: 2,
      suffix: 'Bitcoin',
    };
    expect(buildFormatConfig(config)).toStrictEqual(config);
  });
});

describe('sortBigNumbers', () => {
  test('can determine the correct order value based on the given sort order', () => {
    expect(sortBigNumbers('asc')(BigNumber(1), BigNumber(1))).toBe(0);
    expect(sortBigNumbers('asc')(BigNumber(1), BigNumber(2))).toBe(-1);
    expect(sortBigNumbers('asc')(BigNumber(2), BigNumber(1))).toBe(1);

    expect(sortBigNumbers('desc')(BigNumber(1), BigNumber(1))).toBe(0);
    expect(sortBigNumbers('desc')(BigNumber(1), BigNumber(2))).toBe(1);
    expect(sortBigNumbers('desc')(BigNumber(2), BigNumber(1))).toBe(-1);
  });

  test('can sort a list of BigNumbers ascendingly', () => {
    const bns = [BigNumber(5), BigNumber(7), BigNumber(4), BigNumber(15)];
    bns.sort(sortBigNumbers('asc'));
    expect(bns).toStrictEqual([BigNumber(4), BigNumber(5), BigNumber(7), BigNumber(15)]);
  });

  test('can sort a list of BigNumbers descendingly', () => {
    const bns = [BigNumber(5), BigNumber(7), BigNumber(4), BigNumber(15)];
    bns.sort(sortBigNumbers('desc'));
    expect(bns).toStrictEqual([BigNumber(15), BigNumber(7), BigNumber(5), BigNumber(4)]);
  });
});
