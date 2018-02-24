import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

import { StackNavigator } from './navigator'

const Stack = ({ dispatch, nav }) => {
  const addListener = createReduxBoundAddListener('root')
  const navigation = addNavigationHelpers({ state: nav, dispatch, addListener })
  return <StackNavigator navigation={navigation} />
}

export const Navigator = connect(state => ({ nav: state.nav }))(Stack)
