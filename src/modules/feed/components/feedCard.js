import React, { Component } from 'react'
import { Text, View, TouchableWithoutFeedback, ImageBackground } from 'react-native'

import { number } from 'prop-types'
import FastImage from 'react-native-fast-image'

import { Card } from '../../shared/components/card'
import { RowAvatar, RowInteract } from '../../shared/components/rows'
import { TextWithReadMore } from '../../shared/components/textWithReadMore'
import { Icon } from '../../shared/components/icon'
import { Touchable } from '../../shared/components/touchable'

import { Metrics, Colors } from '../../../constants'
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
    if (this.props.karma !== nextProps.karma) {
      return true
    }
    if (this.props.votedNegative !== nextProps.votedNegative) {
      return true
    }
    if (this.props.votedPositive !== nextProps.votedPositive) {
      return true
    }
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
      user,
      authorId,
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
      placeDescription,
      onPlacePress,
      activeUserId,
      anonymus,
      isAuthenticated,
      karma,
      votedNegative,
      votedPositive,
      onPositivePress,
      onNegativePress,
    } = this.props
    const hasImage = (images.length > 0)
    const imageSource = (hasImage) ? { uri: images[0], priority: FastImage.priority.normal } : {}
    const subtitleToShow = `${contentType} - ${formatedDate}`
    const userName = ((anonymus) || (!isAuthenticated)) && (authorId !== activeUserId) ? 'Anônimo' : user.name
    const userImage = ((anonymus) || (!isAuthenticated)) && (authorId !== activeUserId) ? '' : user.image
    return (
      <Card style={styles.card}>
        <RowAvatar
          title={userName}
          subtitle={subtitleToShow}
          source={userImage}
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
            <Touchable onPress={onPlacePress} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                style={styles.icon}
                color={Colors.blackSecondary}
                name="map-marker"
                dense
                size={Metrics.icons.small}
              />
              <Text>{placeDescription}</Text>
            </Touchable>
          </View>
        </TouchableWithoutFeedback>
        <RowInteract
          karma={karma}
          onPositivePress={onPositivePress}
          onNegativePress={onNegativePress}
          votedNegative={votedNegative}
          votedPositive={votedPositive}
          like={like}
          comment={comment}
          share={share}
          hasMenu
          postId={id}
          menu={{ onPress: () => showMenuModal(id, authorId) }}
        />
      </Card>
    )
  }
}

