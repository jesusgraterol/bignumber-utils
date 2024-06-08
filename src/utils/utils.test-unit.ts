import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { IBigNumber } from '../shared/types.js';
import { getBigNumber } from './utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('getBigNumber', () => {
  test('can instantiate BigNumber with a number value', () => {
    expect(getBigNumber(100.54)).toBeInstanceOf(BigNumber);
  });
});
