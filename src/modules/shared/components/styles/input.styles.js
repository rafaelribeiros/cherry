import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics, Values } from '../../../../constants/index'

const {
  tinySpacing,
  smallSpacing,
  largeSpacing,
  standardSpacing,
  inputHeightStandard,
  iconTouchableArea
} = Metrics

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: largeSpacing,
    marginBottom: smallSpacing,
    height: inputHeightStandard,
    alignItems: 'center',
  },
  iconWrap: {
    aspectRatio: 1,
    justifyContent: 'center'
  },
  icon: {
    width: iconTouchableArea,
    textAlign: 'center',
    alignSelf: 'center',
  },
  inputText: {
    flex: 1,
    marginHorizontal: smallSpacing,
    ...Fonts.style.normal,
  },
  InputWithLabelContainer: {
    flexDirection: 'column',
    paddingHorizontal: standardSpacing,
    marginTop: standardSpacing,
  },
  InputWithLabel: {
    color: Colors.blackPrimary,
    ...Fonts.style.input,
    ...Platform.select({
      android: {
        paddingHorizontal: 0,
        paddingVertical: tinySpacing / 2,
      },
      ios: {
        paddingVertical: tinySpacing,
      }
    })
  },
  labelStyle: {
    ...Fonts.style.detail,
    color: Colors.blackSecondary
  },
  wrapInputMultline: {
    backgroundColor: Colors.white,
    marginTop: smallSpacing,
    marginBottom: tinySpacing,
    ...Platform.select({
      android: {
        borderRadius: 4,
        minHeight: 83,
        paddingHorizontal: Metrics.tinySpacing,
      },
      ios: {
        borderRadius: 10,
        padding: Metrics.smallSpacing,
      },
    }),
  },
  inputMultline: {
    ...Fonts.style.input,
    ...Platform.select({
      android: {
        maxHeight: 162,
        paddingVertical: Metrics.tinySpacing / 2,
      },
      ios: {
        maxHeight: 133,
        minHeight: 60,
        paddingTop: 0,
      },
    }),
  },
  footerInputWrap: {
    ...Platform.select({
      ios: {
        backgroundColor: Colors.white,
        borderColor: Colors.darkDivider,
        borderRadius: Metrics.menuRadius,
        borderWidth: Metrics.borderWidth,
        margin: Metrics.tinySpacing,
        maxHeight: Metrics.inputMultilineMaxHeight,
        minHeight: Metrics.inputHeightDense,
        paddingHorizontal: Metrics.baseMargin,
        paddingVertical: Metrics.tinySpacing / 2,
        justifyContent: 'center'
      }
    })
  },
  footerInput: {
    ...Fonts.style.input,
    ...Platform.select({
      android: {
        backgroundColor: Colors.white,
        borderColor: Colors.darkDivider,
        borderRadius: Metrics.menuRadius,
        borderWidth: Metrics.borderWidth,
        margin: Metrics.tinySpacing,
        maxHeight: Metrics.inputMultilineMaxHeight,
        minHeight: Metrics.inputHeightDense,
        paddingHorizontal: Metrics.baseMargin,
        paddingVertical: Metrics.tinySpacing / 2,
      },
      ios: {
        paddingTop: 0
      }
    })
  },
  footerInputButton: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.white,
    marginTop: 0,
  }
})
