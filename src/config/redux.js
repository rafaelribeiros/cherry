import thunk from 'redux-thunk'
import { applyMiddleware, createStore as create } from 'redux'

import { rootReducer } from '../redux/reducers'

export const createStore = () => {
  return create(rootReducer, applyMiddleware(thunk))
}