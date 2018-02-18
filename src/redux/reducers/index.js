import { combineReducers } from 'redux'

import { navigationReducer } from './nav'

export const reducers = {
  nav: navigationReducer
}

export const rootReducer = combineReducers(reducers)
