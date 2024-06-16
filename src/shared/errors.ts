

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
type IErrorCode = 'INVALID_VALUE' | 'INVALID_BUILD_TYPE' | 'INVALID_ROUNDING_MODE'
| 'INVALID_DECIMAL_PLACES' | 'INVALID_BIGNUMBER_FORMAT';
const ERRORS: { [key in IErrorCode]: IErrorCode } = {
  INVALID_VALUE: 'INVALID_VALUE',
  INVALID_BUILD_TYPE: 'INVALID_BUILD_TYPE',
  INVALID_ROUNDING_MODE: 'INVALID_ROUNDING_MODE',
  INVALID_DECIMAL_PLACES: 'INVALID_DECIMAL_PLACES',
  INVALID_BIGNUMBER_FORMAT: 'INVALID_BIGNUMBER_FORMAT',
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ERRORS,
};
