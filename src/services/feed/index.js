import { GET_POSTS } from '../../constants/routes'

import { getUser } from '../../config/utils'

import { Post } from '../../domain/Post'
import { fetchApi } from '../../constants/functions'

const mapPost = (response, type) => {
  const {
    _id,
    socialId,
    authorId,
    body,
    commentCount,
    comments,
    createdAt,
    images,
    liked,
    likesCount,
    membersOnly,
    owner,
    ownerId,
    shareCount,
    status,
    title,
    updatedAt,
    video,
    videoThumbnail,
    og,
    contentType,
  } = response
  return new Post({
    _id,
    socialId,
    authorId,
    body,
    commentCount,
    comments,
    createdAt,
    images,
    liked,
    likesCount,
    membersOnly,
    owner,
    ownerId,
    shareCount,
    status,
    title,
    type,
    updatedAt,
    video,
    videoThumbnail,
    og,
    contentType
  })
}

export const getPosts = async (skip = 0, fromTimestamp = '') => {
  const user = await getUser()
  const params = fromTimestamp ? `?skip=${skip}&limit=${10}&fromTimestamp=${fromTimestamp}` : `?skip=${skip}&limit=${10}`
  const options = {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    }
  }
  return fetchApi(`${GET_POSTS}${params}`, options)
    .then((postsBackend) => {
      const { payload } = postsBackend
      const { posts, ads } = payload
      const defaultPosts = posts.map((item) => {
        const post = mapPost(item, 'REGULAR')
        return post
      })
      const adsPosts = ads.map((item) => {
        const post = mapPost(item, 'SPONSORED')
        return post
      })
      return [...defaultPosts, ...adsPosts]
    })
    .catch((err) => {
      throw err
    })
}
