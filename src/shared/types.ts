import { BigNumber } from 'bignumber.js';

/* ************************************************************************************************
 *                                        BIGNUMBER TYPES                                         *
 ************************************************************************************************ */

/**
 * BigNumber Instance
 * The instance of a BigNumber. It can be generated via the constructor new BigNumber(value) or by
 * simply invoking it as a function BigNumber(value)
 */
type IBigNumber = BigNumber;

/**
 * BigNumber Rounding Mode
 * The type of rounding that will be applied when generating a number build
 */
type IRoundingMode = BigNumber.RoundingMode;
type IRoundingModeName = 'ROUND_UP' | 'ROUND_DOWN' | 'ROUND_CEIL' | 'ROUND_FLOOR' | 'ROUND_HALF_UP'
| 'ROUND_HALF_DOWN' | 'ROUND_HALF_EVEN' | 'ROUND_HALF_CEIL' | 'ROUND_HALF_FLOOR';

/**
 * BigNumber Value
 * The types of values that can be used to instantiate BigNumber as well as generating a build
 */
type IBigNumberValue = BigNumber.Value;





/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Build Type
 * A build can output any of the IBigNumberValue types in order to meet any requirements and
 * overcome JavaScript's numeric limitations.
 */
type IBuildType = 'string' | 'number' | 'bignumber';

/**
 * Build Config
 * The configuration that will be used in order to generate a number build.
 */
interface IBuildConfig {
  // the maximum number of decimals that will be present in the output (Default: 2)
  decimalPlaces: number;

  // determines how the value will be rounded (in case it has decimals) (Default: 'ROUND_UP')
  roundingMode: IRoundingModeName;

  // the output's type (Default: 'number')
  buildType: IBuildType;
}





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // bignumber types
  IBigNumber,
  IRoundingMode,
  IRoundingModeName,
  IBigNumberValue,

  // types
  IBuildType,
  IBuildConfig,
};
