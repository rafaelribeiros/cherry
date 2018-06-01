import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, bool } from 'prop-types'
// import { NavigationActions } from 'react-navigation'

import { Welcome } from '../components/welcome'

// import { facebookSignInAction } from '../../../redux/actions/async/authenticationAsyncActions'
// import { hideLoading } from '../../../redux/actions/sync/authenticationSyncActions'
import { getLoading } from '../../../redux/reducers/authentication/selectors'

import { Values } from '../../../constants'


class WelcomeScreenContainer extends Component {
  static navigationOptions = () => ({
    title: 'Welcome',
    ...Values.navbarStyles.primary
  })

  static propTypes = {
    navigation: object,
    facebookSignIn: func,
    hideFacebookLoading: func,
    loading: bool,
  }

  static defaultProps = {
    navigation: {},
    facebookSignIn: () => { },
    hideFacebookLoading: () => { },
    loading: false,
  }

  navigateToSignIn = () => this.props.navigation.navigate('SignIn')
  navigateToSignUp = () => this.props.navigation.navigate('SignUpName')
  authenticateWithFacebook = async (email, token) => {
    const user = await this.props.facebookSignIn(email, token)
    this.navigateToScreen(user)
  }

  // navigateToScreen = (user) => {
  // if (!user.age) {
  //   this.props.navigation.navigate('SignUpAge')
  // } else if (!user.phone) {
  //   this.props.navigation.navigate('SignUpPhone')
  // } else {
  //   const actionToDispatch = NavigationActions.reset({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: 'home' })]
  //   })
  //   this.props.navigation.dispatch(actionToDispatch)
  // }
  // }

  render() {
    return (
      <Welcome
        onPressSignIn={this.navigateToSignIn}
        onPressSignUp={this.navigateToSignUp}
        onFacebookButtonPress={this.authenticateWithFacebook}
        onErrorFacebook={this.props.hideFacebookLoading}
        loading={this.props.loading}
      />
    )
  }
}

const mapStateToProps = state => ({
  loading: getLoading(state)
})

const mapDispatchToProps = () => ({
  //   facebookSignIn: (email, token) => dispatch(facebookSignInAction(email, token)),
  //   hideFacebookLoading: () => dispatch(hideLoading()),
})

export const WelcomeScreen = connect(mapStateToProps, mapDispatchToProps)(WelcomeScreenContainer)
