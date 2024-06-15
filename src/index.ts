import { BigNumber } from 'bignumber.js';
import { encodeError, isEncodedError } from 'error-message-utils';
import {
  IBigNumber,
  IBigNumberRoundingModeName,
  IBigNumberRoundingMode,
  IBigNumberValue,
  IBigNumberFormat,
  IBuildType,
  IBuildConfig,
  IBuildOutput,
} from './shared/types.js';
import { ERRORS } from './shared/errors.js';
import {
  buildInvalidValueErrorMessage,
  buildConfig,
  getRoundingMode,
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
 * Builds a number based on given configuration (if any).
 * @param value
 * @param configuration?
 * @returns IBuildOutput<T>
 * @throws
 * - INVALID_VALUE: if the given value is NaN (not a number) or BigNumber throws an error
 * - INVALID_ROUNDING_MODE: if the rounding mode name is not supported
 * - INVALID_BUILD_TYPE: if the build type is not supported
 */
const buildNumber = <T extends Partial<IBuildConfig>>(
  value: IBigNumberValue,
  configuration?: Partial<T>,
): IBuildOutput<T> => {
  // build the config
  const config = buildConfig(configuration);

  // instantiate BigNumber whilst setting the decimal places
  const bn = getBigNumber(value).decimalPlaces(
    config.decimalPlaces,
    getRoundingMode(config.roundingMode),
  );

  // return the appropriate type
  switch (config.buildType) {
    case 'string':
      return bn.toString() as IBuildOutput<T>;
    case 'number':
      return bn.toNumber() as IBuildOutput<T>;
    case 'bignumber':
      return bn as IBuildOutput<T>;
    default:
      throw new Error(encodeError(`The buildType '${config.buildType} is invalid.'`, ERRORS.INVALID_BUILD_TYPE));
  }
};





/* ************************************************************************************************
 *                                          CALCULATIONS                                          *
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
  type IBuildOutput,

  // number builders
  getBigNumber,
  buildNumber,

  // calculations

};
