import { describe, bench } from 'vitest';
import { IBigNumberRoundingModeName } from '../shared/types.js';



/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the list of supported rounding modes
const rms: IBigNumberRoundingModeName[] = ['ROUND_UP', 'ROUND_DOWN', 'ROUND_CEIL', 'ROUND_FLOOR',
  'ROUND_HALF_UP', 'ROUND_HALF_DOWN', 'ROUND_HALF_EVEN', 'ROUND_HALF_CEIL', 'ROUND_HALF_FLOOR'];





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('__getDecimalPlaces', () => {
  bench('using includes()', () => {
    rms.forEach((rm) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dp = rm.includes('CEIL') || rm.includes('FLOOR') ? 0 : 2;
    });
  });


  bench('using regular expressions', () => {
    rms.forEach((rm) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dp = /[A-Z]+_(FLOOR|CEIL)$/.test(rm) ? 0 : 2;
    });
  });


  bench('using endsWith()', () => {
    rms.forEach((rm) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const dp = rm.endsWith('CEIL') || rm.endsWith('FLOOR') ? 0 : 2;
    });
  });
});
