import React from 'react'
import { Platform, StyleSheet, Text, ViewPropTypes, View } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.style'
import { Colors } from '../../../../constants'
import { TrailingArrow } from './buttonSecondaryGradient'

export const ButtonPrimaryGradient = (props) => {
  const { label, onPress } = props
  const { buttonArea, primaryBackground, text } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  const extraStyle = StyleSheet.flatten([styles.buttonTouchArea, props.containerStyle])
  const gradientStyles = StyleSheet.flatten([buttonArea, primaryBackground, props.gradientStyle])
  return (
    <View style={extraStyle} >
      <Touchable onPress={onPress} useForeground {...props}>
        <LinearGradient
          colors={[Colors.primaryGradient.light, Colors.primaryGradient.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={gradientStyles}
        >
          <Text style={text}>{labelToShow}</Text>
          {props.withTrailingArrow && <TrailingArrow />}
        </LinearGradient>
      </Touchable>
    </View>
  )
}

ButtonPrimaryGradient.propTypes = {
  containerStyle: ViewPropTypes.style,
  gradientStyle: ViewPropTypes.style,
  label: PropTypes.string,
  onPress: PropTypes.func,
  withTrailingArrow: PropTypes.bool,
}
ButtonPrimaryGradient.defaultProps = {
  containerStyle: {},
  gradientStyle: {},
  label: '',
  onPress: () => { },
  withTrailingArrow: false
}
