import React, { Component } from 'react'
import {
  Alert,
  FlatList,
  InteractionManager,
  Platform,
  RefreshControl,
  View,
  Share,
} from 'react-native'
import {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} from 'prop-types'
import { CustomTabs } from 'react-native-custom-tabs'

import { CardCreatePost } from '../../shared/components/cardCreatePost'
import { FeedCard } from './feedCard'
import { LoadingSpinner } from '../../shared/components/loadingSpinner'
import { PublishingPostCard } from '../../shared/components/publishingPostCard'
import { ScreenWithScrollHOC } from '../../shared/components/hoc/screenWithScrollHOC'
import { StatusBarStandard } from '../../shared/components/statusBarStandard'

import { styles } from './styles/feed.style'
import { Metrics, Colors } from '../../../constants'
import { feedItemProps } from '../../shared/propTypes/feedPropTypes'
import { MenuModal, VideoModal, ImagesGallery } from '../../shared/components/modals'
import { SHARE_MESSAGE, POST_REQUEST_FAIL } from '../../../constants/messages'

const Container = ScreenWithScrollHOC(View)

export class Feed extends Component {
  static defaultProps = {
    activeUserId: undefined,
    feed: [],
    hasPostsEndReached: false,
    onCommentPress: () => { },
    onDeletePress: () => { },
    onLoadMorePosts: () => { },
    onRefreshPosts: () => { },
    onReportPress: () => { },
    onSharePress: () => { },
    uploadingImage: false,
    videoUploading: {
      data: {},
      uploading: false,
    },
    onReadMorePress: () => { },
    onFollowPage: () => { },
  }

  static propTypes = {
    activeUserId: string,
    feed: arrayOf(shape(feedItemProps)),
    hasPostsEndReached: bool,
    isAdmin: bool.isRequired,
    isLoadingPosts: bool.isRequired,
    onCommentPress: func,
    onDeletePress: func,
    onLoadMorePosts: func,
    onNewPostPress: func.isRequired,
    onRefreshPosts: func,
    onReportPress: func,
    onSharePress: func,
    uploadingImage: bool,
    videoUploading: shape({
      data: shape({
        bytes: number,
        totalBytes: number,
      }),
      uploading: bool,
    }),
    onReadMorePress: func,
    onFollowPage: func,
  }

  state = {
    isRendering: true,
    isMenuModalVisible: false,
    isGalleryVisible: false,
    refreshing: false,
    disableLike: false,
    images: [],
    video: { uri: '' },
    isModalVisible: false,
  }

  componentDidMount = () => InteractionManager.runAfterInteractions(() => this.setState({ isRendering: false }))

