import React from 'react'
import { func, oneOfType, object, string, number, bool } from 'prop-types'

import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'

import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { styles } from './styles/openGraph.style'
import { Colors, Metrics } from '../../../constants'

const showCloseButton = (onClose) => {
  const closeButton = () => {
    if (onClose) {
      return (
        <TouchableOpacity style={styles.ogClearButton} onPress={() => onClose()}>
          <Icon name="clear" size={18} color="#00000042" />
        </TouchableOpacity>
      )
    }
    return null
  }
  return closeButton()
}

const renderLinkIcon = (image, description) => {
  if (!image.uri && !description) {
    return (
      <Icon name="link" size={24} color={Colors.blackSecondaryAlt} style={{ marginRight: Metrics.tinySpacing }} />
    )
  }
  return null
}

const renderImage = (image, pocket) => {
  if (typeof image.uri !== 'undefined') {
    if (image.uri.startsWith('www') || image.uri.startsWith('http')) {
      return (
        <FastImage
          style={(pocket) ? styles.ogPocketImage : styles.ogImage}
          source={image}
          resizeMode={FastImage.resizeMode.cover}
        />
      )
    }
  }
  return null
}

const renderText = (description, pocket) => {
  if (description) {
    return (
      <Text numberOfLines={(pocket) ? 1 : 3} style={styles.ogText}>{description}</Text>
    )
  }
  return null
}

export const OpenGraph = ({
  link, image, title, description, onPress, pocket, onClose
}) => (
  <TouchableWithoutFeedback onPress={() => onPress(link, title)}>
    <View style={(pocket) ? [styles.ogContainer, styles.pocketed] : styles.ogContainer}>
      {renderImage(image, pocket)}
      <View style={styles.ogDescription}>
        {renderLinkIcon(image, description)}
        <View style={styles.ogDescriptionSection}>
          <Text numberOfLines={((image.uri || description) && !pocket) ? 2 : 1} style={styles.ogTitle}>
            {(image.uri || description) ? title : link}
          </Text>
          {renderText(description, pocket)}
        </View>
      </View>
      {showCloseButton(onClose)}
    </View>
  </TouchableWithoutFeedback>
)

OpenGraph.propTypes = {
  pocket: bool,
  onClose: func,
  onPress: func.isRequired,
  link: oneOfType([number, string, object]).isRequired,
  image: oneOfType([number, string, object]),
  title: string,
  description: string
}

OpenGraph.defaultProps = {
  pocket: false,
  onClose: null,
  onPress: () => { },
  link: '',
  image: '',
  title: '',
  description: ''
}
