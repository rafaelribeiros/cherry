import React from 'react'
import { SafeAreaView } from 'react-native'
import { styles } from './style/hoc.styles'

export const ScreenContainerHOC = Component => ({ children, ...props }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Component {...props}>
        {children}
      </Component>
    </SafeAreaView>
  )
}
