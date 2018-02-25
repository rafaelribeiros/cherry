import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, Text, TouchableWithoutFeedback } from 'react-native'

import { styles } from '../styles/input.styles'
import { Colors } from '../../../../constants'

export const InputWithLabel = ({ label, value, onChangeText, placeholder, keyboardType, autoFocus, returnKeyType }) => {
  const labelUppercase = label.toUpperCase()
  return (
    <TouchableWithoutFeedback onPress={() => this.input.focus()}>
      <View style={styles.InputWithLabelContainer}>
        <Text style={styles.labelStyle}>{labelUppercase}</Text>
        <TextInput
          autoCorrect={false}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.blackDisabledAlt2}
          ref={(ref) => { this.input = ref }}
          style={styles.InputWithLabel}
          underlineColorAndroid={'transparent'}
          value={value}
          returnKeyType={returnKeyType}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

InputWithLabel.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  returnKeyType: PropTypes.string
}

InputWithLabel.defaultProps = {
  onChangeText: () => { },
  label: '',
  placeholder: '',
  value: '',
  keyboardType: 'default',
  autoFocus: false,
  returnKeyType: 'next'
}
