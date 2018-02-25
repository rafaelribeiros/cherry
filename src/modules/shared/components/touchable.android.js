import React from 'react'
import { any, func, bool } from 'prop-types'
import { TouchableNativeFeedback, View, ViewPropTypes } from 'react-native'
import { isFunctionEmpty } from '../../../constants/functions'

export const Touchable = (props) => {
  if (!isFunctionEmpty(props.onPress)) {
    const background = props.borderless
      ? TouchableNativeFeedback.SelectableBackgroundBorderless()
      : TouchableNativeFeedback.SelectableBackground()
    return (
      <TouchableNativeFeedback
        background={background}
        onPress={props.onPress}
        {...props}
        style={null}
      >
        <View style={props.style}>{props.children}</View>
      </TouchableNativeFeedback>
    )
  }
  return <View {...props}>{props.children}</View>
}

Touchable.defaultProps = {
  borderless: false,
  children: null,
  onPress: () => {},
  style: {},
}

Touchable.propTypes = {
  borderless: bool,
  children: any,
  onPress: func,
  style: ViewPropTypes.style,
}
