import React from 'react'
import { Text, View, ViewPropTypes, StyleSheet } from 'react-native'

import { string, node } from 'prop-types'

import { styles } from '../styles/rows.styles'

export const RowText = ({
  containerStyle,
  title,
  subtitle,
  renderRight
}) => {
  return (
    <View style={StyleSheet.flatten([styles.wrap, containerStyle])}>
      <View style={styles.wrapSpacingDense}>
        {title !== '' && <Text style={styles.title}>{title}</Text>}
        {subtitle !== '' && <Text style={styles.subTitle}>{subtitle}</Text>}
      </View>
      {renderRight}
    </View>
  )
}
RowText.defaultProps = {
  containerStyle: {},
  title: '',
  subtitle: '',
  renderRight: null,
}
RowText.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: string,
  subtitle: string,
  renderRight: node,
}
