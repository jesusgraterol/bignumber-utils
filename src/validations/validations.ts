import { encodeError } from 'error-message-utils';
import { IBigNumberValue } from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Ensures the provided decimal places are acceptable.
 * @param decimalPlaces
 * @throws
 * - INVALID_DECIMAL_PLACES: if decimalPlaces is not a number or it is outside of the 0 - 100 range
 */
const validateDecimalPlaces = (decimalPlaces: number): void => {
  if (typeof decimalPlaces !== 'number' || decimalPlaces < 0 || decimalPlaces > 100) {
    throw new Error(encodeError(`The decimalPlaces '${decimalPlaces}' must be a number ranging 0 - 100.`, ERRORS.INVALID_DECIMAL_PLACES));
  }
};

/**
 * Ensures the provided values sequence is a valid array.
 * @param values
 * @param calculationName
 * @throws
 * - INVALID_VALUES_ARRAY: if values is not a valid array
 */
const validateValuesArray = (values: IBigNumberValue[], calculationName: string): void => {
  if (!Array.isArray(values)) {
    throw new Error(encodeError(`Cannot calculate the ${calculationName} on an invalid sequence of BigNumber Values. Received: ${values}`, ERRORS.INVALID_VALUES_ARRAY));
  }
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // implementation
  validateDecimalPlaces,
  validateValuesArray,
};
