import { BigNumber } from 'bignumber.js';

/* ************************************************************************************************
 *                                        BIGNUMBER TYPES                                         *
 ************************************************************************************************ */

/**
 * BigNumber Instance
 * ...
 */
type IBigNumber = BigNumber;

/**
 * BigNumber Rounding Mode
 * ...
 */
type IRoundingMode = BigNumber.RoundingMode;

/**
 * BigNumber Rounding Mode Name
 * ...
 */
type IRoundingModeName =
    'ROUND_UP' | //          0 - rounds away from zero
    'ROUND_DOWN' | //        1 - rounds towards zero
    'ROUND_CEIL' | //        2 - rounds towards Infinity
    'ROUND_FLOOR' | //       3 - rounds towards -Infinity
    'ROUND_HALF_UP' | //     4 - rounds towards nearest neighbour. If equidistant, rounds away from zero
    'ROUND_HALF_DOWN' | //   5 - rounds towards nearest neighbour. If equidistant, rounds towards zero
    'ROUND_HALF_EVEN' | //   6 - rounds towards nearest neighbour. If equidistant, rounds towards even neighbour
    'ROUND_HALF_CEIL' | //   7 - rounds towards nearest neighbour. If equidistant, rounds towards Infinity
    'ROUND_HALF_FLOOR'; //   8 - rounds towards nearest neighbour. If equidistant, rounds towards -Infinity

/**
 * BigNumber Rounding Mode Dict
 * ...
 */
type IRoundingModeDict = {
  [key in IRoundingModeName]: IRoundingMode
};





/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Build Type
 * ...
 */
type IBuildType = 'string' | 'number' | 'bignumber';

/**
 * Number Config
 * ...
 */
interface INumberConfig {
  // .
  decimalPlaces: number;

  // ..
  roundingMode: IRoundingModeName;

  // ...
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
  IRoundingModeDict,

  // types
  IBuildType,
  INumberConfig,
};
