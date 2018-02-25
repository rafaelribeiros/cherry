import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.styles'
import { Colors } from '../../../../constants'

export const ButtonFooter = (props) => {
  const { label, onPress, backgroundColor } = props
  const { footerContainer, text } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  return (
    <Touchable
      style={StyleSheet.flatten([footerContainer, { backgroundColor }])}
      onPress={onPress}
      {...props}
    >
      <Text style={text}>{labelToShow}</Text>
    </Touchable>
  )
}

ButtonFooter.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
}
ButtonFooter.defaultProps = {
  label: '',
  onPress: () => { },
  backgroundColor: Colors.primary
}
