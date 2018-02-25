import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  errorMessage: {
    ...Fonts.style.footnote,
    color: Colors.error,
    marginHorizontal: Metrics.largeSpacing,
    paddingVertical: Metrics.tinySpacing,
    textAlign: 'center',
  }
})
