import { combineReducers } from 'redux'

import { createReducer } from './functionalReducer'
import { navigationReducer } from './nav'
import { authReducerConfig } from './authentication'

export const reducers = {
  nav: navigationReducer,
  auth: createReducer(authReducerConfig),
}

export const rootReducer = combineReducers(reducers)
