import { BigNumber } from 'bignumber.js';
import { encodeError, extractMessage } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberRoundingMode,
  IBigNumberRoundingModeName,
  IBigNumberValue,
  IBigNumberFormat,
  IBuildType,
  IBuildConfig,
  IBuildOutputByType,
  IBuildOutput,
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
 * Builds the configuration that will be used to build a number.
 * @param config
 * @returns IBuildConfig
 */
const buildConfig = (config?: Partial<IBuildConfig>): IBuildConfig => ({
  decimalPlaces: config?.decimalPlaces ?? 2,
  roundingMode: config?.roundingMode ?? 'ROUND_UP',
  buildType: config?.buildType ?? 'number',
});

/**
 * Retrieves the rounding mode number based on a given name.
 * @param name
 * @returns IBigNumberRoundingMode
 * @throws
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 */
const getRoundingMode = (name: IBigNumberRoundingModeName): IBigNumberRoundingMode => {
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


const buildNumberByType = <T extends IBuildType>(
  value: IBigNumber,
  buildType: T,
): IBuildOutputByType<T> => {
  switch (buildType) {
    case 'string':
      return value.toString() as IBuildOutputByType<T>;
    case 'number':
      return value.toNumber() as IBuildOutputByType<T>;
    case 'bignumber':
      return value as IBuildOutputByType<T>;
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
  // constants
  // ...

  // implementation
  buildInvalidValueErrorMessage,
  buildConfig,
  getRoundingMode,
  buildNumberByType,
  buildFormatConfig,
};
