import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

import { Images } from '../../../constants/index'

import { INVALID_PASSWORD } from '../../../constants/messages'

export class SignUpPassword extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func,
    goBack: PropTypes.func,
  }

  static defaultProps = {
    onButtonPress: () => { },
    goBack: () => { },
  }

  state = {
    passwordSecure: true,
    secureIcon: 'eye-off-outline',
    alert: { showAlert: false, message: '' },
  };

  onButtonPress = (password) => {
    if (password.length >= 6) {
      this.props.onButtonPress(password)
    } else {
      this.setState({
        alert: { showAlert: true, message: INVALID_PASSWORD },
      })
    }
  }

  hideAlert = () => {
    this.setState({
      alert: { showAlert: false, message: '' },
    })
  }

  changePasswordSecure = () => {
    const { passwordSecure } = this.state
    this.setState({
      passwordSecure: !passwordSecure,
      secureIcon: !passwordSecure ? 'eye-off-outline' : 'eye-outline',
    })
  }

  render() {
    const { passwordSecure, secureIcon } = this.state
    return (
      <SignUp
        navBarTitle="Senha"
        backgroundImage={Images.signUp}
        buttonLabel="Próximo"
        inputPlaceHolder="Crie uma senha segura"
        inputPrimaryIcon="lock-outline"
        inputReturnKeyType="done"
        goBack={this.props.goBack}
        onButtonPress={this.onButtonPress}
        inputPasswordSecure={passwordSecure}
        inputSecondaryIcon={secureIcon}
        changePasswordSecure={this.changePasswordSecure}
        alert={this.state.alert}
        inputAlertMessage="uma senha"
        hideKeyboardAfterSubmit
      />
    )
  }
}
