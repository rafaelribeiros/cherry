import { GET_POSTS_CLOSE } from '../../constants/routes'

import { mapPost, verifyResponse } from '../../config/utils'

export const getPosts = async (skip = 0, lat = 1, lng = 1) => {
  const params = `?skip=${skip}&lat=${lat}&lng=${lng}`
  return fetch(
    `${GET_POSTS_CLOSE}${params}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(resp => verifyResponse(resp))
    .then((postsBackend) => {
      const { payload } = postsBackend
      const posts = payload.map((item) => {
        const post = mapPost(item)
        return post
      })
      return posts
    }).catch((err) => { throw err })
}
