import { AsyncStorage } from 'react-native'
import {
  signInSuccess,
  signUpSuccess,
  signInFailed,
  forgotPasswordSuccess,
  showLoading,
  userLogout,
  saveOneSignalDevice,
  saveUser,
  verifyEmailFailed,
  requestPhoneCodeFailed,
  validatePhoneCodeSuccess,
  validatePhoneCodeFailed,
  verifyEmailSuccess,
  signUpFailed,
  hideLoading,
  forgotPasswordFailed,
} from '../sync/authenticationSyncActions'
import { loadingProfile } from '../sync/profileSyncActions'
import {
  signInWithEmailAndPassword,
  verifyEmail,
  signUp,
  signInWithFacebook,
  forgotPassword,
  logout,
  requestPhoneCode,
  validatePhoneCode,
  setUserCandidates,
  setUserAge,
  setUserPhone,
} from '../../../services/authentication/index'
import { getUser } from '../../../config/utils'

export function signInAction(email, password, deviceId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const user = await signInWithEmailAndPassword(email, password, deviceId)
      await AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(signInSuccess(user))
      return user
    } catch (err) {
      dispatch(signInFailed(err.message))
      throw err
    }
  }
}

export function verifyEmailAction(email) {
  return async (dispatch) => {
    try {
      await verifyEmail(email)
      dispatch(verifyEmailSuccess(email))
    } catch (err) {
      dispatch(verifyEmailFailed(err.message))
      throw err
    }
  }
}

export function requestPhoneCodeAction(ddd, phone) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await requestPhoneCode(ddd, phone)
      dispatch(hideLoading())
    } catch (err) {
      dispatch(requestPhoneCodeFailed(err.message))
      throw err
    }
  }
}

export function validatePhoneCodeAction(code, ddd, phoneNumber) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const phoneValidated = await validatePhoneCode(ddd, phoneNumber, code)
      dispatch(validatePhoneCodeSuccess(phoneValidated.phoneStr))
      return phoneValidated.phoneStr
    } catch (err) {
      dispatch(validatePhoneCodeFailed(err.message))
      throw err
    }
  }
}

export function signUpAction({
  email, name, password, city, state
}) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const user = await signUp(email, name, password, city, state)
      await AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(signUpSuccess(user))
    } catch (err) {
      dispatch(signUpFailed(err.message))
      throw err
    }
  }
}

export function setUserCandidatesAction(type, candidates) {
  return async () => {
    try {
      await setUserCandidates(type, candidates)
    } catch (err) {
      throw err
    }
  }
}

export function facebookSignInAction(email, token, deviceId) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const user = await signInWithFacebook(email, token, deviceId)
      await AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(signUpSuccess(user))
      return user
    } catch (err) {
      dispatch(signUpFailed(err.message))
      throw err
    }
  }
}

export function forgotPasswordAction(email) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      await forgotPassword(email)
      dispatch(forgotPasswordSuccess())
    } catch (err) {
      dispatch(forgotPasswordFailed(err.message))
      throw err
    }
  }
}

export function logoutAction() {
  return async (dispatch) => {
    try {
      dispatch(loadingProfile(true))
      await logout()
      dispatch(userLogout())
    } catch (err) {
      dispatch(loadingProfile(false))
      throw err
    }
  }
}

export function saveOneSignalDeviceAction(device) {
  return async (dispatch) => {
    try {
      dispatch(saveOneSignalDevice(device))
      getUser().then((item) => {
        const user = item
        if ((typeof user.id !== 'undefined') && (typeof user.deviceId === 'undefined')) {
          user.deviceId = device.userId
          dispatch(saveUser(user))
          AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
        }
      })
    } catch (err) {
      throw err
    }
  }
}

export function setUserAgeAction(dob) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const user = await setUserAge(dob)
      await AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(hideLoading())
    } catch (err) {
      dispatch(signUpFailed(err.message))
      dispatch(hideLoading())
      throw err
    }
  }
}

export function setUserPhoneAction(phoneStr) {
  return async (dispatch) => {
    try {
      dispatch(showLoading())
      const user = await setUserPhone(phoneStr)
      await AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(signUpSuccess(user))
    } catch (err) {
      dispatch(signUpFailed(err.message))
      throw err
    }
  }
}
