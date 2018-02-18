import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation'

import { StackNavigator } from './navigator'

const Stack = ({ dispatch, nav }) => {
  const navigation = addNavigationHelpers({ state: nav, dispatch })
  return <StackNavigator navigation={navigation} />
}

export const Navigator = connect(state => ({ nav: state.nav }))(Stack)
