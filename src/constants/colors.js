import { Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

export const Colors = {
  // APP COLORS
  primary: '#F44336',
  special: '#EF5350',
  primaryGradient: {
    light: '#F44336',
    dark: '#F44336'
  },
  primaryGradientCondensed: ['#F44336', '#F44336'],
  specialGradient: {
    light: '#3CDBD3',
    dark: '#00AEA5'
  },
  buttonText: '#ffffff',
  navBar: {
    background: isIOS
      ? '#f3f5f7'
      : '#F6F8FA',
    tint: isIOS
      ? '#15c850'
      : '#00000089',
  },

  // FIXED COLORS
  facebookColor: '#3A5A98',
  white: '#ffffff',
  whiteOpaque: 'rgba(255, 255, 255, 0.5)',
  error: '#FF3B30',
  androidStatusBar: 'rgba(0, 0, 0, 0.2)',
  screen: '#f3f5f7',

  darkOverlay: 'rgba(0, 0, 0, 0.80)',
  darkDivider: 'rgba(0, 0, 0, 0.14)',
  lightDivider: 'rgba(255, 255, 255, 0.2)',

  blackPrimary: '#212121',
  blackPrimaryAlt: '#000000DD',
  blackSecondary: '#757575',
  blackSecondaryAlt: '#00000089',
  blackDisabled: '#E0E0E0',
  blackDisabled2: '#EEEEEE',
  blackDisabledAlt: '#00000060',
  blackDisabledAlt2: '#00000042',

  whiteSecondary: '#ffffffB2',
  whiteDisabled: '#ffffff7F',
  whiteDisabled2: '#ffffff4C',
}
