import React from 'react'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import { func, bool, string } from 'prop-types'

import CustomIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Metrics, Colors } from '../../../constants'

const setWrapStyle = (isDense, containerStyle) => (
  isDense
    ? StyleSheet.flatten([styles.wrap, styles.denseWidth, containerStyle])
    : StyleSheet.flatten([styles.wrap, styles.standardWidth, containerStyle])
)

const setIconSize = isDense => (isDense ? Metrics.icons.small : Metrics.icons.medium)

export const Icon = ({ color, containerStyle, dense, onPress, ...props }) => (
  <View style={setWrapStyle(dense, containerStyle)}>
    <CustomIcon
      size={setIconSize(dense)}
      color={color || Colors.blackSecondaryAlt}
      {...props}
    />
  </View>
)

Icon.defaultProps = {
  color: undefined,
  containerStyle: {},
  dense: false,
  onPress: () => { },
}
Icon.propTypes = {
  color: string,
  containerStyle: ViewPropTypes.style,
  dense: bool,
  onPress: func,
}

const styles = StyleSheet.create({
  wrap: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  standardWidth: {
    width: Metrics.iconTouchableArea,
  },
  denseWidth: {
    width: Metrics.iconTouchableAreaDense,
  }
})
