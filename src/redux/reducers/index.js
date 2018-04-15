import { combineReducers } from 'redux'

import { createReducer } from './functionalReducer'
import { navigationReducer } from './nav'
import { authReducerConfig } from './authentication'
import { profileReducerConfig } from './profile'

export const reducers = {
  nav: navigationReducer,
  auth: createReducer(authReducerConfig),
  profile: createReducer(profileReducerConfig),
}

export const rootReducer = combineReducers(reducers)
