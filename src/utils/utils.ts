import { BigNumber } from 'bignumber.js';
import { encodeError, isEncodedError, extractMessage } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberRoundingMode,
  IBigNumberRoundingModeName,
  IBigNumberValue,
} from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Builds the error message that will be thrown in case the provided value cannot be instantiated.
 * @param value
 * @param error
 * @returns string
 */
const __buildInvalidValueErrorMessage = (value: any, error?: any): string => {
  try {
    return error
      ? encodeError(`BigNumber could not be instantiated with: ${value} | ${extractMessage(error)}`, ERRORS.INVALID_VALUE)
      : encodeError(`BigNumber could not be instantiated with: ${value}.`, ERRORS.INVALID_VALUE);
  } catch (e) {
    return error
      ? encodeError(`BigNumber could not be instantiated with: UNKNOWN | ${extractMessage(error)}`, ERRORS.INVALID_VALUE)
      : encodeError('BigNumber could not be instantiated with: UNKNOWN.', ERRORS.INVALID_VALUE);
  }
};

/**
 * Retrieves the rounding mode number based on a given name.
 * @param name
 * @returns IBigNumberRoundingMode
 * @throws
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 */
const __getRoundingMode = (name: IBigNumberRoundingModeName): IBigNumberRoundingMode => {
  switch (name) {
    case 'ROUND_UP':
      return 0;
    case 'ROUND_DOWN':
      return 1;
    case 'ROUND_CEIL':
      return 2;
    case 'ROUND_FLOOR':
      return 3;
    case 'ROUND_HALF_UP':
      return 4;
    case 'ROUND_HALF_DOWN':
      return 5;
    case 'ROUND_HALF_EVEN':
      return 6;
    case 'ROUND_HALF_CEIL':
      return 7;
    case 'ROUND_HALF_FLOOR':
      return 8;
    default:
      throw new Error(encodeError(`The rounding mode '${name}' is not supported by this library.`, ERRORS.INVALID_ROUNDING_MODE));
  }
};




/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Instantiates BigNumber based on a given value and returns it.
 * @param value
 * @returns IBigNumber
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 */
const getBigNumber = (value: IBigNumberValue): IBigNumber => {
  try {
    const bn = BigNumber.isBigNumber(value) ? value : BigNumber(value);
    if (bn.isNaN()) {
      throw new Error(__buildInvalidValueErrorMessage(value));
    }
    return bn;
  } catch (e) {
    // if it is a known error, just rethrow it
    if (isEncodedError(e)) {
      throw e;
    }
    throw new Error(__buildInvalidValueErrorMessage(value, e));
  }
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // constants
  // ...

  // implementation
  getBigNumber,
};
