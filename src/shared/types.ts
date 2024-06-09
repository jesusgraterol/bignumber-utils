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
 * The type of rounding that will be used when generating a number build. The supported modes are:
 * - ROUND_UP(0): rounds away from zero
 * - ROUND_DOWN(1): rounds towards zero
 * - ROUND_CEIL(2): rounds towards Infinity
 * - ROUND_FLOOR(3): rounds towards -Infinity
 * - ROUND_HALF_UP(4): rounds towards nearest neighbour. If equidistant, rounds away from zero
 * - ROUND_HALF_DOWN(5): rounds towards nearest neighbour. If equidistant, rounds towards zero
 * - ROUND_HALF_EVEN(6): rounds towards nearest neighbour. If equidistant, rounds towards even
 * neighbour
 * - ROUND_HALF_CEIL(7): rounds towards nearest neighbour. If equidistant, rounds towards Infinity
 * - ROUND_HALF_FLOOR(8): rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
 */
type IBigNumberRoundingModeName = 'ROUND_UP' | 'ROUND_DOWN' | 'ROUND_CEIL' | 'ROUND_FLOOR'
| 'ROUND_HALF_UP' | 'ROUND_HALF_DOWN' | 'ROUND_HALF_EVEN' | 'ROUND_HALF_CEIL' | 'ROUND_HALF_FLOOR';
type IBigNumberRoundingMode = BigNumber.RoundingMode;

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
  roundingMode: IBigNumberRoundingModeName;

  // the output's type (Default: 'number')
  buildType: IBuildType;
}





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // bignumber types
  IBigNumber,
  IBigNumberRoundingMode,
  IBigNumberRoundingModeName,
  IBigNumberValue,

  // types
  IBuildType,
  IBuildConfig,
};
