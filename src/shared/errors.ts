

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
type IErrorCode = 'INVALID_VALUE' | 'INVALID_BUILD_TYPE' | 'INVALID_ROUNDING_MODE';
const ERRORS: { [key in IErrorCode]: IErrorCode } = {
  INVALID_VALUE: 'INVALID_VALUE',
  INVALID_BUILD_TYPE: 'INVALID_BUILD_TYPE',
  INVALID_ROUNDING_MODE: 'INVALID_ROUNDING_MODE',
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ERRORS,
};
