import { StyleSheet } from 'react-native'
import { Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: Metrics.smallSpacing,
  },
  imageBackgoud: {
    ...StyleSheet.absoluteFillObject
  },
})
