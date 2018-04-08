import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../constants'

export const styles = StyleSheet.create({
  ogContainer: {
    backgroundColor: Colors.lightBackground,
    marginHorizontal: Metrics.tinySpacing,
    marginBottom: Metrics.tinySpacing,
    borderRadius: 2,
    elevation: 2,
    shadowColor: Colors.blackPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 1
  },
  pocketed: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ogImage: {
    aspectRatio: Metrics.ratio.wide,
    width: '100%',
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
  },
  ogPocketImage: {
    aspectRatio: 1,
    width: Metrics.tinySpacing * 7,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  ogDescription: {
    flex: 1,
    paddingHorizontal: Metrics.tinySpacing,
    paddingVertical: Metrics.tinySpacing,
    flexDirection: 'row'
  },
  ogDescriptionSection: {
    flex: 1,
  },
  ogTitle: {
    flex: 1,
    fontWeight: '600',
    color: Colors.blackPrimary,
    lineHeight: Fonts.lineHeight.regular,
  },
  ogClearButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ogText: {
    fontSize: Fonts.size.tiny,
    lineHeight: Fonts.lineHeight.regular,
  }
})
