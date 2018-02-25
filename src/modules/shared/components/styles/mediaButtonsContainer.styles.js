import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../../constants/index'

const {
  tinySpacing,
  smallSpacing,
  standardSpacing,
} = Metrics

export const styles = StyleSheet.create({
  container: {
    marginLeft: standardSpacing,
    flexDirection: 'row',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  label: {
    marginBottom: tinySpacing,
    color: Colors.blackSecondary
  },
  iconSpacing: {
    marginTop: smallSpacing,
    marginRight: tinySpacing
  }
})
