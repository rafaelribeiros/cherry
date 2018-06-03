import { getUser, verifyResponse, mapUser } from '../../config/utils'
import { GET_ADMINS, SET_USER_ADMIN, REMOVE_USER_ADMIN, GET_USERS } from '../../constants/routes'


export const getAdmins = async (pageId, skip = 0) => {
  const user = await getUser()
  const params = `?skip=${skip}&limit=${10}`
  return fetch(`${GET_ADMINS(pageId)}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((adminsBackend) => {
      const { payload } = adminsBackend
      const admins = payload.admins.map((item) => {
        const admin = mapUser(item)
        return admin
      })
      return admins
    })
}

export const removeAdmin = async (pageId, userId) => {
  const user = await getUser()
  await fetch(REMOVE_USER_ADMIN(pageId), {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export const addAdmin = async (pageId, userId) => {
  const user = await getUser()
  return fetch(SET_USER_ADMIN(pageId), {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId
    })
  }).then(resp => verifyResponse(resp))
    .then((userBackend) => {
      const { payload } = userBackend
      const admin = mapUser(payload)
      return admin
    })
}

export const getUsers = async (skip = 0, search) => {
  const user = await getUser()
  const params = search ? `?skip=${skip}&limit=${10}&search=${search}` : `?skip=${skip}&limit=${10}`
  return fetch(`${GET_USERS}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((usersBackend) => {
      const { payload } = usersBackend
      const users = payload.map((item) => {
        const user = mapUser(item)
        return user
      })
      return users
    })
}
