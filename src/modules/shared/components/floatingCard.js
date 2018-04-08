import React from 'react'
import { View, ViewPropTypes } from 'react-native'
import { node } from 'prop-types'
import { Colors, Metrics, Values } from '../../../constants'

export const FloatingCard = ({ children, style, ...props }) => (
  <View style={[cardStyle, style]} {...props}>
    {children}
  </View>
)
FloatingCard.propTypes = {
  children: node,
  style: ViewPropTypes.style
}
FloatingCard.defaultProps = {
  children: {},
  style: {}
}

const cardStyle = {
  backgroundColor: Colors.white,
  borderRadius: Metrics.menuRadius,
  ...Values.elevation.e16
}
