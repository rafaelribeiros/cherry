import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native'

import { number } from 'prop-types'
import FastImage from 'react-native-fast-image'

// import { OpenGraph } from '../../shared/components/openGraph'
import { Card } from '../../shared/components/card'
import { RowAvatar, RowInteract } from '../../shared/components/rows'
import { TextWithReadMore } from '../../shared/components/textWithReadMore'

import { Metrics } from '../../../constants'
import { styles } from './styles/feed.style'
import { feedItemDefault, feedItemProps } from '../../shared/propTypes/feedPropTypes'

const setDataPadding = (image, videoThumbnail) => (image || videoThumbnail ? 0 : Metrics.tinySpacing / 2)

const ImagesLengthIndicator = ({ length }) => {
  const photoText = (length > 2) ? 'fotos' : 'foto'
  return (
    <View style={styles.imageCounterWrap}>
      <Text style={styles.counterText}>+{length - 1} {photoText}</Text>
    </View>
  )
}
ImagesLengthIndicator.propTypes = { length: number }
ImagesLengthIndicator.defaultProps = { length: 0 }

export class FeedCard extends Component {
  static defaultProps = feedItemDefault
  static propTypes = feedItemProps

  state = {}

  shouldComponentUpdate(nextProps) {
    if (this.props.liked !== nextProps.liked) {
      return true
    }
    if (this.props.commentCount !== nextProps.commentCount) {
      return true
    }
    if (this.props.shareCount !== nextProps.shareCount) {
      return true
    }
    if (this.props.status !== nextProps.status) {
      return true
    }
    if (this.props.type !== nextProps.type) {
      return true
    }
    if (this.props.interactions.like.disabled !== nextProps.interactions.like.disabled) {
      return true
    }
    return false
  }

  render() {
    const {
    //   isOgPocket,
    //   og: {
    //     ogLink, ogImage, ogTitle, ogDescription
    //   },
      candidate,
      formatedDate,
      goOgLink,
      id,
      imageThumbnailNotCropped,
      images,
      interactions: { like, comment, share },
      onReadMorePress,
      contentType,
      showGallery,
      showMenuModal,
      text,
      textMaxLength,
      title,
      videoThumbnail,
    } = this.props
    const hasImage = (images.length > 0)
    const imageSource = hasImage ? { uri: images[0], priority: FastImage.priority.normal } : {}
    const subtitleToShow = `${contentType} - ${formatedDate}`
    return (
      <Card style={styles.card}>
        <RowAvatar
          title={candidate.name}
          subtitle={subtitleToShow}
          source={candidate.image}
          onPress={onReadMorePress}
        />
        <TouchableWithoutFeedback onPress={onReadMorePress}>
          <View style={{ paddingBottom: setDataPadding(images[0], videoThumbnail) }}>
            {(typeof title === 'string' && title !== '') &&
              <Text style={styles.title}>{title}</Text>
            }
            {(typeof text === 'string' && text !== '') &&
              <TextWithReadMore
                style={styles.description}
                onPress={onReadMorePress}
                maxLength={textMaxLength}
                onLinkPress={goOgLink}
              >
                {text}
              </TextWithReadMore>
            }
            {hasImage &&
              <TouchableWithoutFeedback onPress={() => showGallery(images)}>
                <View style={imageThumbnailNotCropped ? styles.imageSquare : styles.image16per9}>
                  {imageThumbnailNotCropped &&
                    <ImageBackground
                      style={styles.imageBackdrop}
                      source={{ uri: images[0] }}
                      resizeMode="cover"
                      blurRadius={10}
                    >
                      <View style={styles.darkOverlay} />
                    </ImageBackground>
                  }
                  <FastImage
                    style={styles.image}
                    source={imageSource}
                    resizeMode={imageThumbnailNotCropped
                      ? FastImage.resizeMode.contain
                      : FastImage.resizeMode.cover
                    }
                  />
                  {(images.length > 1) && <ImagesLengthIndicator length={images.length} />}
                </View>
              </TouchableWithoutFeedback>
            }
            {/* {(ogLink) &&
              <OpenGraph
                link={ogLink}
                image={ogImage}
                title={ogTitle}
                description={ogDescription}
                onPress={goOgLink}
                pocket={isOgPocket}
              />
            } */}
          </View>
        </TouchableWithoutFeedback>
        <RowInteract
          like={like}
          comment={comment}
          share={share}
          hasMenu
          menu={{ onPress: () => showMenuModal(id) }}
        />
      </Card>
    )
  }
}

