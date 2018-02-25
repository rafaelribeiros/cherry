import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

import { Images } from '../../../constants/index'
import { INVALID_EMAIL } from '../../../constants/messages'

export class SignUpState extends Component {

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
    alert: { showAlert: false, message: '' },
  }

  onNextButtonPress = (email) => {
    this.props.onButtonPress(email)
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
        hasPicker
        navBarTitle="Quase acabando!"
        backgroundImage={Images.signUp}
        buttonLabel="Próximo"
        goBack={this.props.goBack}
        onButtonPress={this.onNextButtonPress}
        hideAlert={this.hideAlert}
        alert={this.state.alert}
        inputAlertMessage="seu estado"
        pickerLabel="Selecione o estado"
      />
    )
  }
}
