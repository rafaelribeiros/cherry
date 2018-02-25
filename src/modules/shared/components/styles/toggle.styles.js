import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../../../constants/index'

const {
  standardSpacing,
  buttonHeightDense,
} = Metrics

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darkDivider,
    flexDirection: 'row',
    minHeight: buttonHeightDense,
    paddingRight: standardSpacing,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.darkDivider,
  },
  labelContainer: {
    flex: 1,
    marginHorizontal: standardSpacing,
  },
  label: {
    ...Fonts.style.normal,
    color: Colors.blackPrimaryAlt,
  },
  switchWrap: {
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
  },
})
