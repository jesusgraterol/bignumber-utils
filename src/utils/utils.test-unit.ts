import { describe, test, expect } from 'vitest';
import { BigNumber } from 'bignumber.js';
import { IBigNumber } from '../shared/types.js';
import { getBigNumber } from './utils.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('getBigNumber', () => {
  test.each([
    { a: -854.11 },
    { a: 100.54 },
    { a: 154124564.655 },
    { a: '-4561.551' },
    { a: '100.54' },
    { a: '9845418.455561' },
    { a: BigNumber(-854.11) },
    { a: BigNumber(100.54) },
    { a: BigNumber('9845418.455561') },
    { a: BigNumber('-4561.551') },
  ])('can instantiate BigNumber with any number value', ({ a }) => {
    const bn = getBigNumber(a);
    expect(bn).toBeInstanceOf(BigNumber);
    expect(BigNumber.isBigNumber(bn)).toBe(true);
    expect(bn.toNumber()).toBe(Number(a));
  });


});
