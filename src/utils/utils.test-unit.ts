import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
// import { IBigNumber } from '../shared/types.js';
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
