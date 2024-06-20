import { BigNumber } from 'bignumber.js';
import { encodeError, extractMessage, isEncodedError } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberRoundingModeName,
  IBigNumberRoundingMode,
  IBigNumberValue,
  IBigNumberFormat,
  IType,
  IConfig,
  IBigNumberToType,
  IOutput,
} from './shared/types.js';
import { ERRORS } from './shared/errors.js';
import { validateValuesArray } from './validations/validations.js';
import {
  buildInvalidValueErrorMessage,
  buildConfig,
  roundBigNumber,
  convertBigNumberToType,
  buildFormatConfig,
  sortBigNumbers,
} from './utils/utils.js';

/**
 * BigNumber Configuration
 * The default config values that will apply to this BigNumber constructor.
 * https://mikemcl.github.io/bignumber.js/#config
 */
BigNumber.config({
  // the exponent value(s) at which toString returns exponential notation.
  EXPONENTIAL_AT: 1e+9, // almost never return exponential notation
});





/* ************************************************************************************************
 *                                        NUMBER BUILDERS                                         *
 ************************************************************************************************ */

/**
 * Instantiates BigNumber from a valid numeric value.
 * @param value
 * @returns IBigNumber
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 */
const getBigNumber = (value: IBigNumberValue): IBigNumber => {
  try {
    const bn = BigNumber.isBigNumber(value) ? value : BigNumber(value);
    if (bn.isNaN()) {
      throw new Error(buildInvalidValueErrorMessage(value));
    }
    return bn;
  } catch (e) {
    // if it is a known error, just rethrow it
    if (isEncodedError(e)) {
      throw e;
    }
    throw new Error(buildInvalidValueErrorMessage(value, e));
  }
};

/**
 * Processes and outputs a value to match the requirements specified in the configuration (if any).
 * @param value
 * @param configuration?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 */
const processValue = <T extends Partial<IConfig>>(
  value: IBigNumberValue,
  configuration?: T,
): IOutput<T> => {
  // build the config
  const config = buildConfig(configuration);

  // instantiate a properly rounded BigNumber
  const bn = roundBigNumber(getBigNumber(value), config.decimalPlaces, config.roundingMode);

  // return the appropriate type
  return convertBigNumberToType(bn, config.type) as IOutput<T>;
};

/**
 * Generates the string representation of a value after being processed and formatted to match the
 * requirements specified in the configuration (if any).
 * @param value
 * @param config?
 * @returns string
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - INVALID_BIGNUMBER_FORMAT: if any of the format properties are invalid
 */
const prettifyValue = (
  value: IBigNumberValue,
  config: { processing?: Partial<IConfig>, format?: Partial<IBigNumberFormat> } = {},
): string => {
  try {
    return processValue(
      value,
      {
        ...config.processing,
        type: 'bignumber',
      },
    ).toFormat(buildFormatConfig(config.format));
  } catch (e) {
    // if it is a known error, just rethrow it
    if (isEncodedError(e)) {
      throw e;
    }
    throw new Error(encodeError(extractMessage(e), ERRORS.INVALID_BIGNUMBER_FORMAT));
  }
};





/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Verifies if the value is a BigNumber Instance.
 * @param value
 * @returns boolean
 */
const isBigNumber = (value: any): value is IBigNumber => BigNumber.isBigNumber(value);

/**
 * Verifies if the value is a number in any of the supported types (IBigNumberValue).
 * @param value
 * @returns boolean
 */
