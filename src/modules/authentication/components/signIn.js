import React, { Component } from 'react'
import { StatusBar, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'

import { LoadingOverlay } from '../../shared/components/loadingOverlay'
import { ViewHandlingKeyboard } from '../../shared/components/viewHandlingKeyboard'
import { BackButtonFloating } from '../../shared/components/backButtonFloating'
import { SignInForm } from './signInForm'

import { styles } from './styles/signIn.styles'

export class SignIn extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func,
    navigateToSignUp: PropTypes.func,
    onHideAlert: PropTypes.func,
    goBack: PropTypes.func,
    alert: PropTypes.shape({
      showAlert: PropTypes.bool,
      message: '',
    }),
    loading: PropTypes.bool,
  }

  static defaultProps = {
    onButtonPress: () => { },
    navigateToSignUp: () => { },
    onHideAlert: () => { },
    goBack: () => { },
    alert: { showAlert: false, message: '' },
    loading: false
  }

  state = {};

  onSignInButtonPress = (email, password) => {
    this.props.onButtonPress(email, password)
  }

  onSignUpButtonPress = () => {
    this.props.navigateToSignUp()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ViewHandlingKeyboard
          style={styles.container}
        >
          <StatusBar
            animated
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <SignInForm
            onButtonPress={this.onSignInButtonPress}
            onSignUpButtonPress={this.onSignUpButtonPress}
            alert={this.props.alert}
            hideAlert={this.props.onHideAlert}
          />
          <BackButtonFloating onPress={this.props.goBack} />
          {this.props.loading && <LoadingOverlay elevated />}
        </ViewHandlingKeyboard>
      </SafeAreaView>
    )
  }
}