  showMenuModal = selectedId => this.setState({ isMenuModalVisible: true, selectedId })
  hideMenuModal = () => this.setState({ isMenuModalVisible: false, selectedId: undefined })
  showGallery = images => this.setState({ images, isGalleryVisible: true })
  hideGallery = () => this.setState({ isGalleryVisible: false, images: [] })
  showVideoModal = (video) => {
    setTimeout(() => this.videoModal.activateImmersion(), 2000)
    this.setState({ isModalVisible: true, video: { uri: video } })
  }
  hideVideoModal = () => this.setState({ isModalVisible: false, video: { uri: '' } })
  report = () => {
    this.props.onReportPress(this.state.selectedId)
    this.hideMenuModal()
  }
  delete = () => {
    this.hideMenuModal()
    const postId = this.state.selectedId
    setTimeout(() => {
      Alert.alert(
        'Excluir postagem',
        'Deseja excluir esta publicação?',
        [
          { text: 'Manter', onPress: () => { }, style: 'cancel' },
          { text: 'Excluir', onPress: () => this.props.onDeletePress(postId) },
        ],
        { cancelable: true }
      )
    }, 200)
  }
  loadMore = () => {
    const {
      feed, hasPostsEndReached, isLoadingPosts, onLoadMorePosts
    } = this.props
    if ((feed.length > 0) && (hasPostsEndReached === false) && (isLoadingPosts === false)) {
      onLoadMorePosts(feed.length)
    }
  }
  onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.onRefreshPosts()
    this.setState({ refreshing: false })
  }
  likePost = async (postId) => {
    const { activeUserId, onLikePress } = this.props
    this.setState({ disableLike: true })
    await onLikePress(postId, activeUserId)
    this.setState({ disableLike: false })
  }
  undoLikePost = async (postId) => {
    const { activeUserId, onUndoLikePress } = this.props
    this.setState({ disableLike: true })
    await onUndoLikePress(postId, activeUserId)
    this.setState({ disableLike: false })
  }
  onSharePress = async (postId) => {
    try {
      const sharedPost = await this.props.onSharePress(postId)
      Share
        .share(
          {
            ...Platform.select({
              ios: {
                message: `${SHARE_MESSAGE}`,
                url: sharedPost.url,
              },
              android: {
                message: `${SHARE_MESSAGE} ${sharedPost.url}`
              }
            }),
            title: 'FanApp',
          },
          {
            ...Platform.select({
              ios: {
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToTwitter'
                ]
              },
              android: {
                dialogTitle: 'Compartilhar FanApp '
              }
            })
          }
        )
    } catch (error) {
      Alert.alert('Erro ao compartilhar', POST_REQUEST_FAIL('compartilhar'), [{ text: 'OK', onPress: () => { } }], { cancelable: true })
    }
  }
  openLink = (url) => {
    try {
      const link = (url.startsWith('http')) ? url : `http://${url}`
      CustomTabs.openURL(link, {
        toolbarColor: Colors.primary,
        enableUrlBarHiding: true,
        showPageTitle: true,
        enableDefaultShare: true,
      }).then(() => {
      }).catch(() => { })
    } catch (error) {
      alert('Erro ao abrir link')
    }
  }
  followPage = (post) => {
    const { id, candidate } = post
    this.props.onFollowPage(candidate.id, id)
  }
  formatInteractions = (post) => {
    const { activeUserId, onCommentPress } = this.props

    const buttonLikeAction = post.liked ? () => this.undoLikePost(post.id, activeUserId) : () => this.likePost(post.id, activeUserId)
    const interactions = {
      like: {
        isActive: post.liked,
        number: post.likesCount,
        onPress: buttonLikeAction,
        disabled: this.state.disableLike,
      },
      comment: {
        number: post.commentCount,
        onPress: () => onCommentPress(post)
      },
      share: {
        number: post.shareCount,
        onPress: () => this.onSharePress(post.id)
      },
    }
    return interactions
  }

  extractKey = item => item.id

  renderHeader = () => {
    const {
      isAdmin,
      onNewPostPress,
      uploadingImage,
      videoUploading
    } = this.props

    if ((uploadingImage || videoUploading.uploading)) {
      return (
        <PublishingPostCard
          uploadingImage={uploadingImage}
          videoUploading={videoUploading}
        />
      )
    }

    return (
      isAdmin
        ? <CardCreatePost onPress={onNewPostPress} />
        : <View style={styles.headerSpacing} />
    )
  }

  flatItem = ({ item }) => {
    return (
      (item.status !== 'DRAFT') &&
      <FeedCard
        // isSubscriber={this.props.isSubscriber}
        // onReadMorePress={() => this.props.onReadMorePress(item)}
        audio={item.audio}
        authorId={item.authorId}
        candidate={item.candidate}
        commentCount={item.commentCount}
        comments={item.comments}
        formatedDate={item.formatedDate}
        goOgLink={this.openLink}
        id={item.id}
        images={item.images}
        interactions={this.formatInteractions(item)}
        isAdmin={this.props.isAdmin}
        isOgPocket
        liked={item.liked}
        likes={item.likes}
        og={item.og}
        onFollowPress={() => alert('onFollowPress')}
        onReadMorePress={() => this.props.onReadMorePress(item)}
        onVideoPress={() => this.showVideoModal(item.video)}
        origin={item.origin}
        post={item}
        shareCount={item.shareCount}
        showGallery={this.showGallery}
        showMenuModal={this.showMenuModal}
        status={item.status}
        text={item.body}
        title={item.title}
        type={item.type}
        video={item.video}
        videoThumbnail={item.videoThumbnail}
      />
    )
  }

  renderFooter = () => {
    return (
      <View style={styles.loadingContainer}>
        {
          this.props.isLoadingPosts &&
          <LoadingSpinner spinnerColor={Colors.primary} spinnerSize="small" />
        }
      </View>
    )
  }

  render() {
    const modalButtons = this.props.isAdmin
      ? [
        { label: 'Reportar publicação', onPress: this.report },
        { label: 'Excluir publicação', onPress: this.delete }
      ] :
      [
        { label: 'Reportar publicação', onPress: this.report },
      ]
    return (
      <Container>
        <StatusBarStandard />
        {(this.state.isRendering === false) &&
          <View>
            <FlatList
              removeClippedSubviews={Platform.OS !== 'ios'}
              contentContainerStyle={{ paddingBottom: Metrics.smallSpacing }}
              data={this.props.feed}
              keyExtractor={this.extractKey}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              extraData={this.state}
              onEndReached={this.loadMore}
              onEndReachedThreshold={(Platform.OS === 'ios') ? 0 : 1}
              refreshControl={
                <RefreshControl
                  colors={[Colors.primary]}
                  onRefresh={this.onRefresh}
                  refreshing={this.state.refreshing}
                  tintColor={Colors.primary}
                  title="Atualizar mural"
                  titleColor={Colors.blackSecondaryAlt}
                />
              }
              renderItem={this.flatItem}
            />

            <MenuModal
              buttons={modalButtons}
              onCancelPress={this.hideMenuModal}
              visible={this.state.isMenuModalVisible}
            />
            <ImagesGallery
              closeGallery={this.hideGallery}
              images={this.state.images}
              isVisible={this.state.isGalleryVisible}
            />
            <VideoModal
              ref={(ref) => { this.videoModal = ref }}
              visible={this.state.isModalVisible}
              video={this.state.video}
              hideModal={this.hideVideoModal}
            />
          </View>
        }
      </Container>
    )
  }
}
