import thunk from 'redux-thunk'
import { applyMiddleware, createStore as create } from 'redux'
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'

import { rootReducer } from '../redux/reducers'

const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)

const middleware = [thunk, navMiddleware]

export const createStore = () => {
  return create(rootReducer, applyMiddleware(...middleware))
}
