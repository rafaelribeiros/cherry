import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'
import { INVALID_EMAIL } from '../../../constants/messages'

export class SignUpEmail extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func,
    goBack: PropTypes.func,
    onHideAlert: PropTypes.func,
  }

  static defaultProps = {
    onButtonPress: () => { },
    goBack: () => { },
    onHideAlert: () => { },
  }

  state = {
    userRegion: {},
    alert: { showAlert: false, message: '' },
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }

  onNextButtonPress = (email) => {
    if ((this.state.pattern.test(email) === false)) {
      this.setState({
        alert: { showAlert: true, message: INVALID_EMAIL },
      })
    } else {
      this.props.onButtonPress(email, this.state.userRegion)
    }
  }

  hideAlert = () => {
    this.setState({
      alert: { showAlert: false, message: '' },
    })
    this.props.onHideAlert()
  }

  render() {
    return (
      <SignUp
        title="Email de cadastro"
        subtitle="Informe seu email para acessar o aplicativo"
        buttonLabel="Próximo"
        inputPlaceHolder="Qual seu email?"
        inputPrimaryIcon="email-outline"
        inputReturnKeyType="done"
        goBack={this.props.goBack}
        onButtonPress={this.onNextButtonPress}
        hideAlert={this.hideAlert}
        alert={this.state.alert}
        inputAlertMessage="seu email"
      />
    )
  }
}
