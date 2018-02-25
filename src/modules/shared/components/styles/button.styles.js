import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics, Values } from '../../../../constants'

const {
  blackPrimaryAlt,
  buttonText,
  facebookColor,
  primary,
  special,
  white,
} = Colors

const {
  borderWidth,
  buttonHeightDense,
  buttonHeightStandard,
  largeSpacing,
  smallSpacing,
  standardSpacing,
  tinySpacing,
} = Metrics

export const styles = StyleSheet.create({
  container: {
    ...Values.elevation.e2,
    alignItems: 'center',
    flexDirection: 'row',
    height: buttonHeightStandard,
    marginBottom: smallSpacing,
    marginHorizontal: largeSpacing,
    paddingHorizontal: standardSpacing,
  },
  containerWithoutMargin: {
    ...Values.elevation.e2,
    alignItems: 'center',
    borderRadius: buttonHeightStandard / 2,
    flexDirection: 'row',
    height: buttonHeightStandard,
    marginBottom: smallSpacing,
    paddingHorizontal: standardSpacing,
  },
  containerForIcon: {
    ...Values.elevation.e2,
    alignItems: 'center',
    borderRadius: buttonHeightStandard / 2,
    flexDirection: 'row',
    height: buttonHeightStandard,
    justifyContent: 'center',
    marginBottom: smallSpacing,
  },
  containerFlat: {
    ...Values.styleShortcut.centerContent,
    borderRadius: buttonHeightDense / 2,
    height: buttonHeightDense,
    margin: tinySpacing,
    paddingHorizontal: standardSpacing,
  },
  footerContainer: {
    ...Values.elevation.e2,
    alignItems: 'center',
    flexDirection: 'row',
    height: buttonHeightStandard,
  },
  facebookContainer: {
    backgroundColor: facebookColor,
    paddingLeft: largeSpacing,
    paddingRight: tinySpacing,
  },
  buttonNavbarWrap: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: (Platform.OS === 'ios') ? smallSpacing : standardSpacing,
  },

  primaryBackground: {
    backgroundColor: primary,
  },
  primaryOutline: {
    borderColor: primary,
    borderWidth,
  },
  whiteBackground: {
    backgroundColor: white,
  },

  icon: {
    aspectRatio: 1,
  },

  whiteText: {
    ...Fonts.style.medium,
    color: white,
    flex: 1,
    textAlign: 'center',
  },
  darkText: {
    ...Fonts.style.medium,
    color: blackPrimaryAlt,
    flex: 1,
    textAlign: 'center',
  },
  text: {
    ...Fonts.style.medium,
    color: buttonText,
    flex: 1,
    textAlign: 'center',
  },
  textPrimaryFlat: {
    ...Fonts.style.medium,
    color: primary,
    // textAlign: 'center',
  },
  textWithIcon: {
    ...Fonts.style.medium,
    color: buttonText,
    textAlign: 'center',
    marginLeft: tinySpacing,
  },
  specialText: {
    ...Fonts.style.medium,
    color: special,
    textAlign: 'center',
  },
  TextNavBar: {
    ...Fonts.style.medium,
    color: Colors.white,
  },

  centeredContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
})
