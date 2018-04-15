import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

export class SignUpCity extends Component {

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

  onNextButtonPress = (city) => {
    this.props.onButtonPress(city)
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
        title="Sua cidade"
        subtitle="Informe sua cidade para visualizar ocorrências em sua área"
        buttonLabel="Próximo"
        goBack={this.props.goBack}
        onButtonPress={this.onNextButtonPress}
        hideAlert={this.hideAlert}
        alert={this.state.alert}
        inputAlertMessage="sua cidade"
        pickerLabel="Selecione sua cidade"
        pickerValues={['Vitória', 'Cariacica', 'Vila Velha']}
      />
    )
  }
}
