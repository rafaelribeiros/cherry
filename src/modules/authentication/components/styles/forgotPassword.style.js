import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../../constants/index'


export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    backgroundColor: Colors.darkOverlay
  },
  forgotPasswordText: {
    ...Fonts.style.input,
    color: Colors.white,
  },
  bottomSpacing: {
    marginBottom: Metrics.standardSpacing
  }
})
