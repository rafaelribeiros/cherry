import {
  SAVE_USER,
  USER_LOGOUT,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  VERIFY_EMAIL_FAILED,
  REQUEST_PHONE_CODE_FAILED,
  VALIDATE_PHONE_CODE_SUCCESS,
  VALIDATE_PHONE_CODE_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  SHOW_AUTH_LOADING,
  HIDE_AUTH_LOADING,
  SHOW_AUTH_ALERT,
  HIDE_ALERT,
  SAVE_ONE_SIGNAL_DEVICE,
  VERIFY_EMAIL_SUCCESS,
  AUTH_SET_NAME,
  AUTH_SET_EMAIL,
  AUTH_SET_STATE,
  AUTH_SET_CITY,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  FORGOT_PASSWORD_FAILED,
} from '../../types/authenticationTypes'

export const showLoading = () => ({ type: SHOW_AUTH_LOADING })
export const hideLoading = () => ({ type: HIDE_AUTH_LOADING })
export const signInSuccess = user => ({ type: SIGN_IN_SUCCESS, user })
export const signInFailed = message => ({ type: SIGN_IN_FAILED, message })
export const verifyEmailSuccess = email => ({ type: VERIFY_EMAIL_SUCCESS, email })
export const verifyEmailFailed = message => ({ type: VERIFY_EMAIL_FAILED, message })
export const requestPhoneCodeFailed = message => ({ type: REQUEST_PHONE_CODE_FAILED, message })
export const validatePhoneCodeSuccess = phoneStr => ({ type: VALIDATE_PHONE_CODE_SUCCESS, phoneStr })
export const validatePhoneCodeFailed = message => ({ type: VALIDATE_PHONE_CODE_FAILED, message })
export const hideAlert = () => ({ type: HIDE_ALERT })
export const saveUser = user => ({ type: SAVE_USER, user })
export const setName = name => ({ type: AUTH_SET_NAME, name })
export const setCity = city => ({ type: AUTH_SET_CITY, city })
export const setState = userState => ({ type: AUTH_SET_STATE, userState })
export const setEmail = email => ({ type: AUTH_SET_EMAIL, email })
export const signUpSuccess = user => ({ type: SIGN_UP_SUCCESS, user })
export const signUpFailed = message => ({ type: SIGN_UP_FAILED, message })
export const showAlert = message => ({ type: SHOW_AUTH_ALERT, message })
export const forgotPasswordSuccess = () => ({ type: FORGOT_PASSWORD_SUCCESS })
export const forgotPasswordFailed = message => ({ type: FORGOT_PASSWORD_FAILED, message })

export const userLogout = () => ({ type: USER_LOGOUT })
export const saveOneSignalDevice = device => ({ type: SAVE_ONE_SIGNAL_DEVICE, device })
