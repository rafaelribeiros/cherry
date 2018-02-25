import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

const radiusOfHolder = Metrics.smallSpacing / 2
const radiusOfActiveHolder = Metrics.tinySpacing

export const styles = StyleSheet.create({
  audioMessageWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Metrics.standardSpacing
  },
  roundedIconButton: {
    alignItems: 'center',
    aspectRatio: Metrics.ratio.square,
    backgroundColor: Colors.primary,
    borderRadius: Metrics.buttonHeightDense / 2,
    justifyContent: 'center',
    marginRight: Metrics.tinySpacing,
    width: Metrics.buttonHeightDense,
  },
  icon: {
    backgroundColor: 'transparent',
    width: Metrics.icons.medium,
    aspectRatio: Metrics.ratio.square,
    ...Platform.select({
      android: {
        bottom: 1
      }
    }),
  },

  view: {
    flex: 1,
    justifyContent: 'center',
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Metrics.tinySpacing,
  },
  barView: {
    justifyContent: 'center',
    flex: 1,
    height: radiusOfActiveHolder * 2,
    marginRight: Metrics.tinySpacing,
  },
  lineWrap: {
    flexDirection: 'row',
  },
  playbackTitle: {
    ...Fonts.style.detail,
    color: Colors.blackPrimary,
    backgroundColor: 'transparent',
  },
  timeText: {
    ...Fonts.style.detail,
    color: Colors.blackSecondaryAlt,
    backgroundColor: 'transparent',
  },
  line: {
    height: 2,
    padding: 0
  },
  holder: {
    height: radiusOfHolder * 2,
    width: radiusOfHolder * 2,
    borderRadius: radiusOfHolder,
    backgroundColor: Colors.primary,
    bottom: 1,
  },
  activeHolder: {
    height: radiusOfActiveHolder * 2,
    width: radiusOfActiveHolder * 2,
    borderRadius: radiusOfActiveHolder,
    backgroundColor: Colors.primary
  },
})
