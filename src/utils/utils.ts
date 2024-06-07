import { BigNumber } from 'bignumber.js';
import { IRoundingModes } from '../shared/types.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

/**
 * Rounding Modes
 * Object containing all the rounding modes supported by the BigNumber Lib.
 */
const __ROUNDING_MODES: IRoundingModes = {
  ROUND_UP: 0, // rounds away from zero
  ROUND_DOWN: 1, // rounds towards zero
  ROUND_CEIL: 2, // rounds towards Infinity
  ROUND_FLOOR: 3, // rounds towards -Infinity
  ROUND_HALF_UP: 4, // rounds towards nearest neighbour. If equidistant, rounds away from zero
  ROUND_HALF_DOWN: 5, // rounds towards nearest neighbour. If equidistant, rounds towards zero
  ROUND_HALF_EVEN: 6, // rounds towards nearest neighbour. If equidistant, rounds towards even neig.
  ROUND_HALF_CEIL: 7, // rounds towards nearest neighbour. If equidistant, rounds towards Infinity
  ROUND_HALF_FLOOR: 8, // rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
};





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // constants
  // ...

  // implementation
  // ...
};
