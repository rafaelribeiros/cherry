import React from 'react'
import { StatusBar, View } from 'react-native'
import { styles } from './style/hoc.styles'
import { Colors } from '../../../../constants'

export const ScreenWithScrollHOC = Component => ({ children, ...props }) => (
  <View style={styles.container}>
    <StatusBar backgroundColor={Colors.androidStatusBar} />
    <Component {...props}>
      {children}
    </Component>
  </View>
)
