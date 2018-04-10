import { Platform, StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  background: {
    ...Platform.select({
      android: {
        backgroundColor: Colors.blackDisabledAlt,
      },
      ios: {
        backgroundColor: Colors.darkOverlay,
      }
    }),
    flex: 1,
    justifyContent: 'center',
  },
  cardWrapper: {
    flex: 1,
    paddingVertical: Metrics.largeSpacing * 2,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Metrics.menuRadius,
    paddingVertical: Metrics.tinySpacing,
    marginHorizontal: Metrics.largeSpacing * 2
  },
  menu: {
    ...Fonts.style.description,
    color: Colors.blackPrimaryAlt,
    lineHeight: Metrics.buttonHeightStandard,
    textAlign: 'center',
  }
})
