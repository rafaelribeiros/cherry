import React from 'react'
import { View, StyleSheet } from 'react-native'
import { oneOfType, number, object, string, func } from 'prop-types'
import FastImage from 'react-native-fast-image'

import { VideoOverlay } from './videoOverlay'
import { Metrics } from '../../../constants/metrics'

export const ImageVideoThumbnail = ({ source, onPress }) => (
  <View style={styles.ratio16per9}>
    <FastImage
      style={styles.image}
      source={source}
      resizeMode={FastImage.resizeMode.cover}
    />
    <VideoOverlay onPress={onPress} />
  </View>
)
ImageVideoThumbnail.propTypes = {
  source: oneOfType([number, object, string]).isRequired,
  onPress: func,
}
ImageVideoThumbnail.defaultProps = {
  onPress: () => { },
}


const styles = StyleSheet.create({
  ratio16per9: {
    aspectRatio: Metrics.ratio.wide
  },
  image: {
    height: '100%',
    width: '100%',
  },
})
