import { FEED_INITIAL_STATE } from './constants'
import { LOADING_POST } from '../../types/feedTypes'
import { loadingPost } from './handlers'

const actionHandlers = {
  [LOADING_POST]: loadingPost,
}

export const feedReducerConfig = {
  initialState: FEED_INITIAL_STATE,
  actionHandlers
}
