import { GET_POSTS_CLOSE, GET_ALL_POSTS } from '../../constants/routes'

import { mapPost, verifyResponse, getUser } from '../../config/utils'

export const getPosts = async (skip = 0, lat = 1, lng = 1) => {
  const user = await getUser()
  const params = `?skip=${skip}&lat=${lat}&lng=${lng}`
  return fetch(
    // `${GET_ALL_POSTS(user.id)}${params}`,
    `${GET_POSTS_CLOSE(user.id)}${params}`,
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
