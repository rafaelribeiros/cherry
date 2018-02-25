import React, { Component } from 'react'
import { StyleSheet, TextInput, ViewPropTypes, View, TouchableWithoutFeedback, Text } from 'react-native'

import PropTypes from 'prop-types'

import { styles } from '../styles/input.styles'
import { Colors } from '../../../../constants'

export class InputMultlineWithLabel extends Component {
  static propTypes = {
    extraInputStyle: ViewPropTypes.style,
    hasAlert: PropTypes.bool,
    textColor: PropTypes.string,
    label: PropTypes.string,
  }

  static defaultProps = {
    extraInputStyle: {},
    hasAlert: false,
    textColor: Colors.blackPrimary,
    label: ''
  }

  state = {
    isOnFocus: false,
  }


  focus = () => {
    this.textInput.focus()
  }
  blur = () => {
    this.textInput.blur()
  }

  setFocus = () => {
    this.setState({ isOnFocus: true })
  }

  setBlur = () => {
    this.setState({ isOnFocus: false })
  }

  setBorderColor = () => {
    const { hasAlert } = this.props
    const { isOnFocus } = this.state

    if (hasAlert) return Colors.alertPrimary
    if (isOnFocus) return Colors.primary
    return Colors.blackSeparator
  }

  setSelectionColor = () => {
    const { hasAlert } = this.props
    if (hasAlert) return Colors.alertPrimary
    return Colors.primary
  }

  render() {
    const { extraInputStyle, textColor, label, ...props } = this.props

    const wrapStyle = StyleSheet.flatten([styles.wrapInputMultline, { borderColor: this.setBorderColor() }])

    const inputStyle = StyleSheet.flatten([styles.inputMultline, { color: textColor }])
    if (extraInputStyle !== {}) {
      StyleSheet.flatten([inputStyle, extraInputStyle])
    }

    return (
      <View style={styles.InputWithLabelContainer}>
        <Text style={styles.labelStyle}>{label}</Text>
        <TouchableWithoutFeedback onPress={this.focus}>
          <View style={wrapStyle}>
            <TextInput
              autoCorrect={false}
              autoGrow
              maxHeight={162}
              multiline
              onBlur={this.setBlur}
              onFocus={this.setFocus}
              placeholderTextColor={Colors.blackDisabledAlt2}
              ref={(input) => { this.textInput = input }}
              selectionColor={this.setSelectionColor()}
              style={inputStyle}
              underlineColorAndroid={'transparent'}
              {...props}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
