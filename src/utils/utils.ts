import { encodeError, extractMessage } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberRoundingMode,
  IBigNumberRoundingModeName,
  IBigNumberFormat,
  IBuildType,
  IBuildConfig,
  IBigNumberToType,
} from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds the error message that will be thrown in case the provided value cannot be instantiated.
 * The encoding of the error is managed safely as there are values in JavaScript that cannot be
 * stringified, such as Symbol(value).
 * @param value
 * @param error
 * @returns string
 */
const buildInvalidValueErrorMessage = (value: any, error?: any): string => {
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
 * Determines the number of decimals that will be placed on the configuration based on the input.
 * @param decimalPlaces
 * @param roundingMode
 * @returns number
 * @throws
 * - INVALID_DECIMAL_PLACES: if an invalid number of decimal places are provided
 */
const __getDecimalPlaces = (
  decimalPlaces: number,
  roundingMode: IBigNumberRoundingModeName,
): number => {
  const dp = roundingMode.includes('CEIL') || roundingMode.includes('FLOOR') ? 0 : decimalPlaces;
  if (typeof dp !== 'number' || dp < 0 || dp > 100) {
    throw new Error(encodeError(`The decimalPlaces '${dp}' must be a number ranging 0 - 100.`, ERRORS.INVALID_DECIMAL_PLACES));
  }
  return dp;
};

/**
 * Builds the configuration that will be used to build a number. Note that if the roundingMode is
 * set to '*_CEIL' or '*_FLOOR', the decimalPlaces will be set to 0.
 * @param config
 * @returns IBuildConfig
 * @throws
 * - INVALID_DECIMAL_PLACES: if an invalid number of decimal places are provided
 */
const buildConfig = (config?: Partial<IBuildConfig>): IBuildConfig => {
  const rm = config?.roundingMode ?? 'ROUND_HALF_UP';
  return {
    decimalPlaces: __getDecimalPlaces(config?.decimalPlaces ?? 2, rm),
    roundingMode: rm,
    buildType: config?.buildType ?? 'number',
  };
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
      throw new Error(encodeError(`The rounding mode '${name}' is invalid.`, ERRORS.INVALID_ROUNDING_MODE));
  }
};

/**
 * Rounds a BigNumber Instance to a given precision by making use of a custom rounding mode.
 * @param value
 * @param decimalPlaces
 * @param roundingMode
 * @returns IBigNumber
 * @throws
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 */
const roundBigNumber = (
  value: IBigNumber,
  decimalPlaces: number,
  roundingMode: IBigNumberRoundingModeName,
): IBigNumber => value.decimalPlaces(decimalPlaces, __getRoundingMode(roundingMode));

/**
 * Converts a BigNumber Instance into a custom type.
 * @param value
 * @param buildType
 * @returns IBigNumberToType<T>
 * @throws
 * - INVALID_BUILD_TYPE: if the build type is not supported
 */
const convertBigNumberToType = <T extends IBuildType>(
  value: IBigNumber,
  buildType: T,
): IBigNumberToType<T> => {
  switch (buildType) {
    case 'string':
      return value.toString() as IBigNumberToType<T>;
    case 'number':
      return value.toNumber() as IBigNumberToType<T>;
    case 'bignumber':
      return value as IBigNumberToType<T>;
    default:
      throw new Error(encodeError(`The buildType '${buildType}' is invalid for '${value}'.`, ERRORS.INVALID_BUILD_TYPE));
  }
};

/**
 * Builds the configuration object used to prettify a numeric value.
 * @param config?
 * @returns IBigNumberFormat
 */
const buildFormatConfig = (config?: Partial<IBigNumberFormat>): IBigNumberFormat => ({
  prefix: config?.prefix ?? '',
  decimalSeparator: config?.decimalSeparator ?? '.',
  groupSeparator: config?.groupSeparator ?? ',',
  groupSize: config?.groupSize ?? 3,
  secondaryGroupSize: config?.secondaryGroupSize ?? 0,
  fractionGroupSeparator: config?.fractionGroupSeparator ?? ' ',
  fractionGroupSize: config?.fractionGroupSize ?? 0,
  suffix: config?.suffix ?? '',
});




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // implementation
  buildInvalidValueErrorMessage,
  buildConfig,
  roundBigNumber,
  convertBigNumberToType,
  buildFormatConfig,
};
