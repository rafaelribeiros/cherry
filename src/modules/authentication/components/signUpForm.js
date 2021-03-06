import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import { func, shape, string, bool, array } from 'prop-types'

import { FormErrorMessage } from '../../shared/components/formErrorMessage'
import { ButtonPrimary } from '../../shared/components/buttons/index'
import { Input } from '../../shared/components/inputs/index'
import { CustomPicker } from '../../shared/components/customPicker'

import { INPUT_FORM_BLANK } from '../../../constants/messages'
import { isFunctionEmpty } from '../../../constants/functions'

import { styles } from '../components/styles/signUpForm.styles'

export class SignUpForm extends Component {

  static defaultProps = {
    alert: {
      message: '',
      showAlert: false
    },
    onButtonPress: () => { },
    changePasswordSecure: () => { },
    hideAlert: () => { },
    hideKeyboard: () => { },
    onInputPress: () => { },
    buttonLabel: '',
    inputPlaceHolder: '',
    inputPrimaryIcon: '',
    inputSecondaryIcon: '',
    inputReturnKeyType: '',
    inputAlertMessage: '',
    inputPasswordSecure: false,
    hasPicker: false,
    pickerLabel: 'Selecione',
    pickerValues: [],
    hideKeyboardAfterSubmit: false,
  }

  static propTypes = {
    alert: shape({
      message: string,
      showAlert: bool,
    }),
    onButtonPress: func,
    changePasswordSecure: func,
    hideKeyboard: func,
    onInputPress: func,
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
    pickerValues: array,
    hideKeyboardAfterSubmit: bool,
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
      if (this.props.hideKeyboardAfterSubmit) {
        this.props.hideKeyboard()
      }
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
      pickerLabel,
      pickerValues,
      onInputPress,
    } = this.props
    const inputPointerEvents = (typeof onInputPress === 'function' && isFunctionEmpty(onInputPress)) ? 'auto' : 'box-only'
    return (
      <View >
        <TouchableWithoutFeedback onPress={onInputPress}>
          <View pointerEvents={inputPointerEvents}>
            {(!this.props.hasPicker) ?
              <Input
                autoFocus
                keyboardAppearance="dark"
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
              :
              <View style={styles.picker}>
                <CustomPicker
                  selectedValue={this.state.value}
                  label={pickerLabel}
                  changeValue={this.changePickerValue}
                  values={pickerValues}
                />
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
        <FormErrorMessage
          message={this.state.alert.message}
          isVisible={this.state.alert.showAlert}
        />
        <ButtonPrimary label={buttonLabel} onPress={this.onFormButtonPress} />
      </View>
    )
  }
}
