import { BigNumber } from 'bignumber.js';
import { encodeError, isEncodedError, extractMessage } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberFormat,
  IBigNumberRoundingMode,
  IBigNumberRoundingModeName,
  IBigNumberValue,
  IBuildConfig,
} from '../shared/types.js';
import { ERRORS } from '../shared/errors.js';

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
 * Builds the configuration that will be used to build a number.
 * @param config
 * @returns IBuildConfig
 */
const __buildConfig = (config?: Partial<IBuildConfig>): IBuildConfig => ({
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
 * Builds the configuration object used to prettify a numeric value.
 * @param config?
 * @returns IBigNumberFormat
 */
const __buildFormatConfig = (config?: Partial<IBigNumberFormat>): IBigNumberFormat => ({
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

/**
 * Builds a number based on given configuration (if any).
 * @param value
 * @param configuration?
 * @returns 
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 */
const buildNumber = (
  value: IBigNumberValue,
  configuration?: Partial<IBuildConfig>,
): IBigNumberValue => {
  // build the config
  const config = __buildConfig(configuration);

  // instantiate BigNumber whilst setting the decimal places
  const bn = getBigNumber(value).decimalPlaces(
    config.decimalPlaces,
    __getRoundingMode(config.roundingMode),
  );

  // return the appropriate type
  switch (config.buildType) {
    case 'string':
      return bn.toString();
    case 'number':
      return bn.toNumber();
    case 'bignumber':
      return bn;
    default:
      throw new Error(encodeError(`The buildType '${config.buildType} is invalid.'`, ERRORS.INVALID_BUILD_TYPE));
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
  buildNumber,
};
