import React from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { string } from 'prop-types'
import { Colors, Fonts } from '../../../constants'

export const NavBarTwoLineTitle = ({ title, subtitle }) => (
  <View>
    {title && <Text style={styles.titleWithSubtitle}>{title}</Text>}
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </View>
)
NavBarTwoLineTitle.propTypes = {
  title: string,
  subtitle: string
}
NavBarTwoLineTitle.defaultProps = {
  title: undefined,
  subtitle: undefined
}

const styles = StyleSheet.create({
  titleWithSubtitle: {
    ...Fonts.style.description,
    color: Colors.blackPrimaryAlt,
    ...Platform.select({
      ios: {
        textAlign: 'center'
      }
    })
  },
  subtitle: {
    ...Fonts.style.detail,
    color: Colors.blackSecondaryAlt,
    ...Platform.select({
      ios: {
        textAlign: 'center'
      }
    })
  }
})
