import React from 'react'
import { Platform, StyleSheet, Text, ViewPropTypes, View } from 'react-native'
import PropTypes from 'prop-types'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.style'

export const ButtonFlat = (props) => {
  const { label, onPress } = props
  const { buttonArea, buttonTouchArea, textPrimaryFlat } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  const touchableStyle = StyleSheet.flatten([buttonTouchArea, props.containerStyle])
  const textStyles = StyleSheet.flatten([textPrimaryFlat, props.textStyle])
  return (
    <View style={touchableStyle}>
      <Touchable onPress={onPress} style={buttonArea} useForeground {...props}>
        {props.renderLeft}
        <Text style={textStyles}>{labelToShow}</Text>
      </Touchable>
    </View>
  )
}

ButtonFlat.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  renderLeft: PropTypes.node,
  textStyle: Text.propTypes.style,
}
ButtonFlat.defaultProps = {
  label: '',
  onPress: () => { },
  containerStyle: {},
  renderLeft: undefined,
  textStyle: {}
}
