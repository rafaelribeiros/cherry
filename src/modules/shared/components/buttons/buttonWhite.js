import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Touchable } from '../touchable'

import { styles } from '../styles/button.styles'

export const ButtonWhite = (props) => {
  const { label, onPress } = props
  const { container, whiteBackground, darkText } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  return (
    <Touchable
      style={StyleSheet.flatten([container, whiteBackground])}
      onPress={onPress}
      {...props}
    >
      <Text style={darkText}>{labelToShow}</Text>
    </Touchable>
  )
}

ButtonWhite.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}
ButtonWhite.defaultProps = {
  label: '',
  onPress: () => { },
}

