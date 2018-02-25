import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bool, string, shape, func } from 'prop-types'

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

  render() {
    return (
      <SignIn
        // navigateToSignUp={() => this.props.navigation.navigate('SignUpEmail')}
        navigateToSignUp={() => this.props.navigation.navigate('SignUpPassword')}
      />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
