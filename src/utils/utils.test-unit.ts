import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { IBuildConfig } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';
import {
  buildInvalidValueErrorMessage,
  buildConfig,
  roundBigNumber,
  convertBigNumberToType,
  buildFormatConfig,
} from './utils.js';



/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// invalid value mocks
const iv = BigNumber(NaN);

// default build config
const dbc: IBuildConfig = { decimalPlaces: 2, roundingMode: 'ROUND_HALF_UP', buildType: 'number' };





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
      buildConfig(), buildConfig(undefined), buildConfig(null!), buildConfig({}),
      buildConfig({ decimalPlaces: undefined, roundingMode: undefined, buildType: undefined }),
    ].forEach((val) => {
      expect(val).toStrictEqual(dbc);
    });
  });

  test('can build a config object by providing a partial config object', () => {
    expect(buildConfig({ decimalPlaces: 8 })).toStrictEqual({ ...dbc, decimalPlaces: 8 });
    expect(buildConfig({ roundingMode: 'ROUND_CEIL' })).toStrictEqual({ ...dbc, roundingMode: 'ROUND_CEIL' });
    expect(buildConfig({ buildType: 'string' })).toStrictEqual({ ...dbc, buildType: 'string' });
    expect(buildConfig({
      buildType: 'bignumber',
      decimalPlaces: 6,
    })).toStrictEqual({ ...dbc, buildType: 'bignumber', decimalPlaces: 6 });
  });

  test('can build a config object by providing a complete config object', () => {
    const config: IBuildConfig = { decimalPlaces: 4, roundingMode: 'ROUND_HALF_DOWN', buildType: 'string' };
    expect(buildConfig(config)).toStrictEqual(config);
  });
});





describe('roundBigNumber', () => {
  test.todo('can apply the ROUND_UP mode with any number of decimal places');

  test.todo('can apply the ROUND_DOWN mode with any number of decimal places');

  test.todo('can apply the ROUND_CEIL mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.01'), 2, 'ROUND_CEIL').toString()).toBe('2');
    expect(roundBigNumber(BigNumber('1.5'), 2, 'ROUND_CEIL').toString()).toBe('2');
    expect(roundBigNumber(BigNumber('999'), 2, 'ROUND_CEIL').toString()).toBe('999');
    expect(roundBigNumber(BigNumber('5.000000000001'), 2, 'ROUND_CEIL').toString()).toBe('6');
  });

  test.todo('can apply the ROUND_FLOOR mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.01'), 2, 'ROUND_FLOOR').toString()).toBe('1');
    expect(roundBigNumber(BigNumber('1.5'), 2, 'ROUND_FLOOR').toString()).toBe('1');
    expect(roundBigNumber(BigNumber('999'), 2, 'ROUND_FLOOR').toString()).toBe('999');
    expect(roundBigNumber(BigNumber('5.000000000001'), 2, 'ROUND_FLOOR').toString()).toBe('5');
  });

  test('can apply the ROUND_HALF_UP mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.5'), 0, 'ROUND_HALF_UP').toString()).toBe('2');
    expect(roundBigNumber(BigNumber(1.556), 2, 'ROUND_HALF_UP').toString()).toBe('1.56');
    expect(roundBigNumber(BigNumber(1.555), 2, 'ROUND_HALF_UP').toString()).toBe('1.56');
    expect(roundBigNumber(BigNumber(1.554), 2, 'ROUND_HALF_UP').toString()).toBe('1.55');
    expect(roundBigNumber(BigNumber('1054.884125695'), 7, 'ROUND_HALF_UP').toString()).toBe('1054.8841257');
    expect(roundBigNumber(BigNumber('1054.884125694'), 8, 'ROUND_HALF_UP').toString()).toBe('1054.88412569');
    expect(roundBigNumber(BigNumber('1005421251254.8841256948841256944'), 18, 'ROUND_HALF_UP').toString()).toBe('1005421251254.884125694884125694');
    expect(roundBigNumber(BigNumber('1005421251254.8841256948841256945'), 18, 'ROUND_HALF_UP').toString()).toBe('1005421251254.884125694884125695');
  });

  test('can apply the ROUND_HALF_DOWN mode with any number of decimal places', () => {
    expect(roundBigNumber(BigNumber('1.5'), 0, 'ROUND_HALF_DOWN').toString()).toBe('1');
    expect(roundBigNumber(BigNumber(1.556), 2, 'ROUND_HALF_DOWN').toString()).toBe('1.56');
    expect(roundBigNumber(BigNumber(1.555), 2, 'ROUND_HALF_DOWN').toString()).toBe('1.55');
    expect(roundBigNumber(BigNumber(1.554), 2, 'ROUND_HALF_DOWN').toString()).toBe('1.55');
    expect(roundBigNumber(BigNumber('1054.884125695'), 7, 'ROUND_HALF_DOWN').toString()).toBe('1054.8841257');
    expect(roundBigNumber(BigNumber('1054.884125694'), 8, 'ROUND_HALF_DOWN').toString()).toBe('1054.88412569');
    expect(roundBigNumber(BigNumber('1005421251254.8841256948841256944'), 18, 'ROUND_HALF_DOWN').toString()).toBe('1005421251254.884125694884125694');
    expect(roundBigNumber(BigNumber('1005421251254.8841256948841256945'), 18, 'ROUND_HALF_DOWN').toString()).toBe('1005421251254.884125694884125694');
  });

  test.todo('can apply the ROUND_HALF_EVEN mode with any number of decimal places');

  test.todo('can apply the ROUND_HALF_CEIL mode with any number of decimal places');

  test.todo('can apply the ROUND_HALF_FLOOR mode with any number of decimal places');
});
