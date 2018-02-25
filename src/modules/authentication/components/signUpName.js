import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SignUp } from './signUp'

import { Images } from '../../../constants/index'

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
        navBarTitle={'Nome'}
        backgroundImage={Images.signUp}
        buttonLabel={'Próximo'}
        inputPlaceHolder={'Qual seu nome?'}
        inputPrimaryIcon={'account-circle'}
        inputReturnKeyType={'done'}
        goBack={this.props.goBack}
        onButtonPress={this.onNextButtonPress}
        signUpProgress={'30%'}
        hideAlert={this.props.onHideAlert}
        inputAlertMessage={'seu nome'}
      />
    )
  }
}
