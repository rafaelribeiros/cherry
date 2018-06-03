import _ from 'lodash'
import {
  GET_PAGES,
  FOLLOW_PAGE,
  UNFOLLOW_PAGE,
  UPDATE_PAGE,
  GET_PAGE,
  GET_PAGE_POSTS,
  REPORT_PAGE,
  GET_SURVEY_RESULTS
} from '../../constants/routes'
import { getUser, fetchApi } from '../../constants/functions'
import { verifyResponse, mapPage, mapPost, mapVote } from '../../config/utils'

export const getPages = async (skip, type, search) => {
  const user = await getUser()
  let params = ''
  if (type) {
    params = `&type=${type}`
  }
  if (search) {
    params += `&search=${search}`
  }

  return fetch(`${GET_PAGES}?skip=${skip}&limit=${10}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const pages = response.payload.map(page => mapPage(page))
      return pages
    })
    .catch((error) => {
      throw error
    })
}

export const followPage = async (pageId) => {
  const user = await getUser()
  return fetch(FOLLOW_PAGE(pageId), {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export const unfollowPage = async (pageId) => {
  const user = await getUser()
  return fetch(UNFOLLOW_PAGE(pageId), {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error
    })
}

export const updatePageUserAdmin = async (page) => {
  const user = await getUser()
  const {
    name, realName, image, party, coalition, description, pageType, state, number, facebookPage, twitterPage
  } = page
  const body = {
    name,
    realName,
    image: image.name,
    party,
    coalition,
    description,
    pageType,
    state,
    facebook: { page: facebookPage },
    twitterPage,
  }
  if (!_.isNaN(number)) {
    body.number = number
  }
  return fetch(UPDATE_PAGE(page.id), {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      user.pageAdmin = mapPage(response.payload)
      return user
    })
    .catch((error) => {
      throw error
    })
}

export const getPage = async (pageId) => {
  const user = await getUser()
  return fetch(`${GET_PAGE(pageId)}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const [item] = response.payload
      const page = mapPage(item)
      return page
    })
    .catch((error) => {
      throw error
    })
}

export const getPagePosts = async (pageId, skip = 0, fromTimestamp = '') => {
  const user = await getUser()
  const params = fromTimestamp ? `?skip=${skip}&limit=${10}&fromTimestamp=${fromTimestamp}` : `?skip=${skip}&limit=${10}`
  return fetch(`${GET_PAGE_POSTS(pageId)}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((postsBackend) => {
      const { payload } = postsBackend
      const posts = payload.map((item) => {
        const post = mapPost(item, 'REGULAR')
        return post
      })
      return posts
    })
}

export const reportPage = async (pageId) => {
  const user = await getUser()
  return fetch(REPORT_PAGE(pageId), {
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

export const getSurveyResults = async (pageId) => {
  try {
    const user = await getUser()
    const options = {
      method: 'GET',
      headers: {
        Authorization: user.authorization,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const fetchResponse = await fetchApi(`${GET_SURVEY_RESULTS(pageId)}`, options)
    const results = fetchResponse.payload.map(item => mapVote(item))
    return results
  } catch (err) {
    throw err
  }
}
