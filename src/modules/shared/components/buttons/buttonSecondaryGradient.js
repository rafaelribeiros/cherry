import React from 'react'
import { Platform, StyleSheet, Text, ViewPropTypes, View } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.style'
import { Colors, Metrics } from '../../../../constants'

export const TrailingArrow = () => (
  <View
    style={{
      width: Metrics.buttonHeightStandard,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
    }}
  >
    <Icon
      name="chevron-right"
      size={Metrics.icons.medium}
      color={Colors.white}
    />
  </View>
)

export const ButtonSecondaryGradient = (props) => {
  const { label, onPress } = props
  const { buttonArea, primaryBackground, text } = styles
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  const extraStyle = StyleSheet.flatten([styles.buttonTouchArea, props.containerStyle])
  return (
    <View style={extraStyle}>
      <Touchable onPress={onPress} useForeground {...props}>
        <LinearGradient
          colors={[Colors.specialGradient.light, Colors.specialGradient.dark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.flatten([buttonArea, primaryBackground])}
        >
          <Text style={text}>{labelToShow}</Text>
          {props.withTrailingArrow && <TrailingArrow />}
        </LinearGradient>
      </Touchable>
    </View>
  )
}

ButtonSecondaryGradient.propTypes = {
  containerStyle: ViewPropTypes.style,
  label: PropTypes.string,
  onPress: PropTypes.func,
  withTrailingArrow: PropTypes.bool,
}
ButtonSecondaryGradient.defaultProps = {
  containerStyle: {},
  label: '',
  onPress: () => { },
  withTrailingArrow: false
}