const isNumber = (value: any): value is number => {
  try {
    getBigNumber(value);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Verifies if the value is an integer in any of the supported types (IBigNumberValue).
 * @param value
 * @returns boolean
 */
const isInteger = (value: any): value is number => {
  try {
    const bn = getBigNumber(value);
    return bn.isInteger();
  } catch (e) {
    return false;
  }
};

/**
 * Verifies if the value is a float in any of the supported types (IBigNumberValue).
 * @param value
 * @returns boolean
 */
const isFloat = (value: any): value is number => {
  try {
    const bn = getBigNumber(value);
    return !bn.isInteger();
  } catch (e) {
    return false;
  }
};





/* ************************************************************************************************
 *                                     ESSENTIAL CALCULATIONS                                     *
 ************************************************************************************************ */

/**
 * Calculates the sum for an array of values. It returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - INVALID_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateSum = <T extends Partial<IConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IOutput<T> => {
  validateValuesArray(values, 'calculateSum');
  return processValue(values.length > 0 ? BigNumber.sum.apply(null, values) : 0, config);
};

/**
 * Identifies the smallest value in an array. It returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - INVALID_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMin = <T extends Partial<IConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IOutput<T> => {
  validateValuesArray(values, 'calculateMin');
  return processValue(values.length > 0 ? BigNumber.min.apply(null, values) : 0, config);
};

/**
 * Identifies the largest value in an array. It returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - INVALID_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMax = <T extends Partial<IConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IOutput<T> => {
  validateValuesArray(values, 'calculateMax');
  return processValue(values.length > 0 ? BigNumber.max.apply(null, values) : 0, config);
};

/**
 * Calculates the mean for an array of values. It returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - INVALID_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMean = <T extends Partial<IConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IOutput<T> => {
  validateValuesArray(values, 'calculateMean');

  // calculate the sum without rounding if there are items in the array. Otherwise, the mean is 0
  if (values.length > 0) {
    return processValue(BigNumber.sum.apply(null, values).dividedBy(values.length), config);
  }
  return processValue(0, config);
};

/**
 * Calculates the median for an array of values. It returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - INVALID_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMedian = <T extends Partial<IConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IOutput<T> => {
  validateValuesArray(values, 'calculateMedian');

  // proceed if there are items in the array. Otherwise, the median is 0
  if (values.length > 0) {
    // calculate the the index of the item that is in the very middle
    const half = Math.floor(values.length / 2);

    // ensure all values are BigNumbers and then sort them ascendingly
    const bnValues = values.map(getBigNumber).sort(sortBigNumbers('asc'));

    // if the total number of items is an uneven number, just pick the middle one. Otherwise,
    // calculate the mean of both middle values
    const res = values.length % 2
      ? bnValues[half]
      : bnValues[half - 1].plus(bnValues[half]).dividedBy(2);

    // finally, return the median
    return processValue(res, config);
  }
  return processValue(0, config);
};





/* ************************************************************************************************
 *                                      ADVANCED CALCULATIONS                                     *
 ************************************************************************************************ */

/**
 * Calculates the percentage change experienced by a value. Note that if the value increased, the
 * change will be positive. Otherwise, it will be negative. If there was no change, it returns 0.
 * Moreover, the largest decrease supported by this library is -100%. If newValue is less than or
 * equal to 0, -100 will be returned.
 * @param oldValue
 * @param newValue
 * @param config?
 * @returns IOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_TYPE: if the processing type is not supported
 * - NEGATIVE_VALUE_NOT_ALLOWED: if the oldValue is less than or equal to 0
 */
const calculatePercentageChange = <T extends Partial<IConfig>>(
  oldValue: IBigNumberValue,
  newValue: IBigNumberValue,
  config?: T,
): IOutput<T> => {
  // init values
  const oldValueBN = getBigNumber(oldValue);
  const newValueBN = getBigNumber(newValue);
  let change: IBigNumber;

  // ensure the old value is valid
  if (oldValueBN.isLessThanOrEqualTo(0)) {
    throw new Error(encodeError(`The old value '${oldValue}' must be greater than 0.`, ERRORS.NEGATIVE_VALUE_NOT_ALLOWED));
  }

  // calculate the change experienced by the value based on the direction
  if (newValueBN.isGreaterThan(oldValueBN)) {
    change = newValueBN.minus(oldValueBN).dividedBy(oldValueBN).times(100);
  } else if (oldValueBN.isGreaterThan(newValueBN)) {
    // the max decrease supported by this func is 100%
    change = newValueBN.isGreaterThan(0)
      ? oldValueBN.minus(newValueBN).dividedBy(oldValueBN).times(100).negated()
      : getBigNumber(-100);
  } else {
    change = getBigNumber(0);
  }

  // return the % change
  return processValue(change, config);
};


/* const adjustByPercentage = <T extends Partial<IConfig>>(
  value: IBigNumberValue,
  percentage: IBigNumberValue,
  config?: T,
): IOutput<T> => {
  // init values
  // let adjusted: IBigNumber;
  return processValue(value, config);
}; */


/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  type IBigNumber,
  type IBigNumberRoundingModeName,
  type IBigNumberRoundingMode,
  type IBigNumberValue,
  type IBigNumberFormat,
  type IType,
  type IConfig,
  type IBigNumberToType,
  type IOutput,

  // number builders
  getBigNumber,
  processValue,
  prettifyValue,

  // helpers
  isBigNumber,
  isNumber,
  isInteger,
  isFloat,

  // essential calculations
  calculateSum,
  calculateMin,
  calculateMax,
  calculateMean,
  calculateMedian,

  // advanced calculations
  calculatePercentageChange,
  // adjustByPercentage,
};
