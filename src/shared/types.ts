import { BigNumber } from 'bignumber.js';

/* ************************************************************************************************
 *                                        BIGNUMBER TYPES                                         *
 ************************************************************************************************ */

/**
 * BigNumber Instance
 * The instance of a BigNumber. It can be generated via the constructor "new BigNumber(value)"" or
 * by simply invoking it as a function "BigNumber(value)". When using this library, it can be
 * generated via the "getBigNumber(value)" function.
 */
type IBigNumber = BigNumber;

/**
 * BigNumber Rounding Mode
 * The type of rounding that will be used when processing a value. The supported modes are:
 * - ROUND_UP(0): rounds away from zero
 * - ROUND_DOWN(1): rounds towards zero
 * - ROUND_CEIL(2): rounds towards Infinity
 * - ROUND_FLOOR(3): rounds towards -Infinity
 * - ROUND_HALF_UP(4)*: rounds towards nearest neighbour. If equidistant, rounds away from zero
 * - ROUND_HALF_DOWN(5): rounds towards nearest neighbour. If equidistant, rounds towards zero
 * - ROUND_HALF_EVEN(6): rounds towards nearest neighbour. If equidistant, rounds towards even
 * neighbour
 * - ROUND_HALF_CEIL(7): rounds towards nearest neighbour. If equidistant, rounds towards Infinity
 * - ROUND_HALF_FLOOR(8): rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
 *
 * More information:
 * - https://mikemcl.github.io/bignumber.js/#rounding-mode
 * - https://mikemcl.github.io/bignumber.js/#constructor-properties
 */
type IBigNumberRoundingModeName = 'ROUND_UP' | 'ROUND_DOWN' | 'ROUND_CEIL' | 'ROUND_FLOOR'
| 'ROUND_HALF_UP' | 'ROUND_HALF_DOWN' | 'ROUND_HALF_EVEN' | 'ROUND_HALF_CEIL' | 'ROUND_HALF_FLOOR';
type IBigNumberRoundingMode = BigNumber.RoundingMode;

/**
 * BigNumber Value
 * The types that can be used to instantiate BigNumber. Moreover, any of these types can be obtained
 * when processing a value by setting it in the configuration object (type prop).
 */
type IBigNumberValue = BigNumber.Value;

/**
 * BigNumber Format
 * The configuration object that is applied to the toFormat method which is used to prettify values.
 * Available settings are:
 * - prefix: string to prepend
 * - decimalSeparator: decimal separator
 * - groupSeparator: grouping separator of the integer part
 * - groupSize: primary grouping size of the integer part
 * - secondaryGroupSize: secondary grouping size of the integer part
 * - fractionGroupSeparator: grouping separator of the fraction part
 * - fractionGroupSize: grouping size of the fraction part
 * - suffix: string to append
 *
 * More information:
 * - https://mikemcl.github.io/bignumber.js/#toFor
 */
type IBigNumberFormat = Required<BigNumber.Format>;



/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Type
 * When a value is processed, it can output an IBigNumberValue type in order to meet the project's
 * requirements and overcome JavaScript's numeric limitations.
 */
type IType = 'string' | 'number' | 'bignumber';

/**
 * Config
 * The configuration that will be used to process a value.
 */
type IConfig = {
  // the maximum number of decimals that will be present in the output (Default: 2)
  decimalPlaces: number;

  // determines how the value will be rounded (in case it has decimals) (Default: 'ROUND_HALF_UP')
  roundingMode: IBigNumberRoundingModeName;

  // the output's type (Default: 'number')
  type: IType;
};

/**
 * BigNumber to Type
 * A generic type helper used when converting a BigNumber Instance into a custom type.
 */
type IBigNumberToType<T> =
  T extends 'string' ? string
    : T extends 'number' ? number
      : T extends 'bignumber' ? IBigNumber
        : never;

/**
 * Output
 * A generic type that sets the return type for the function that processes value based on the
 * provided configuration (type prop).
 */
type IOutput<T> =
  T extends { type: 'string' } ? string
    : T extends { type: 'number' } ? number
      : T extends { type: 'bignumber' } ? IBigNumber
        : number;





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  // bignumber types
  IBigNumber,
  IBigNumberRoundingMode,
  IBigNumberRoundingModeName,
  IBigNumberValue,
  IBigNumberFormat,

  // types
  IType,
  IConfig,
  IBigNumberToType,
  IOutput,
};
