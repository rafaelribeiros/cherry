import _ from 'lodash'

import { AUTH_INITIAL_STATE } from './constants'

export const showLoading = state => ({ ...state, isLoading: true })
export const hideLoading = state => ({ ...state, isLoading: false })
export const signInSuccess = (state, { user }) => ({ ...AUTH_INITIAL_STATE, user, device: state.device })
export const signInFailed = (state, { message }) => ({ alert: { showAlert: true, message }, device: state.device })
export const verifyEmailSuccess = (state, { email }) => {
  const { regData } = state
  regData.email = email
  return { ...state, regData, isLoading: false }
}
export const verifyEmailFailed = (state, { message }) => ({ ...state, alert: { showAlert: true, message }, isLoading: false })
export const requestPhoneCodeFailed = (state, { message }) => ({ ...state, alert: { showAlert: true, message }, isLoading: false })
export const validatePhoneCodeSuccess = (state, { phoneStr }) => {
  const { regData } = state
  regData.phoneStr = phoneStr
  return { ...state, regData, isLoading: false }
}
export const validatePhoneCodeFailed = (state, { message }) => ({ ...state, alert: { showAlert: true, message }, isLoading: false })
export const hideAlert = state => ({ ...state, alert: { showAlert: false, message: '' } })
export const saveUser = (state, { user }) => ({ ...state, user })
export const setName = (state, { name }) => {
  const regData = _.clone(state.regData)
  regData.name = name
  return { ...state, regData, alert: { showAlert: false, message: '' } }
}
export const setCity = (state, { city }) => {
  const regData = _.clone(state.regData)
  regData.city = city
  return { ...state, regData, alert: { showAlert: false, message: '' } }
}
export const setState = (state, { userState }) => {
  const regData = _.clone(state.regData)
  regData.state = userState
  return { ...state, regData, alert: { showAlert: false, message: '' } }
}
export const setEmail = (state, { email }) => {
  const regData = _.clone(state.regData)
  regData.email = email
  return { ...state, regData, alert: { showAlert: false, message: '' } }
}
export const signUpSuccess = (state, { user }) => ({ ...AUTH_INITIAL_STATE, user, device: state.device })
export const signUpFailed = (state, { message }) => ({ ...state, isLoading: false, alert: { showAlert: true, message }, device: state.device })
export const forgotPasswordSuccess = state => ({ ...AUTH_INITIAL_STATE, device: state.device })
export const forgotPasswordFailed = (state, { message }) => ({ alert: { showAlert: true, message }, device: state.device })
