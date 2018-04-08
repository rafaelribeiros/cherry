import React from 'react'
import { StyleSheet, Switch, View, ViewPropTypes, Text } from 'react-native'
import { PropTypes } from 'prop-types'

import { Touchable } from './touchable'

import { Colors } from '../../../constants'
import { styles } from './styles/toggle.styles'

export const Toggle = ({
  title,
  subtitle,
  onValueChange,
  style,
  value,
}) => (
  <Touchable style={StyleSheet.flatten([styles.container, style])} onPress={onValueChange}>
    <View style={styles.labelContainer}>
      <Text style={styles.title}>{title}</Text>
      {subtitle !== '' && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    <View style={styles.switchWrap}>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  </Touchable>
)

Toggle.propTypes = {
  onValueChange: PropTypes.func,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  value: PropTypes.bool,
  style: ViewPropTypes.style,
}
Toggle.defaultProps = {
  onValueChange: () => { },
  title: '',
  subtitle: '',
  value: false,
  style: {},
}

