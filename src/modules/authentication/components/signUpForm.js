import React, { Component } from 'react'
import { View } from 'react-native'
import { func, shape, string, bool } from 'prop-types'

import { FormErrorMessage } from '../../shared/components/formErrorMessage'
import { ButtonPrimary } from '../../shared/components/buttons/index'
import { Input } from '../../shared/components/inputs/index'
import { CustomPicker } from '../../shared/components/customPicker'

import { styles } from './styles/signUpForm.styles'

import { INPUT_FORM_BLANK } from '../../../constants/messages'

export class SignUpForm extends Component {

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
    hasPicker: false,
    pickerLabel: 'Selecione'
  }

  static propTypes = {
    alert: shape({
      message: string,
      showAlert: bool,
    }),
    onButtonPress: func,
    changePasswordSecure: func,
    hideAlert: func,
    buttonLabel: string,
    inputPlaceHolder: string,
    inputPrimaryIcon: string,
    inputSecondaryIcon: string,
    inputReturnKeyType: string,
    inputAlertMessage: string,
    inputPasswordSecure: bool,
    hasPicker: bool,
    pickerLabel: string,
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

  changePickerValue = (value) => {
    this.setState({ value })
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
      pickerLabel
    } = this.props
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.inputContainer}>
          {(!this.props.hasPicker) ?
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
            : <CustomPicker
              selectedValue={this.state.value}
              label={pickerLabel}
              changeValue={this.changePickerValue}
              values={['Espirito Santo', 'Acre']}
            />
          }
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
