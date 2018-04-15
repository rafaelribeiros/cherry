import React from 'react'
import { Image, Platform, StyleSheet, View } from 'react-native'

import { Images, Metrics } from '../../../constants'

export const NavBarLogo = () => (
  <View>
    <Image
      source={Images.signInLogoPath}
      style={s.image}
    />
  </View>
)

const s = StyleSheet.create({
  image: {
    height: 32,
    aspectRatio: 2,
    resizeMode: 'contain',
    ...Platform.select({
      android: {
        marginLeft: Metrics.standardSpacing,
      }
    })
  }
})
