import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

export class SignUpName extends Component {

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

  state = {};

  onNextButtonPress = (name) => {
    this.props.onButtonPress(name)
  }

  render() {
    return (
      <SignUp
        title="Vamos começar!"
        subtitle="Para iniciar, insira seu nome"
        buttonLabel="Próximo"
        inputPlaceHolder="Qual seu nome?"
        inputPrimaryIcon="account-circle"
        inputReturnKeyType="done"
        goBack={this.props.goBack}
        onButtonPress={this.onNextButtonPress}
        hideAlert={this.props.onHideAlert}
        inputAlertMessage="seu nome"
      />
    )
  }
}
