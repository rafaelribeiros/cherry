import { Dimensions, Platform, StyleSheet } from 'react-native'

const { width, height } = Dimensions.get('window')
const statusBarHeight = Platform.OS === 'ios' ? 20 : 24
const navBarHeight = Platform.OS === 'ios' ? 66 : 80

export const Metrics = {
  tinySpacing: 8,
  smallSpacing: 12,
  standardSpacing: 16,
  largeSpacing: 24,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  statusBarHeight,
  navBarHeight,
  navBarButtonHeight: 48,
  singleTitleWrapMargin: 60,
  backButtonInset: Platform.OS === 'ios' ? 5 : 8,
  section: 25,
  baseMargin: 10,
  borderWidth: 1,
  borderWidthThin: StyleSheet.hairlineWidth,
  menuRadius: 8,

  avatar: {
    small: 32,
    standard: 40,
    xxl: 120
  },

  icons: {
    tiny: 12,
    small: 18,
    medium: 24,
    large: 32,
    xl: 48,
    xxl: 72,
    xxxl: 96
  },
  iconTouchableArea: 48,
  iconTouchableAreaDense: 40,

  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  },

  ratio: {
    square: 1,
    standard: 4 / 3,
    wide: 16 / 9,
  },

  animation: {
    fast: 150,
    standard: 250,
  },

  buttonHeightDense: 40,
  buttonHeightStandard: 48,
  inputHeightDense: 40,
  inputHeightStandard: 48,
  inputMultilineMaxHeight: 136,
  maxErrorMessageHeight: 48,
}
