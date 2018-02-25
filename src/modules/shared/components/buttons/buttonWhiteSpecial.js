import React from 'react'
import { Platform, StyleSheet, Text, ViewPropTypes } from 'react-native'
import PropTypes, { bool } from 'prop-types'

import { Touchable } from '../touchable'

import { styles } from '../styles/button.styles'

export const ButtonWhiteSpecial = ({ label, notExpanded, onPress, special, style, ...props }) => {
  const { centeredContainer, container, whiteBackground, specialText } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  return (
    <Touchable
      style={StyleSheet.flatten([container, whiteBackground, centeredContainer, style])}
      onPress={onPress}
      {...props}
    >
      <Text style={specialText}>{labelToShow}</Text>
    </Touchable>
  )
}

ButtonWhiteSpecial.propTypes = {
  label: PropTypes.string,
  notExpanded: bool,
  onPress: PropTypes.func,
  special: bool,
  style: ViewPropTypes.style
}
ButtonWhiteSpecial.defaultProps = {
  label: '',
  notExpanded: false,
  onPress: () => { },
  special: false,
  style: {}
}
