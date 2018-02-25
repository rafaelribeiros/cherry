import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native'
import PropTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Touchable } from '../../shared/components/touchable'

import { Metrics, Colors } from '../../../constants/index'

import { styles } from '../../shared/components/styles/button.styles'

export const ButtonFacebook = ({ label, onPress }) => {
  const labelToShow = (Platform.OS === 'ios') ? label : label.toUpperCase()
  const { container, facebookContainer, whiteText } = styles
  return (
    <Touchable style={StyleSheet.flatten([container, facebookContainer])} onPress={onPress}>
      <Icon
        name={'facebook-box'}
        size={Metrics.icons.medium}
        color={Colors.white}
        style={styles.icon}
      />
      <Text style={whiteText}>{labelToShow}</Text>
    </Touchable>
  )
}

ButtonFacebook.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
}
ButtonFacebook.defaultProps = {
  label: '',
  onPress: () => { },
}
