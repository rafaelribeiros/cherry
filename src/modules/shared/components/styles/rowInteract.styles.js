import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  wrap: {
    borderTopWidth: Metrics.borderWidth,
    borderColor: Colors.darkDivider,
    paddingHorizontal: Metrics.tinySpacing / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonNumber: {
    ...Fonts.style.footnote,
    color: Colors.blackSecondary,
    paddingRight: Metrics.tinySpacing,
  },
  dividerWrap: {
    paddingLeft: Metrics.tinySpacing,
    paddingRight: Metrics.tinySpacing,
    paddingVertical: Metrics.baseMargin,
  },
  divider: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: Colors.darkDivider,
  },
  alignRight: {
    flex: 1,
    alignItems: 'flex-end',
  }
})
