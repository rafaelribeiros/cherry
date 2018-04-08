import React from 'react'
import { Text, View, ViewPropTypes, StyleSheet } from 'react-native'

import { string, node } from 'prop-types'

import { styles } from '../styles/rows.styles'

export const RowTextAndSubtitle = ({
  containerStyle,
  title,
  subtitle,
  renderRight
}) => {
  return (
    <View style={StyleSheet.flatten([styles.wrap, containerStyle])}>
      <View style={styles.wrapSpacingStandard}>
        {title !== '' && <Text style={styles.normalTitle}>{title}</Text>}
        {subtitle !== '' && <Text style={styles.description}>{subtitle}</Text>}
      </View>
      {renderRight}
    </View>
  )
}
RowTextAndSubtitle.defaultProps = {
  containerStyle: {},
  title: '',
  subtitle: '',
  renderRight: null,
}
RowTextAndSubtitle.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: string,
  subtitle: string,
  renderRight: node,
}
