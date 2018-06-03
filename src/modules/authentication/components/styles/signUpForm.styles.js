import { StyleSheet } from 'react-native'
import { Metrics } from '../../../../constants/index'

const {
  smallSpacing,
  largeSpacing,
} = Metrics


export const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picker: {
    marginHorizontal: largeSpacing,
    marginBottom: smallSpacing,
  }
})
