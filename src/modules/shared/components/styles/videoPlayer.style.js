import { StyleSheet } from 'react-native'

const radiusOfHolder = 5
const radiusOfActiveHolder = 7

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  videoContainer: {
    // aspectRatio: Metrics.ratio.wide,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 1
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  videoIcon: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    padding: 20,
    width: '100%'
  },
  controller: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center'
  },
  barView: {
    flex: 1
  },
  timeText: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  line: {
    borderWidth: 1,
    padding: 0
  },
  holder: {
    height: radiusOfHolder * 2,
    width: radiusOfHolder * 2,
    borderRadius: radiusOfHolder,
    backgroundColor: 'white'
  },
  activeHolder: {
    height: radiusOfActiveHolder * 2,
    width: radiusOfActiveHolder * 2,
    borderRadius: radiusOfActiveHolder,
    backgroundColor: 'white'
  }
})
