import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

import { Images } from '../../../constants/index'

import { INVALID_PASSWORD } from '../../../constants/messages'

export class SignUpPassword extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func,
    goBack: PropTypes.func,
    onHideAlert: PropTypes.func,
    alert: PropTypes.shape({
      showAlert: PropTypes.bool,
      message: '',
    }),
    loading: PropTypes.bool,
  }

  static defaultProps = {
    onButtonPress: () => { },
    goBack: () => { },
    onHideAlert: () => { },
    alert: { showAlert: false, message: '' },
    loading: false
  }

  state = {
    passwordSecure: true,
    secureIcon: 'eye-off',
    alert: { showAlert: false, message: '' },
  };

  componentWillReceiveProps(nextProps) {
    const { alert } = nextProps
    this.setState({ alert })
  }

  onSignUpButtonPress = (password) => {
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
    this.props.onHideAlert()
  }

  changePasswordSecure = () => {
    const { passwordSecure } = this.state
    this.setState({
      passwordSecure: !passwordSecure,
      secureIcon: !passwordSecure ? 'eye-off' : 'eye',
    })
  }

  render() {
    const { passwordSecure, secureIcon } = this.state
    return (
      <SignUp
        navBarTitle={'Senha'}
        backgroundImage={Images.signUp}
        buttonLabel={'Próximo'}
        inputPlaceHolder={'Crie uma senha segura'}
        inputPrimaryIcon={'lock'}
        inputReturnKeyType={'done'}
        goBack={this.props.goBack}
        onButtonPress={this.onSignUpButtonPress}
        signUpProgress={'70%'}
        inputPasswordSecure={passwordSecure}
        inputSecondaryIcon={secureIcon}
        changePasswordSecure={this.changePasswordSecure}
        alert={this.state.alert}
        hideAlert={this.hideAlert}
        loading={this.props.loading}
        inputAlertMessage={'uma senha'}
      />
    )
  }
}
