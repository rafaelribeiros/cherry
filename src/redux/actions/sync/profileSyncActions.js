import { FETCH_USER_CANDIDATES, LOADING_PROFILE } from '../../types/profileTypes'

export const fetchUserCandidates = userCandidates => ({ type: FETCH_USER_CANDIDATES, userCandidates })
export const loadingProfile = loading => ({ type: LOADING_PROFILE, loading })

