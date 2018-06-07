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
  shape,
  string,
} from 'prop-types'
import { CustomTabs } from 'react-native-custom-tabs'

import { CardCreatePost } from '../../shared/components/cardCreatePost'
import { FeedCard } from './feedCard'
import { LoadingSpinner } from '../../shared/components/loadingSpinner'
import { ScreenWithScrollHOC } from '../../shared/components/hoc/screenWithScrollHOC'
import { StatusBarStandard } from '../../shared/components/statusBarStandard'

import { styles } from './styles/feed.style'
import { Metrics, Colors } from '../../../constants'
import { feedItemProps } from '../../shared/propTypes/feedPropTypes'
import { MenuModal, ImagesGallery } from '../../shared/components/modals'
import { SHARE_MESSAGE, POST_REQUEST_FAIL } from '../../../constants/messages'

const Container = ScreenWithScrollHOC(View)

export class Feed extends Component {
  static defaultProps = {
    activeUserId: undefined,
    feed: [],
    hasPostsEndReached: false,
    isAdmin: false,
    isLoadingPosts: false,
    isAuthenticated: false,
    onCommentPress: () => { },
    onDeletePress: () => { },
    onLoadMorePosts: () => { },
    onNewPostPress: () => {},
    onRefreshPosts: () => { },
    onReportPress: () => { },
    onSharePress: () => { },
    onReadMorePress: () => { },
  }

  static propTypes = {
    activeUserId: string,
    feed: arrayOf(shape(feedItemProps)),
    hasPostsEndReached: bool,
    isAdmin: bool,
    isLoadingPosts: bool,
    isAuthenticated: bool,
    onCommentPress: func,
    onDeletePress: func,
    onLoadMorePosts: func,
    onNewPostPress: func,
    onRefreshPosts: func,
    onReportPress: func,
    onSharePress: func,
    onReadMorePress: func,
  }

  state = {
    isRendering: true,
    isMenuModalVisible: false,
    isGalleryVisible: false,
    refreshing: false,
    disableLike: false,
    images: [],
  }

  componentDidMount = () => InteractionManager.runAfterInteractions(() => this.setState({ isRendering: false }))

  showMenuModal = (selectedId, authorId) => this.setState({ isMenuModalVisible: true, selectedId, authorId })
  hideMenuModal = () => this.setState({ isMenuModalVisible: false, selectedId: undefined, authorId: undefined })
  showGallery = images => this.setState({ images, isGalleryVisible: true })
  hideGallery = () => this.setState({ isGalleryVisible: false, images: [] })
  report = () => {
    this.props.onReportPress(this.state.selectedId)
    this.hideMenuModal()
  }
  delete = () => {
    const postId = this.state.selectedId
    this.hideMenuModal()
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
      isAuthenticated,
      onNewPostPress,

    } = this.props
    return (
      isAuthenticated
        ? <CardCreatePost onPress={onNewPostPress} />
        : <View style={styles.headerSpacing} />
    )
  }

  flatItem = ({ item }) => {
    return (
      (item.status !== 'DRAFT') &&
      <FeedCard
        onPositivePress={this.props.onPositivePress}
        onNegativePress={this.props.onNegativePress}
        votedNegative={item.votedNegative}
        votedPositive={item.votedPositive}
        karma={item.karma}
        isAuthenticated={this.props.isAuthenticated}
        authorId={item.authorId}
        user={item.user}
        activeUserId={this.props.user.id}
        anonymus={item.anonymus}
        commentCount={item.commentCount}
        comments={item.comments}
        formatedDate={item.formatedDate}
        placeDescription={item.placeDescription}
        onPlacePress={this.props.onPlacePress}
        id={item.id}
        images={item.images}
        interactions={this.formatInteractions(item)}
        isAdmin={this.props.isAdmin}
        isOgPocket
        liked={item.liked}
        likes={item.likes}
        og={item.og}
        onReadMorePress={() => this.props.onReadMorePress(item)}
        post={item}
        shareCount={item.shareCount}
        showGallery={this.showGallery}
        showMenuModal={this.showMenuModal}
        status={item.status}
        text={item.body}
        title={item.title}
        type={item.type}
        contentType={item.contentType}
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
    const modalButtons = (this.props.user.id === this.state.authorId)
      ? [
        // { label: 'Reportar publicação', onPress: this.report },
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
          </View>
        }
      </Container>
    )
  }
}
