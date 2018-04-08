import React from 'react'
import { StyleSheet, Text, Platform, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Touchable } from '../touchable'
import { styles } from '../styles/button.style'
import { Colors, Metrics } from '../../../../constants'

export const ButtonWithIcon = (props) => {
  const { containerWithoutMargin, containerForIcon, textWithIcon } = styles
  const { icon, onPress, label, backgroundColor, containerStyle } = props
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()

  const dynamicContainer = (label) ? containerWithoutMargin : [containerForIcon, { aspectRatio: Metrics.ratio.square }]
  return (
    <Touchable
      style={StyleSheet.flatten([dynamicContainer, { backgroundColor }, containerStyle])}
      onPress={onPress}
      {...props}
    >
      <Icon
        color={Colors.white}
        name={icon}
        size={Metrics.icons.medium}
        style={styles.icon}
      />
      {
        (labelToShow !== '') &&
        <Text style={textWithIcon}>{labelToShow}</Text>
      }
    </Touchable>
  )
}

ButtonWithIcon.propTypes = {
  backgroundColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  icon: PropTypes.string,
  label: PropTypes.string,
  onPress: PropTypes.func,
}

ButtonWithIcon.defaultProps = {
  backgroundColor: Colors.primary,
  containerStyle: {},
  icon: '',
  label: '',
  onPress: () => { },
}
