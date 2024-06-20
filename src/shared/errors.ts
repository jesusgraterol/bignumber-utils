

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
type IErrorCode = 'INVALID_VALUE' | 'INVALID_TYPE' | 'INVALID_ROUNDING_MODE'
| 'INVALID_DECIMAL_PLACES' | 'INVALID_BIGNUMBER_FORMAT' | 'INVALID_VALUES_ARRAY'
| 'NEGATIVE_VALUE_NOT_ALLOWED';
const ERRORS: { [key in IErrorCode]: IErrorCode } = {
  INVALID_VALUE: 'INVALID_VALUE',
  INVALID_TYPE: 'INVALID_TYPE',
  INVALID_ROUNDING_MODE: 'INVALID_ROUNDING_MODE',
  INVALID_DECIMAL_PLACES: 'INVALID_DECIMAL_PLACES',
  INVALID_BIGNUMBER_FORMAT: 'INVALID_BIGNUMBER_FORMAT',
  INVALID_VALUES_ARRAY: 'INVALID_VALUES_ARRAY',
  NEGATIVE_VALUE_NOT_ALLOWED: 'NEGATIVE_VALUE_NOT_ALLOWED',
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ERRORS,
};
