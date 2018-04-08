import React from 'react'
import { Text, Platform, StyleSheet } from 'react-native'

import { string, func } from 'prop-types'
import { Touchable } from '../touchable'

import { styles } from '../styles/button.style'

export const ButtonNavText = ({ title, onPress, containerStyle }) => {
  const textToDisplay = (Platform.OS === 'android') ? title.toUpperCase() : title
  return (
    <Touchable onPress={onPress} style={StyleSheet.flatten([styles.buttonNavbarWrap, containerStyle])}>
      <Text style={styles.TextNavBar}>{textToDisplay}</Text>
    </Touchable>
  )
}

ButtonNavText.propTypes = {
  title: string.isRequired,
  onPress: func,
  containerStyle: Text.propTypes.style,
}
ButtonNavText.defaultProps = {
  onPress: () => {},
  containerStyle: {},
}
