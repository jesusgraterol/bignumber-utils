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
type IRoundingModeName = 'ROUND_UP' | 'ROUND_DOWN' | 'ROUND_CEIL' | 'ROUND_FLOOR' | 'ROUND_HALF_UP'
| 'ROUND_HALF_DOWN' | 'ROUND_HALF_EVEN' | 'ROUND_HALF_CEIL' | 'ROUND_HALF_FLOOR';

/**
 * BigNumber Rounding Modes
 * ...
 */
type IRoundingModes = {
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
  IRoundingModes,

  // types
  IBuildType,
  INumberConfig,
};
