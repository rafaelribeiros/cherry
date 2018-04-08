import { StyleSheet, Platform } from 'react-native'

import { Colors, Fonts, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.screen,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerSpacing: {
    height: Metrics.smallSpacing
  },
  sectionSpacing: {
    marginBottom: Metrics.smallSpacing,
  },
  bottomTinySpacing: {
    marginBottom: Metrics.tinySpacing
  },
  title: {
    ...Fonts.style.heavyNormal,
    color: Colors.blackPrimary,
    lineHeight: Fonts.lineHeight.boost,
    marginBottom: Metrics.tinySpacing,
    marginHorizontal: Metrics.standardSpacing,
  },
  description: {
    ...Fonts.style.description,
    color: Colors.blackPrimary,
    lineHeight: Fonts.lineHeight.regular,
    marginBottom: Metrics.smallSpacing,
    marginHorizontal: Metrics.standardSpacing,
  },
  card: {
    ...Platform.select({
      android: {
        marginTop: Metrics.smallSpacing / 2,
      },
    }),
  },
  imageSquare: {
    maxHeight: Metrics.screenWidth,
  },
  image16per9: {
    aspectRatio: 16 / 9,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darkOverlay,
  },
  loadingContainer: {
    ...Platform.select({
      android: {
        paddingTop: Metrics.tinySpacing,
      },
      ios: {
        paddingVertical: Metrics.tinySpacing,
      }
    })
  },
  imageCounterWrap: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.blackSecondaryAlt,
    paddingVertical: Metrics.tinySpacing / 2,
    paddingHorizontal: Metrics.tinySpacing,
    borderTopLeftRadius: Metrics.menuRadius,
  },
  counterText: {
    ...Fonts.style.detail,
    color: Colors.white,
  }
})
