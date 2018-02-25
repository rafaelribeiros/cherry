import { StyleSheet } from 'react-native'
import { Colors } from '../../../../constants/index'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    backgroundColor: Colors.darkOverlay
  },
})
