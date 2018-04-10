import React, { Component } from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'

import PropTypes from 'prop-types'
import IconSet from 'react-native-vector-icons/MaterialCommunityIcons'
import Gallery from 'react-native-image-gallery'
import FastImage from 'react-native-fast-image'

import { Colors, Metrics } from '../../../../constants'

import { getImageUrl } from '../../../../config/utils'

export class ImagesGallery extends Component {

  static propTypes = {
    closeGallery: PropTypes.func,
    isVisible: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string)
  }

  static defaultProps = {
    closeGallery: () => { },
    isVisible: false,
    images: []
  }

  state = { index: 0 }

  onChangeImage = (index) => {
    this.setState({ index })
  }

  renderImage = (imageProps) => {
    return (
      <View style={styles.itemContainer}>
        <FastImage
          {...imageProps}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    )
  }

  renderIndexIndicator = () => {
    const { index } = this.state
    const { images } = this.props

    return (
      <View style={styles.indexIndicatorWrapper}>
        <Text style={{ color: Colors.white }}>{index + 1} / {images.length}</Text>
      </View>
    )
  }

  render() {
    const { closeGallery, isVisible, images } = this.props
    const mappedImages = images.map((item) => {
      const image = { source: { uri: getImageUrl(item, 'medium') } }
      return image
    })
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={closeGallery}
      >
        <View style={{ flex: 1 }}>
          <Gallery
            style={styles.backdrop}
            images={mappedImages}
            imageComponent={this.renderImage}
            onPageSelected={this.onChangeImage}
          />
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={closeGallery}>
              <IconSet name="chevron-left" size={36} color={Colors.whiteSecondary} />
            </TouchableOpacity>
          </View>
          {this.renderIndexIndicator()}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: '80%',
    width: '100%',
  },
  buttonWrapper: {
    position: 'absolute',
    left: 0,
    top: (Platform.OS === 'ios') ? 20 : 0,
  },
  indexIndicatorWrapper: {
    position: 'absolute',
    right: Metrics.smallSpacing,
    alignItems: 'center',
    top: (Platform.OS === 'ios') ? 30 : 10,
  }
})
