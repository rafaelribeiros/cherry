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
  const hasTitle = title !== ''
  const hasSubTitle = subtitle !== ''
  return (
    <View style={StyleSheet.flatten([styles.wrap, containerStyle])}>
      <View style={styles.wrapSpacingDense}>
        { hasTitle && <Text style={styles.title}>{title}</Text>}
        { hasSubTitle && <Text style={styles.subTitle}>{subtitle}</Text>}
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
