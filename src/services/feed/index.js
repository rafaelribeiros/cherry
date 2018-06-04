import { GET_POSTS_CLOSE } from '../../constants/routes'

import { mapPost } from '../../config/utils'
import { fetchApi } from '../../constants/functions'

export const getPosts = async (skip = 0, lat = 1, lng = 1) => {
  const params = `?skip=${skip}&lat=${lat}&lng=${lng}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  console.log(`${GET_POSTS_CLOSE}${params}`)
  return fetchApi(`${GET_POSTS_CLOSE}${params}`, options)
    .then((postsBackend) => {
      // const { payload } = postsBackend
      // console.log(payload)
      // const posts = payload.map((item) => {
      //   const post = mapPost(item)
      //   return post
      // })
      return []
    })
    .catch((err) => {
      throw err
    })
}
