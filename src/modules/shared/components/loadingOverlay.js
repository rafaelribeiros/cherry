import React from 'react'
import { View, StyleSheet } from 'react-native'

import { LoadingSpinner } from './loadingSpinner'
import { styles } from './styles/loadingOverlay.styles'
import { Colors } from '../../../constants/colors'

export const LoadingOverlay = (elevated) => {
  const elevation = (elevated) ? styles.overlayElevation : {}
  return (
    <View style={StyleSheet.flatten([styles.absoluteFill, elevation])}>
      <LoadingSpinner spinnerColor={Colors.primary} />
    </View>
  )
}
