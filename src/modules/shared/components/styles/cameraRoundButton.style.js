import { StyleSheet } from 'react-native'
import { Metrics } from '../../../../constants'

const sizeButton = Math.ceil(Metrics.screenWidth * 0.22)

export const styles = StyleSheet.create({
  roundButton: {
    elevation: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.26,
    shadowRadius: 4,
    borderRadius: sizeButton / 2,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
    height: sizeButton,
    width: sizeButton,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
