import React from 'react'
import { Platform, StyleSheet, Text, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.styles'

export const ButtonPrimaryOutline = ({ label, onPress, containerStyle, ...props }) => {
  const { containerFlat, primaryOutline, textPrimaryFlat } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  return (
    <Touchable
      style={StyleSheet.flatten([containerFlat, primaryOutline, containerStyle])}
      onPress={onPress}
      {...props}
    >
      <Text style={textPrimaryFlat}>{labelToShow}</Text>
    </Touchable>
  )
}

ButtonPrimaryOutline.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
}
ButtonPrimaryOutline.defaultProps = {
  label: '',
  onPress: () => { },
  containerStyle: {},
}
