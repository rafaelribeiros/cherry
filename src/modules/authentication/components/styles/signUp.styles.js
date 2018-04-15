import { StyleSheet } from 'react-native'
import { Colors } from '../../../../constants/index'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    backgroundColor: Colors.darkOverlay
  },
})
