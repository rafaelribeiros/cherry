import { Values } from './values'

const { API_URL } = Values

export const SIGN_IN = `${API_URL}user/login`
export const SIGN_UP = `${API_URL}user/create`
export const UPDATE_PROFILE = `${API_URL}user/update`
export const GET_USER_PROFILE = userId => `${API_URL}user/id/${userId}`

// Post
export const PUBLISH_POST = `${API_URL}post/create`
export const GET_POSTS_CLOSE = userId => `${API_URL}post/all_close/${userId}`
export const GET_ALL_POSTS = userId => `${API_URL}post/all/${userId}`
export const GET_POST = (postId, userId) => `${API_URL}post/id/${postId}/${userId}`
export const DELETE_POST = `${API_URL}post/delete`
export const VOTE_POST = `${API_URL}post/vote`
export const GET_COMMENTS = postId => `${API_URL}comment/all/${postId}`
export const PUBLISH_COMMENT = `${API_URL}comment/create`
export const DELETE_COMMENT = `${API_URL}comment/delete`
