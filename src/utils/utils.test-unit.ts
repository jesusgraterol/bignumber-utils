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
const dbc: IBuildConfig = { decimalPlaces: 2, roundingMode: 'ROUND_UP', buildType: 'number' };





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
