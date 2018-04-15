import { StyleSheet, Platform } from 'react-native'
import { Colors } from '../../../../constants/index'

const { darkOverlay } = Colors

export const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: darkOverlay,
    flex: 1,
    justifyContent: 'center'
  },
  overlayElevation: {
    ...Platform.select({
      android: {
        elevation: 4
      }
    })
  }
})
