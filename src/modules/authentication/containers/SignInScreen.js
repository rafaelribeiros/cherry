import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bool, string, shape, func } from 'prop-types'

import { NavigationActions } from 'react-navigation'

import { SignIn } from '../components/signIn'

class SignInContainer extends Component {

  state = {}

  static propTypes = {
    navigation: shape({
      navigate: func
    }),
  }

  static defaultProps = {
    navigation: {
      navigate: () => { }
    },
  }

  goBack = () => {
    // this.props.hideAlert()
    this.props.navigation.goBack()
  }

  onSignIn = (email, password) => {
    try {
      // await signIn(email, password, deviceId)
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Feed' })]
      })
      this.props.navigation.dispatch(actionToDispatch)
    } catch (error) {
      console.log(error)
      //  showAlert(error.message)
    }
  }

  goToSignUp = () => {
    this.props.navigation.navigate('SignUpEmail')
  }

  render() {
    return (
      <SignIn
        navigateToSignUp={this.goToSignUp}
        onButtonPress={this.onSignIn}
        goBack={this.goBack}
      />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
