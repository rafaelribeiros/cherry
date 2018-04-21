import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaTextContainer: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.standardSpacing,
    alignItems: 'center',
  },
  mediaText: {
    flex: 1,
    ...Fonts.style.detail,
    color: Colors.blackSecondary,
  },
  image: {
    aspectRatio: Metrics.ratio.wide,
    width: '100%',
    height: null,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  videoWrap: {
    borderRadius: Metrics.menuRadius,
    marginBottom: Metrics.largeSpacing,
    marginHorizontal: Metrics.standardSpacing,
    marginTop: Metrics.tinySpacing / 2,
    overflow: 'hidden',
  }
})
