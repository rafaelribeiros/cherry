import React from 'react'
import { StyleSheet, View, ViewPropTypes, Platform, TouchableWithoutFeedback } from 'react-native'
import { func, any, } from 'prop-types'

import { Colors, Metrics } from '../../../constants'

export const Card = ({ children, style, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={StyleSheet.flatten([styles.card, style])}>
      {children}
    </View>
  </TouchableWithoutFeedback>
)

Card.defaultProps = {
  onPress: () => { },
  children: null,
  style: {},
}
Card.propTypes = {
  onPress: func,
  children: any,
  style: ViewPropTypes.style,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    ...Platform.select({
      android: {
        elevation: 2,
        marginVertical: Metrics.smallSpacing / 2,
      },
      ios: {
        borderBottomWidth: Metrics.borderWidth,
        borderColor: Colors.darkDivider,
        marginBottom: Metrics.smallSpacing,
      }
    }),
  }
})
