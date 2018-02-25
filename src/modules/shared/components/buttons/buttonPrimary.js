import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.styles'

export const ButtonPrimary = (props) => {
  const { label, onPress } = props
  const { container, primaryBackground, text } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  return (
    <Touchable
      style={StyleSheet.flatten([container, primaryBackground])}
      onPress={onPress}
      {...props}
    >
      <Text style={text}>{labelToShow}</Text>
    </Touchable>
  )
}

ButtonPrimary.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}
ButtonPrimary.defaultProps = {
  label: '',
  onPress: () => { },
}
