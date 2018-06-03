import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../../constants/index'

const {
  smallSpacing,
  inputHeightStandard,
  standardSpacing
} = Metrics

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    height: inputHeightStandard,
  },
  picker: {
    flex: 1,
    marginHorizontal: smallSpacing,
  },
  labelStyle: {
    ...Fonts.style.detail,
    color: Colors.blackSecondary,
    paddingHorizontal: standardSpacing,
  }
})
