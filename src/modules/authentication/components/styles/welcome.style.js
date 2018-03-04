import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../../constants'

export const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },
  fullSizeImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    paddingBottom: Metrics.tinySpacing * 7,
    paddingHorizontal: Metrics.tinySpacing * 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: Metrics.tinySpacing / 2,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: Colors.blackDisabledAlt2,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    textShadowColor: Colors.blackDisabledAlt2,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  buttonsContainer: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
  },
  buttonSignup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.whiteSeparator,
  },
  buttonLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackPrimary,
    borderTopWidth: 1,
    borderTopColor: Colors.whiteSeparator,
  },
})
