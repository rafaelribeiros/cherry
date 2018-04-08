import { Platform, StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../../../constants'

export const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: Metrics.borderWidthThin,
    borderColor: Colors.darkDivider,
    backgroundColor: Colors.white,
  },
  wrapFlat: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  wrapSpacingStandard: {
    marginVertical: Metrics.smallSpacing,
    marginHorizontal: Metrics.standardSpacing,
    flex: 1
  },
  wrapSpacingDense: {
    marginVertical: Metrics.tinySpacing,
    marginHorizontal: Metrics.standardSpacing,
    flex: 1
  },
  wrapSmallIndent: {
    paddingHorizontal: Metrics.tinySpacing / 2
  },
  rightIndent: {
    paddingRight: Metrics.tinySpacing
  },
  icon: {
    width: Metrics.inputHeightStandard,
    aspectRatio: 1,
    textAlign: 'center',
    lineHeight: Metrics.inputHeightStandard,
  },
  iconDense: {
    width: Metrics.buttonHeightDense,
    aspectRatio: 1,
    textAlign: 'center',
    lineHeight: Metrics.buttonHeightDense,
  },
  input: {
    flex: 1,
    ...Fonts.style.input,
    ...Platform.select({
      android: {
        paddingVertical: 0
      }
    })
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
  normalTitle: {
    ...Fonts.style.normal,
    color: Colors.blackPrimary,
  },
  title: {
    ...Fonts.style.footnote,
    color: Colors.blackPrimary,
  },
  description: {
    ...Fonts.style.description,
    color: Colors.blackSecondary,
  },
  subTitle: {
    ...Fonts.style.footnote,
    color: Colors.blackSecondary,
  },
})
