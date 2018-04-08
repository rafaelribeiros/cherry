import React from 'react'
import { StyleSheet, Text, ViewPropTypes, View } from 'react-native'
import PropTypes from 'prop-types'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.style'

export const ButtonFacebook = (props) => {
  const { label, onPress } = props
  const {
    buttonArea,
    buttonTouchArea,
    textPrimaryFlat,
    textFacebook
  } = styles
  const labelToShow = label || 'Conectar com o Facebook'
  const touchableStyle = StyleSheet.flatten([buttonTouchArea, props.containerStyle])
  const textStyle = props.renderLeft
    ? textFacebook
    : textPrimaryFlat
  return (
    <View style={touchableStyle}>
      <Touchable onPress={onPress} style={buttonArea} useForeground {...props}>
        {props.renderLeft}
        <Text style={textStyle}>{labelToShow}</Text>
      </Touchable>
    </View>
  )
}

ButtonFacebook.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  renderLeft: PropTypes.node,
  containerStyle: ViewPropTypes.style
}
ButtonFacebook.defaultProps = {
  label: '',
  onPress: () => { },
  renderLeft: undefined,
  containerStyle: {}
}
