import React, { Component } from 'react'
import {
  Alert,
  InteractionManager,
  Platform,
  ScrollView,
  Share,
} from 'react-native'
import {
  array,
  bool,
  func,
  shape,
  string,
  object,
} from 'prop-types'
import { CustomTabs } from 'react-native-custom-tabs'

import { feedItemProps } from '../../shared/propTypes/feedPropTypes'

import { CommentList } from './commentList'
import { FeedCard } from './feedCard'
import { MenuModal, ImagesGallery } from '../../shared/components/modals'
import { InputFooter } from '../../shared/components/inputs'
import { ViewHandlingKeyboard } from '../../shared/components/viewHandlingKeyboard'

import { SHARE_MESSAGE, POST_REQUEST_FAIL, COMMENT_REPORT_SUCCESS, POST_REPORT_SUCCESS } from '../../../constants/messages'
import { styles } from './styles/post.style'
import { Colors } from '../../../constants'

export class Post extends Component {

  static defaultProps = {
    navigation: {},
    post: {},
    activeUserId: undefined,
    activePageId: undefined,
    autofocusInput: false,
    comments: [],
    commentsEndReached: false,
    isAdmin: false,
    loadingComments: false,
    onDeleteCommentPress: () => { },
    onDeletePress: () => { },
    onLikeCommentPress: () => { },
    onLikePress: () => { },
    onLoadMoreComments: () => { },
    onPublishCommentPress: () => { },
    onReportCommentPress: () => { },
    onReportPress: () => { },
    onSharePress: () => { },
    onUndoLikeCommentPress: () => { },
    onUndoLikePress: () => { },
    onLoadRepliesPress: () => { },
    onReplyCommentPress: () => { },
    onLikeCommentReplyPress: () => { },
    onUndoLikeCommentReplyPress: () => { },
    onReportCommentReplyPress: () => { },
    onDeleteCommentReplyPress: () => { },
    onCandidatePress: () => { },
    onReportUserPress: () => { },
    onReportPagePress: () => { },
  }

  static propTypes = {
    navigation: object,
    post: shape(feedItemProps),
    activeUserId: string,
    activePageId: string,
    autofocusInput: bool,
    comments: array,
    commentsEndReached: bool,
    isAdmin: bool,
    loadingComments: bool,
    onDeleteCommentPress: func,
    onDeletePress: func,
    onLikeCommentPress: func,
    onLikePress: func,
    onLoadMoreComments: func,
    onPublishCommentPress: func,
    onReportCommentPress: func,
    onReportPress: func,
    onSharePress: func,
    onUndoLikeCommentPress: func,
    onUndoLikePress: func,
    onLoadRepliesPress: func,
    onReplyCommentPress: func,
    onLikeCommentReplyPress: func,
    onUndoLikeCommentReplyPress: func,
    onReportCommentReplyPress: func,
    onDeleteCommentReplyPress: func,
    onCandidatePress: func,
    onReportUserPress: func,
    onReportPagePress: func,
  }

  state = {
    disableLike: false,
    images: [],
    isGalleryVisible: false,
    isMenuModalVisible: false,
    isRendering: true,
    replyingTo: '',
    isReplying: false,
  }

  componentDidMount = () => InteractionManager.runAfterInteractions(() => this.setState({ isRendering: false }))

  showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })

  showMenuModal = () => this.setState({ isMenuModalVisible: true })
  hideMenuModal = () => this.setState({ isMenuModalVisible: false })

  showGallery = images => this.setState({ images, isGalleryVisible: true })
  hideGallery = () => this.setState({ isGalleryVisible: false, images: [] })

  formatInteractions = () => {
    const { activeUserId } = this.props
    const { post } = this.props

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
        onPress: () => this.commentInput.focus()
      },
      share: {
        number: post.shareCount,
        onPress: () => this.onSharePress(post.id)
      },
    }
    return interactions
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
  reportPost = () => {
    // this.props.onReportPress(this.props.post.id)
    this.hideMenuModal()
    setTimeout(() => {
      Alert.alert('Postagem reportada', POST_REPORT_SUCCESS, [{ text: 'OK', onPress: () => { } }], { cancelable: true })
    }, 200)
  }
  deletePost = () => {
    this.hideMenuModal()
    setTimeout(() => {
      Alert.alert(
        'Excluir postagem',
        'Deseja excluir esta publicação?',
        [
          { text: 'Manter', onPress: () => { }, style: 'cancel' },
          { text: 'Excluir', onPress: () => this.props.onDeletePress(this.props.post.id, this.props.navigation) },
        ],
        { cancelable: true }
      )
    }, 200)
  }
  openLink = (url) => {
    try {
      const link = ((url.indexOf('http')) > -1) ? url : `http://${url}`
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
  publishComment = (text) => {
    if (this.state.isReplying === false) {
      this.props.onPublishCommentPress(this.props.post.id, text)
    } else {
      this.props.onReplyCommentPress(this.props.post.id, this.state.selectedCommentId, text)
      this.clearReplyingTo()
    }
  }
  fetchMoreComments = (skip, sort) => this.props.onLoadMoreComments(this.props.post.id, skip, sort)
  reportComment = async (commentId) => {
    // await this.props.onReportCommentPress(this.props.post.id, commentId)
    Alert.alert('Comentário reportado', COMMENT_REPORT_SUCCESS, [{ text: 'OK', onPress: () => { } }], { cancelable: true })
  }
  deleteComment = commentId => this.props.onDeleteCommentPress(this.props.post.id, commentId)
  onReplyComment = (commentId, commentAuthor) => {
    this.setState({ replyingTo: commentAuthor.name, isReplying: true, selectedCommentId: commentId })
    this.commentInput.focus()
  }
  reportCommentReply = async (replyId) => {
    await this.props.onReportCommentReplyPress(this.props.post.id, replyId)
    Alert.alert('Comentário reportado', COMMENT_REPORT_SUCCESS, [{ text: 'OK', onPress: () => { } }], { cancelable: true })
  }
  clearReplyingTo = () => this.setState({ replyingTo: '', isReplying: false, selectedCommentId: '' })

  render() {
    const {
      autofocusInput,
      comments,
      post,
    } = this.props
    // console.log(post)
    // const isAdmin = this.props.post.user.id === this.props.activePageId
    const modalButtons = (this.props.user.id === post.authorId) ?
      [
        { label: 'Excluir publicação', onPress: this.deletePost }
      ] :
      [
        { label: 'Reportar publicação', onPress: this.reportPost },
        // { label: 'Reportar usuário', onPress: this.reportPage }
      ]

    return (
      <ViewHandlingKeyboard style={styles.container}>
        <ScrollView>
          <FeedCard
            onPositivePress={this.props.onPositivePress}
            onNegativePress={this.props.onNegativePress}
            votedNegative={post.votedNegative}
            votedPositive={post.votedPositive}
            karma={post.karma}
            activeUserId={this.props.user.id}
            anonymus={post.anonymus}
            audio={post.audio}
            authorId={post.authorId}
            user={post.user}
            placeDescription={post.placeDescription}
            commentCount={post.commentCount}
            comments={post.comments}
            formatedDate={post.formatedDate}
            goOgLink={this.openLink}
            id={post.id}
            images={post.images}
            interactions={this.formatInteractions()}
            isAdmin={this.props.isAdmin}
            isExclusive={post.membersOnly}
            liked={post.liked}
            likes={post.likes}
            og={post.og}
            onFollowPress={this.followPage}
            onVideoPress={this.showVideoModal}
            origin={post.origin}
            post={post}
            shareCount={post.shareCount}
            showGallery={this.showGallery}
            showMenuModal={this.showMenuModal}
            status={post.status}
            text={post.body}
            textMaxLength={0}
            title={post.title}
            type={post.type}
            contentType={post.contentType}
            video={post.video}
            videoThumbnail={post.videoThumbnail}
            onHeaderPress={this.props.onCandidatePress}
          />
          {(this.state.isRendering === false) &&
            <CommentList
              postId={post.id}
              activeUserId={this.props.activeUserId}
              activePageId={this.props.activePageId}
              commentCount={post.commentCount}
              comments={comments}
              commentsEndReached={this.props.commentsEndReached}
              isAdmin={this.props.isAdmin}
              loadingComments={this.props.loadingComments}
              onDeleteCommentPress={this.deleteComment}
              onLikeCommentPress={this.props.onLikeCommentPress}
              onUndoLikeCommentPress={this.props.onUndoLikeCommentPress}
              onReportCommentPress={this.reportComment}
              onLoadMoreComments={this.fetchMoreComments}
              onLoadRepliesPress={this.props.onLoadRepliesPress}
              onReplyCommentPress={this.onReplyComment}
              onLikeCommentReplyPress={this.props.onLikeCommentReplyPress}
              onUndoLikeCommentReplyPress={this.props.onUndoLikeCommentReplyPress}
              onReportCommentReplyPress={this.reportCommentReply}
              onDeleteCommentReplyPress={this.props.onDeleteCommentReplyPress}
              onReportUserPress={this.props.onReportUserPress}
              onReportPagePress={this.props.onReportPagePress}
            />
          }

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
        </ScrollView>
        <InputFooter
          replyingTo={this.state.replyingTo}
          onDismissReplyPress={this.clearReplyingTo}
          autoFocus={autofocusInput}
          onSubmit={this.publishComment}
          placeholder="Comentar"
          ref={(input) => { this.commentInput = input }}
        />
      </ViewHandlingKeyboard>
    )
  }
}
