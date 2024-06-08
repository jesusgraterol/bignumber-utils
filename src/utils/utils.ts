import { BigNumber } from 'bignumber.js';
import { encodeError, extractMessage, isEncodedError } from 'error-message-utils';
import { IBigNumber, IBigNumberValue, IRoundingModes } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

/**
 * Rounding Modes
 * Object containing all the rounding modes supported by the BigNumber Lib.
 */
const __ROUNDING_MODES: IRoundingModes = {
  ROUND_UP: 0, // rounds away from zero
  ROUND_DOWN: 1, // rounds towards zero
  ROUND_CEIL: 2, // rounds towards Infinity
  ROUND_FLOOR: 3, // rounds towards -Infinity
  ROUND_HALF_UP: 4, // rounds towards nearest neighbour. If equidistant, rounds away from zero
  ROUND_HALF_DOWN: 5, // rounds towards nearest neighbour. If equidistant, rounds towards zero
  ROUND_HALF_EVEN: 6, // rounds towards nearest neighbour. If equidistant, rounds towards even neig.
  ROUND_HALF_CEIL: 7, // rounds towards nearest neighbour. If equidistant, rounds towards Infinity
  ROUND_HALF_FLOOR: 8, // rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
};





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */


/**
 * Instantiates BigNumber based on a given value and returns it.
 * @param value
 * @returns IBigNumber
 * @throws
 * - VALUE_IS_NAN: if the given value is NaN
 * - VALUE_IS_INVALID: if the instantiation of BigNumber throws an error
 */
const getBigNumber = (value: IBigNumberValue): IBigNumber => {
  try {
    const bn = BigNumber.isBigNumber(value) ? value : BigNumber(value);
    if (bn.isNaN()) {
      throw new Error(encodeError(`BigNumber could not be instantiated with: ${value}`, ERRORS.VALUE_IS_NAN));
    }
    return bn;
  } catch (e) {
    // if it is a known error, just rethrow it
    if (isEncodedError(e)) {
      throw e;
    }
    throw new Error(encodeError(`BigNumber could not be instantiated with: ${value} | ${extractMessage(e)}`, ERRORS.VALUE_IS_INVALID));
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
