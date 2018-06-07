import { GET_USER_PROFILE, UPDATE_PROFILE, REPORT_USER } from '../../constants/routes'
import { getUser, verifyResponse, mapUser } from '../../config/utils'

export const getUserProfile = async () => {
  const user = await getUser()
  return fetch(GET_USER_PROFILE(user.id), {
    method: 'GET',
    headers: {
    //  Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const userMapped = mapUser(response)
      return userMapped
    })
    .catch((err) => {
      throw err
    })
}

export const updateProfile = async (name, userImage, city, state) => {
  const user = await getUser()
  const bodySend = {
    name,
    city,
    state,
    _id: user.id
  }
  if (userImage) {
    bodySend.userImage = userImage
  }

  return fetch(UPDATE_PROFILE, {
    method: 'POST',
    headers: {
      // Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodySend)
  }).then(resp => verifyResponse(resp))
    .then((userBackend) => {
      const { payload } = userBackend

      // user._id = payload._id
      // user.name = payload.name
      // user.userImage = payload.userImage
      const userProfile = mapUser(payload)
      // userProfile.authorization = payload.authorization ? payload.authorization : user.authorization
      return userProfile
    }).catch((err) => {
      throw err
    })
}

export const reportUser = async (userId) => {
  const user = await getUser()
  return fetch(REPORT_USER(userId), {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((err) => {
      throw err
    })
}
