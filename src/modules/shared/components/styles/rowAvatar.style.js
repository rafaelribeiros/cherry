import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    marginLeft: Metrics.standardSpacing,
    marginVertical: Metrics.smallSpacing,
  },
  infoWrap: {
    flex: 1,
    marginLeft: Metrics.tinySpacing,
    marginRight: Metrics.standardSpacing,
  },
  title: {
    ...Fonts.style.footnote,
    color: Colors.blackPrimary,
  },
  subTitle: {
    ...Fonts.style.footnote,
    color: Colors.blackSecondary,
  }
})
