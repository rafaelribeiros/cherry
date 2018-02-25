import { Platform } from 'react-native'

const type = {
  light: {
    ...Platform.select({
      android: { fontFamily: 'sans-serif-light' },
      ios: { fontWeight: '300' },
    }),
  },
  regular: {
    ...Platform.select({
      android: { fontFamily: 'sans-serif' },
      ios: { fontWeight: '400' },
    }),
  },
  medium: {
    ...Platform.select({
      android: { fontFamily: 'sans-serif-medium' },
      ios: { fontWeight: '600' },
    }),
  },
}

const size = {
  h1: 42,
  h2: 36,
  h3: 32,
  h4: 28,
  h5: 20,
  h6: 19,
  input: (Platform.OS === 'ios') ? 17 : 15,
  regular: 17,
  button: (Platform.OS === 'ios') ? 17 : 14,
  medium: 15,
  small: 13,
  tiny: 12
}

const lineHeight = {
  boost: 24,
  regular: 20,
}

const style = {
  navbarTitle: {
    ...type.medium,
    fontSize: size.h5
  },
  h1: {
    fontSize: size.h1
  },
  h2: {
    fontSize: size.h2
  },
  h3: {
    fontSize: size.h3
  },
  h4: {
    ...type.light,
    fontSize: size.h4
  },
  h5: {
    fontSize: size.h5
  },
  h6: {
    ...type.regular,
    fontSize: size.h6
  },
  medium: {
    ...type.medium,
    fontSize: size.button,
  },
  heavyNormal: {
    ...type.medium,
    fontSize: size.regular
  },
  normal: {
    ...type.regular,
    fontSize: size.regular
  },
  description: {
    ...type.regular,
    fontSize: size.medium
  },
  heavyDescription: {
    ...type.medium,
    fontSize: size.medium
  },
  input: {
    ...type.regular,
    fontSize: size.input
  },
  footnote: {
    ...type.regular,
    fontSize: size.small
  },
  detail: {
    ...type.regular,
    fontSize: size.tiny
  }
}

export const Fonts = {
  lineHeight,
  size,
  style,
  type,
}
