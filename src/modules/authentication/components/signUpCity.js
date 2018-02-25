import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

import { Images } from '../../../constants/index'

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
        navBarTitle="Ultima coisa!"
        backgroundImage={Images.signUp}
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
