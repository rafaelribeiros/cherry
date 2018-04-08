import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../../../constants'

export const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.largeSpacing,
    marginTop: Metrics.tinySpacing,
    marginHorizontal: Metrics.largeSpacing,
  },
  topRadius: {
    borderTopLeftRadius: Metrics.menuRadius,
    borderTopRightRadius: Metrics.menuRadius,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Metrics.tinySpacing
  },
  footerText: {
    ...Fonts.style.footnote,
    color: Colors.blackDisabledAlt
  }
})
