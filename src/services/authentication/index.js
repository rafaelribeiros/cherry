import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_FACEBOOK,
  FORGOT_PASSWORD,
  // LOGOUT,
  VERIFY_EMAIL,
  REQUEST_VERIFY_PHONE_CODE,
  VALIDATE_VERIFY_PHONE_CODE,
  UPDATE_USER_PAGE_CANDIDATES,
  SET_USER_AGE,
  SET_USER_PHONE,
} from '../../constants/routes'
import { verifyResponse, getUser, mapUser } from '../../config/utils'

export const signInWithEmailAndPassword = async (email, password) => {
  const fetchResponse = await fetch(SIGN_IN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    })
  })

  const backEndUser = await verifyResponse(fetchResponse)
  if (backEndUser.user) {
    const user = mapUser(backEndUser.user)
    return user
  }
  throw { message: 'Email/Senha incorretos' }
}

export const signUp = async (email, name, password, city, state) => {
  const bodySend = {
    email,
    firstname: name,
    password,
    city,
    state,
  }
  return fetch(SIGN_UP, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodySend)
  }).then(resp => verifyResponse(resp))
    .then((backendUser) => {
      const user = mapUser(backendUser.user)
      return user
    }).catch((err) => { throw err })
}

export const verifyEmail = async (email) => {
  return fetch(VERIFY_EMAIL(email), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}

export const requestPhoneCode = async (ddd, phone) => {
  return fetch(REQUEST_VERIFY_PHONE_CODE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ddd,
      phone,
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response.payload
    })
    .catch((err) => {
      throw err
    })
}

export const validatePhoneCode = (ddd, phone, code) => {
  return fetch(VALIDATE_VERIFY_PHONE_CODE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ddd,
      phone,
      code,
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response.payload
    })
    .catch((err) => {
      throw err
    })
}

export const setUserCandidates = (type, candidates) => {
  return fetch(UPDATE_USER_PAGE_CANDIDATES, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pageType: type,
      pageIds: candidates,
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response.payload
    })
    .catch((err) => {
      throw err
    })
}

export const signInWithFacebook = async (email, token, deviceId) => {
  const bodySend = { email, token, deviceId }
  return fetch(SIGN_IN_FACEBOOK, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodySend)
  }).then(resp => verifyResponse(resp))
    .then((backendUser) => {
      const { payload } = backendUser
      payload.deviceId = deviceId
      const user = mapUser(payload)
      return user
    })
}

export const forgotPassword = async (email) => {
  return fetch(FORGOT_PASSWORD, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((err) => { throw err })
}

export const logout = async () => {
  // const user = await getUser()
  // await fetch(LOGOUT, {
  //   method: 'POST',
  //   headers: {
  //     Authorization: user.authorization,
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     deviceId
  //   })
  // }).then(resp => verifyResponse(resp))
  //   .then((response) => {
  //     return response
  //   })
  //   .catch((error) => {
  //     throw error
  //   })
}


export const setUserAge = async (dob) => {
  const user = await getUser()
  return fetch(SET_USER_AGE, {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dob
    })
  }).then(resp => verifyResponse(resp))
    .then(() => {
      user.dob = dob
      return user
    })
    .catch((error) => {
      throw error
    })
}

export const setUserPhone = async (phoneStr) => {
  const user = await getUser()
  return fetch(SET_USER_PHONE, {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneStr
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const { payload } = response
      user.phone = payload.phone
      return user
    })
    .catch((error) => {
      throw error
    })
}

