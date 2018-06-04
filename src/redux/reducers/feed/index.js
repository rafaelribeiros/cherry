import { FEED_INITIAL_STATE } from './constants'
import {
  LOADING_POST,
  PUBLISHING_POST,
  PUBLISH_POST_SUCCESS,
  LOADING_POSTS,
  FETCH_POSTS,
  REFRESH_POSTS,
} from '../../types/feedTypes'
import {
  loadingPost,
  publishingPost,
  publishPost,
  loadingPosts,
  fetchPosts,
  refreshPosts,
} from './handlers'

const actionHandlers = {
  [LOADING_POSTS]: loadingPosts,
  [FETCH_POSTS]: fetchPosts,
  [REFRESH_POSTS]: refreshPosts,
  [LOADING_POST]: loadingPost,
  [PUBLISHING_POST]: publishingPost,
  [PUBLISH_POST_SUCCESS]: publishPost,
}

export const feedReducerConfig = {
  initialState: FEED_INITIAL_STATE,
  actionHandlers
}
