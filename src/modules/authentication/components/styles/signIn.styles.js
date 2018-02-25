import { StyleSheet } from 'react-native'
import { Fonts, Metrics, Colors } from '../../../../constants/index'

const { tinySpacing, largeSpacing } = Metrics

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    backgroundColor: Colors.darkOverlay
  },
  alertContainer: {
    marginHorizontal: largeSpacing
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    paddingVertical: tinySpacing,
    marginRight: largeSpacing,
  },
  forgotPasswordText: {
    ...Fonts.style.footnote,
    color: Colors.white,
  },
  forgotPasswordLink: {
    ...Fonts.style.footnote,
    color: Colors.special,
  }
})
