import { PROFILE_INITIAL_STATE } from './constants'
import { FETCH_USER_CANDIDATES, LOADING_PROFILE } from '../../types/profileTypes'

import { fetchUserCandidates, loadingProfile } from './handlers'

const actionHandlers = {
  [FETCH_USER_CANDIDATES]: fetchUserCandidates,
  [LOADING_PROFILE]: loadingProfile
}

export const profileReducerConfig = {
  initialState: PROFILE_INITIAL_STATE,
  actionHandlers,
}
