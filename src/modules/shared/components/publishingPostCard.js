import React from 'react'
import { bool, shape, number } from 'prop-types'
import { View, Text, StyleSheet, Platform } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'

import { Card } from './card'
import { LoadingSpinner } from './loadingSpinner'
import { Colors, Metrics, Fonts } from '../../../constants'

const renderImagesUploading = () => {
  return (
    <Card style={styles.imageContainer}>
      <Text style={styles.title}>Sua publicação estará disponível após o upload</Text>
      <LoadingSpinner spinnerSize="small" spinnerColor={Colors.primary} />
    </Card>
  )
}

const renderVideoUploading = (uploadingData) => {
  const uploadingProgress = uploadingData.bytes > 0 ? parseInt((uploadingData.bytes / uploadingData.totalBytes) * 100, 10) : 0
  const viewWidth = uploadingProgress <= 10 ? `${10}%` : `${uploadingProgress}%`
  return (
    <Card style={styles.videoContainer}>
      <Text style={styles.title}>Seu vídeo está sendo enviado e em breve aparecerá na linha do tempo</Text>
      <View style={styles.progressContainer}>
        <LinearGradient
          colors={Colors.primaryGradientCondensed}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[{ width: viewWidth }, styles.progress]}
        >
          <Text style={styles.progressText}>{uploadingProgress}%</Text>
        </LinearGradient>
      </View>
    </Card>
  )
}

export const PublishingPostCard = ({ uploadingImage, videoUploading }) => {
  const { data, uploading } = videoUploading
  if (uploadingImage) {
    return renderImagesUploading()
  } else if (uploading) {
    return renderVideoUploading(data)
  }
  return null
}

PublishingPostCard.propTypes = {
  uploadingImage: bool,
  videoUploading: shape({
    data: shape({
      bytes: number,
      totalBytes: number
    }),
    uploading: bool,
  }),
}

PublishingPostCard.defaultProps = {
  uploadingImage: false,
  videoUploading: {
    data: {
      bytes: 0,
      totalBytes: 0
    },
    uploading: false,
  },
}


const styles = StyleSheet.create({
  title: {
    ...Fonts.style.footnote,
    color: Colors.blackSecondaryAlt,
    flex: 1
  },
  progressText: {
    ...Fonts.style.detailHeavy,
    color: Colors.blackSecondaryAlt
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.standardSpacing,
    paddingVertical: Metrics.smallSpacing,
    marginTop: Metrics.tinySpacing,
    ...Platform.select({
      android: {
        marginBottom: Metrics.smallSpacing / 2,
      },
      ios: {
        marginBottom: Metrics.smallSpacing,
      },
    }),
  },
  imageText: {
    marginRight: Metrics.tinySpacing,
  },
  videoContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: Metrics.standardSpacing,
    paddingVertical: Metrics.smallSpacing,
    marginTop: Metrics.tinySpacing,
    ...Platform.select({
      android: {
        marginBottom: Metrics.smallSpacing / 2,
      },
      ios: {
        marginBottom: Metrics.smallSpacing,
      },
    }),
  },
  progressContainer: {
    height: Metrics.progressBarHeight,
    overflow: 'hidden',
    marginTop: Metrics.tinySpacing,
    backgroundColor: Colors.darkDivider,
    borderRadius: Metrics.progressBarHeight / 2,
  },
  progress: {
    height: Metrics.progressBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.progressBarHeight / 2,
  }
})
