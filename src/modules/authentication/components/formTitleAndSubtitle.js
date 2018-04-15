import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { bool, string } from 'prop-types'
import { Fonts, Colors, Metrics } from '../../../constants'

export const FormTitleAndSubtitle = ({ dense, title, subtitle }) => {
  const [titleStyle, subtitleStyle] = dense
    ? [styles.titleDense, styles.subtitleDense]
    : [styles.title, styles.subtitle]
  const hasTitle = title !== ''
  const hasSubTitle = subtitle !== ''
  return (
    <View style={styles.wrap}>
      {hasTitle && <Text style={titleStyle}>{title}</Text>}
      {hasSubTitle && <Text style={subtitleStyle}>{subtitle}</Text>}
    </View>
  )
}
FormTitleAndSubtitle.propTypes = {
  dense: bool,
  title: string,
  subtitle: string,
}
FormTitleAndSubtitle.defaultProps = {
  dense: false,
  title: undefined,
  subtitle: undefined,
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: Metrics.largeSpacing
  },
  title: {
    ...Fonts.style.formTitle,
    color: Colors.blackPrimaryAlt,
    marginBottom: Metrics.tinySpacing,
    textAlign: 'center',
  },
  titleDense: {
    ...Fonts.style.normal,
    color: Colors.blackPrimaryAlt,
    marginBottom: Metrics.tinySpacing,
    textAlign: 'center',
  },
  subtitle: {
    ...Fonts.style.normal,
    color: Colors.blackSecondaryAlt,
    marginBottom: Metrics.standardSpacing,
    textAlign: 'center',
  },
  subtitleDense: {
    ...Fonts.style.description,
    color: Colors.blackSecondaryAlt,
    marginBottom: Metrics.standardSpacing,
    textAlign: 'center',
  }
})
