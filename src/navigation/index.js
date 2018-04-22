import React from 'react'
import { InteractionManager, BackHandler } from 'react-native'
import { connect } from 'react-redux'
import { func, object, bool } from 'prop-types'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers'

import { StackNavigator } from './navigator'

class Stack extends React.Component {

  static propTypes = {
    dispatch: func.isRequired,
    nav: object.isRequired,
    isLogged: bool.isRequired,
  };

  state = { loaded: false }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.props.isLogged === true) {
        this.navigateTo('home')
        this.setState({ loaded: true })
      } else {
        this.navigateTo('home')
        this.setState({ loaded: true })
      }
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    })
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    dispatch(NavigationActions.back())
    return nav !== this.props.nav
  }
  navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.dispatch(actionToDispatch)
  }

  render() {
    const { dispatch, nav } = this.props
    const addListener = createReduxBoundAddListener('root')
    const navigation = addNavigationHelpers({ state: nav, dispatch, addListener })
    return this.state.loaded && <StackNavigator navigation={navigation} />
  }
}

export const Navigator = connect(state => ({ nav: state.nav }))(Stack)
