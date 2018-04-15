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
    color: Colors.blackSecondary,
  },
  forgotPasswordLink: {
    ...Fonts.style.footnote,
    color: Colors.special,
  },
  welcomeButton: {
    width: '100%',
    minWidth: 96,
    alignSelf: 'center'
  },
  flexCenteredContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  alternativeLoginWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: Metrics.smallSpacing,
    marginHorizontal: Metrics.standardSpacing * 2,
  },
  alternativeLoginLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.darkDivider
  },
  alternativeLoginText: {
    color: Colors.blackDisabledAlt,
    marginHorizontal: Metrics.standardSpacing,
    ...Fonts.style.medium
  },
})
