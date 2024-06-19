import { BigNumber } from 'bignumber.js';
import { encodeError, extractMessage, isEncodedError } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberRoundingModeName,
  IBigNumberRoundingMode,
  IBigNumberValue,
  IBigNumberFormat,
  IBuildType,
  IBuildConfig,
  IBigNumberToType,
  IBuildOutput,
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
 * Instantiates BigNumber based on a given value.
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
 * Builds a value based on given configuration (if any).
 * @param value
 * @param configuration?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 */
const buildValue = <T extends Partial<IBuildConfig>>(
  value: IBigNumberValue,
  configuration?: T,
): IBuildOutput<T> => {
  // build the config
  const config = buildConfig(configuration);

  // instantiate a properly rounded BigNumber
  const bn = roundBigNumber(getBigNumber(value), config.decimalPlaces, config.roundingMode);

  // return the appropriate type
  return convertBigNumberToType(bn, config.buildType) as IBuildOutput<T>;
};

/**
 * Returns the string representation of a number value after being built and formatted based on the
 * provided configs (if any)
 * @param value
 * @param config?
 * @returns string
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 * - INVALID_BIGNUMBER_FORMAT: if any of the format properties are invalid
 */
const prettifyNumber = (
  value: IBigNumberValue,
  config: { build?: Partial<IBuildConfig>, format?: Partial<IBigNumberFormat> } = {},
): string => {
  try {
    return buildValue(
      value,
      {
        ...config.build,
        buildType: 'bignumber',
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
 * Verifies if a given value is a BigNumber Instance.
 * @param value
 * @returns boolean
 */
const isBigNumber = (value: any): value is IBigNumber => BigNumber.isBigNumber(value);

/**
 * Returns true if the given value is a number in any of the supported types (IBigNumberValue).
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
 * Returns true if the given value is an integer in any of the supported types (IBigNumberValue).
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
 * Returns true if the given value is a float in any of the supported types (IBigNumberValue).
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
 * Calculates the SUM for a given list of numeric values. The types of the values can be mixed.
 * For example: [2, new BigNumber(14), '15.9999', 12]
 * Important: it returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 * - INVALID_BIGNUMBER_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateSum = <T extends Partial<IBuildConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IBuildOutput<T> => {
  validateValuesArray(values, 'calculateSum');
  return buildValue(
    values.length > 0 ? BigNumber.sum.apply(null, values) : 0,
    buildConfig(config),
  ) as IBuildOutput<T>;
};

/**
 * Identifies and returns the smallest value in an array. The types of the values can be mixed.
 * For example: [2, new BigNumber(14), '15.9999', 12]
 * Important: it returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 * - INVALID_BIGNUMBER_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMin = <T extends Partial<IBuildConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IBuildOutput<T> => {
  validateValuesArray(values, 'calculateMin');
  return buildValue(
    values.length > 0 ? BigNumber.min.apply(null, values) : 0,
    buildConfig(config),
  ) as IBuildOutput<T>;
};

/**
 * Identifies and returns the largest value in an array. The types of the values can be mixed.
 * For example: [2, new BigNumber(14), '15.9999', 12]
 * Important: it returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 * - INVALID_BIGNUMBER_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMax = <T extends Partial<IBuildConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IBuildOutput<T> => {
  validateValuesArray(values, 'calculateMax');
  return buildValue(
    values.length > 0 ? BigNumber.max.apply(null, values) : 0,
    buildConfig(config),
  ) as IBuildOutput<T>;
};

/**
 * Calculates and returns the mean of an array of values. The types of the values can be mixed.
 * For example: [2, new BigNumber(14), '15.9999', 12]
 * Important: it returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 * - INVALID_BIGNUMBER_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMean = <T extends Partial<IBuildConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IBuildOutput<T> => {
  validateValuesArray(values, 'calculateMean');

  // calculate the sum without rounding if there are items in the array. Otherwise, the mean is 0
  if (values.length > 0) {
    return buildValue(
      BigNumber.sum.apply(null, values).dividedBy(values.length),
      buildConfig(config),
    ) as IBuildOutput<T>;
  }
  return buildValue(0, buildConfig(config)) as IBuildOutput<T>;
};

/**
 * Calculates and returns the median of an array of values. The types of the values can be mixed.
 * For example: [2, new BigNumber(14), '15.9999', 12]
 * Important: it returns 0 if the array is empty.
 * @param values
 * @param config?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if any of the given values is NaN (not a number) or BigNumber throws an error
 * - INVALID_DECIMAL_PLACES: if the number of decimal places is invalid for any reason
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 * - INVALID_BIGNUMBER_VALUES_ARRAY: if the provided values arg is not a valid array
 */
const calculateMedian = <T extends Partial<IBuildConfig>>(
  values: IBigNumberValue[],
  config?: T,
): IBuildOutput<T> => {
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
    return buildValue(res, buildConfig(config)) as IBuildOutput<T>;
  }
  return buildValue(0, buildConfig(config)) as IBuildOutput<T>;
};





/* ************************************************************************************************
 *                                      ADVANCED CALCULATIONS                                     *
 ************************************************************************************************ */




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
  type IBuildType,
  type IBuildConfig,
  type IBigNumberToType,
  type IBuildOutput,

  // number builders
  getBigNumber,
  buildValue,
  prettifyNumber,

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

};
