import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { FormErrorMessage } from '../../shared/components/formErrorMessage'
import { ButtonPrimary } from '../../shared/components/buttons/index'
import { Input } from '../../shared/components/inputs/index'

import { styles } from './styles/signUpForm.styles'

import { INPUT_FORM_BLANK } from '../../../constants/messages'

export class SignUpForm extends Component {

  static propTypes = {
    alert: PropTypes.shape({
      message: PropTypes.string,
      showAlert: PropTypes.bool,
    }),
    onButtonPress: PropTypes.func,
    changePasswordSecure: PropTypes.func,
    hideAlert: PropTypes.func,
    buttonLabel: PropTypes.string,
    inputPlaceHolder: PropTypes.string,
    inputPrimaryIcon: PropTypes.string,
    inputSecondaryIcon: PropTypes.string,
    inputReturnKeyType: PropTypes.string,
    inputAlertMessage: PropTypes.string,
    inputPasswordSecure: PropTypes.bool,
  }

  static defaultProps = {
    alert: {
      message: '',
      showAlert: false
    },
    onButtonPress: () => { },
    changePasswordSecure: () => { },
    hideAlert: () => { },
    buttonLabel: '',
    inputPlaceHolder: '',
    inputPrimaryIcon: '',
    inputSecondaryIcon: '',
    inputReturnKeyType: '',
    inputAlertMessage: '',
    inputPasswordSecure: false,
  }

  state = {
    value: '',
    alert: { showAlert: false, message: '' },
  };

  componentWillReceiveProps(nextProps) {
    const { alert } = nextProps
    this.setState({ alert })
  }

  onFormButtonPress = () => {
    const { value } = this.state
    const { inputAlertMessage } = this.props
    if (value !== '') {
      this.props.onButtonPress(value)
    } else {
      this.setState({ alert: { showAlert: true, message: INPUT_FORM_BLANK(inputAlertMessage) } })
    }
  }

  setInputValue = (value) => {
    const { alert } = this.state
    this.setState({ value, alert: { showAlert: false, message: '' } })
    if (alert.showAlert) {
      this.props.hideAlert()
    }
  }

  render() {
    const {
      buttonLabel,
      inputPlaceHolder,
      inputPrimaryIcon,
      inputSecondaryIcon,
      inputReturnKeyType,
      inputPasswordSecure,
      changePasswordSecure,
    } = this.props
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          <Input
            autoFocus
            keyboardAppearance={'dark'}
            onIconPress={changePasswordSecure}
            onSubmitEditing={this.onFormButtonPress}
            placeholder={inputPlaceHolder}
            primaryIcon={inputPrimaryIcon}
            returnKeyType={inputReturnKeyType}
            secondaryIcon={inputSecondaryIcon}
            secureTextEntry={inputPasswordSecure}
            value={this.state.value}
            setValue={value => this.setInputValue(value)}
          />
          <FormErrorMessage
            message={this.state.alert.message}
            isVisible={this.state.alert.showAlert}
          />
        </View>
        <ButtonPrimary label={buttonLabel} onPress={this.onFormButtonPress} />
      </View>
    )
  }
}
