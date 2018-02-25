import React from 'react'
import { any, func } from 'prop-types'
import { TouchableOpacity, View } from 'react-native'
import { isFunctionEmpty } from '../../../constants/functions'


export const Touchable = (props) => {
  if (isFunctionEmpty(props.onPress)) {
    return (
      <View {...props}>
        {props.children}
      </View>
    )
  }
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      {props.children}
    </TouchableOpacity>
  )
}

Touchable.defaultProps = {
  children: null,
  onPress: () => {},
}

Touchable.propTypes = {
  children: any,
  onPress: func,
}
