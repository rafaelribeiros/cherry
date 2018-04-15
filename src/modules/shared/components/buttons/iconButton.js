import React from 'react'
import { StyleSheet, ViewPropTypes } from 'react-native'
import { func, bool, number, string } from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Touchable } from '../touchable'

import { Metrics, Colors } from '../../../../constants'

const setWrapStyle = (width, isDense, containerStyle) => {
  const extraStyle = []
  if (width) {
    extraStyle.push({ width })
  } else {
    extraStyle.push(isDense ? styles.denseWidth : styles.standardWidth)
  }
  return (
    StyleSheet.flatten([styles.wrap, extraStyle, containerStyle])
  )
}

const setIconSize = isDense => (isDense ? Metrics.icons.small : Metrics.icons.medium)

export const IconButton = ({
  color,
  containerStyle,
  dense,
  onPress,
  width,
  ...props
}) => (
  <Touchable borderless onPress={onPress} style={setWrapStyle(width, dense, containerStyle)}>
    <Icon
      color={color || Colors.blackSecondaryAlt}
      size={setIconSize(dense)}
      {...props}
    />
  </Touchable>
)

IconButton.defaultProps = {
  containerStyle: {},
  color: undefined,
  dense: false,
  onPress: () => {},
  width: undefined,
}
IconButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  color: string,
  dense: bool,
  onPress: func,
  width: number,
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
