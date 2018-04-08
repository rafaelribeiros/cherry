import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { func, bool, string } from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import { Touchable } from './touchable'

import { Fonts, Metrics, Colors } from '../../../constants'


export const Chip = ({ label, selected, onPress }) => {
  const chipColor = selected
    ? [Colors.primaryGradient.light, Colors.primaryGradient.dark]
    : [Colors.blackDisabledAlt, Colors.blackDisabledAlt]
  return (
    <View style={styles.wrap}>
      <Touchable useForeground onPress={onPress}>
        <LinearGradient
          colors={chipColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{label}</Text>
        </LinearGradient>
      </Touchable>
    </View>
  )
}
Chip.propTypes = {
  label: string,
  onPress: func,
  selected: bool,
}
Chip.defaultProps = {
  label: '',
  onPress: () => {},
  selected: false,
}

const styles = StyleSheet.create({
  wrap: {
    margin: Metrics.smallSpacing / 2,
    borderRadius: Metrics.chipHeight / 2,
    overflow: 'hidden',
  },
  gradient: {
    height: Metrics.chipHeight,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...Fonts.style.footnote,
    marginHorizontal: Metrics.smallSpacing,
    color: Colors.white
  }
})
