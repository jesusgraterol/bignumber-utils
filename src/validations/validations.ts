import { encodeError } from 'error-message-utils';
import { IBigNumber } from '../shared/types.js';
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
    throw new Error(
      encodeError(
        `The decimalPlaces '${decimalPlaces}' must be a number ranging 0 - 100.`,
        ERRORS.INVALID_DECIMAL_PLACES,
      ),
    );
  }
};

/**
 * Ensures the provided values sequence is a valid array.
 * @param values
 * @param calculationName
 * @throws
 * - INVALID_VALUES_ARRAY: if values is not a valid array
 */
const validateValuesArray = (values: any[], calculationName: string): void => {
  if (!Array.isArray(values)) {
    throw new Error(
      encodeError(
        `Cannot run ${calculationName} on an invalid sequence of BigNumber Values. Received: ${values}`,
        ERRORS.INVALID_VALUES_ARRAY,
      ),
    );
  }
};

/**
 * Ensures the provided value is positive.
 * @param value
 * @param allowZero?
 * @throws
 * - NEGATIVE_VALUE_NOT_ALLOWED: if the value is not positive
 */
const validatePositiveValue = (value: IBigNumber, allowZero?: boolean) => {
  if (allowZero && value.isLessThan(0)) {
    throw new Error(
      encodeError(
        `The value '${value}' must be greater than or equal to 0.`,
        ERRORS.NEGATIVE_VALUE_NOT_ALLOWED,
      ),
    );
  } else if (!allowZero && value.isLessThanOrEqualTo(0)) {
    throw new Error(
      encodeError(
        `The value '${value}' must be greater than 0.`,
        ERRORS.NEGATIVE_VALUE_NOT_ALLOWED,
      ),
    );
  }
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // implementation
  validateDecimalPlaces,
  validateValuesArray,
  validatePositiveValue,
};
