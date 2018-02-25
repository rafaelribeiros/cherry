import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Values } from '../../../../constants/index'

const {
  smallSpacing,
  largeSpacing,
  inputHeightStandard,
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
  picker: {
    flex: 1,
    marginHorizontal: smallSpacing,
  },
})
