import { Values } from './values'

const { API_URL } = Values

export const SIGN_IN = `${API_URL}user/login`
export const SIGN_UP = `${API_URL}user/create`
export const UPDATE_PROFILE = `${API_URL}user/update`

// Post
export const PUBLISH_POST = `${API_URL}post/create`
export const GET_POSTS_CLOSE = `${API_URL}post/all_close`
