import React, { Component } from 'react'
import { FlatList, Text, View, Alert } from 'react-native'

import { func, bool } from 'prop-types'
import {
  commentPropTypes,
  commentDefaultProps,
} from '../../shared/propTypes/commentPropTypes'

import { ButtonTextGray } from '../../shared/components/buttons'
import { CommentSubItem } from './commentSubItem'
import { IconButton } from '../../shared/components/iconButton'
import { RowAvatar, RowText } from '../../shared/components/rows'
import { CommentLikeButton } from '../../shared/components/commentLikeButton'
import { MenuModal } from '../../shared/components/modals'
import { styles } from './styles/post.style'
import { Colors, Metrics } from '../../../constants'


export class CommentItem extends Component {

  static defaultProps = {
    repliesEndReached: false,
    showMenu: () => { },
    onLikeCommentReplyPress: () => { },
    onUndoLikeCommentReplyPress: () => { },
    onLikeCommentPress: () => { },
    onUndoLikeCommentPress: () => { },
    onDeleteCommentReplyPress: () => { },
    onLoadRepliesPress: () => { },
    onReportCommentReplyPress: () => { },
    onReplyCommentPress: () => { },
    ...commentDefaultProps
  }

  static propTypes = {
    repliesEndReached: bool,
    showMenu: func,
    onLikeCommentReplyPress: func,
    onUndoLikeCommentReplyPress: func,
    onLikeCommentPress: func,
    onUndoLikeCommentPress: func,
    onDeleteCommentReplyPress: func,
    onLoadRepliesPress: func,
    onReportCommentReplyPress: func,
    onReplyCommentPress: func,
    ...commentPropTypes
  }

  state = {
    disableLike: false,
    disableCommentReplyLike: false,
    isMenuModalVisible: false,
    hasPermission: false
  }

  showMenuModal = (selectedId, author) => {
    const { activeUserId, activePageId } = this.props
    const hasPermission = (author._id === activeUserId) || (author._id === activePageId)
    this.setState({
      isMenuModalVisible: true,
      selectedId,
      hasPermission,
      author,
    })
  }
  hideMenuModal = () => this.setState({
    isMenuModalVisible: false,
    selectedId: undefined,
    hasPermission: false,
    author: {},
  })
  likeComment = async () => {
    this.setState({ disableLike: true })
    await this.props.onLikeCommentPress(this.props.postId, this.props.id)
    this.setState({ disableLike: false })
  }
  undoLikeComment = async () => {
    this.setState({ disableLike: true })
    await this.props.onUndoLikeCommentPress(this.props.postId, this.props.id)
    this.setState({ disableLike: false })
  }
  deleteCommentReply = () => {
    const replyId = this.state.selectedId
    this.hideMenuModal()
    setTimeout(() => {
      Alert.alert(
        'Deseja excluir comentário?',
        '',
        [
          { text: 'Manter', onPress: () => { }, style: 'cancel' },
          { text: 'Excluir', onPress: () => this.props.onDeleteCommentReplyPress(this.props.postId, this.props.id, replyId) },
        ],
        { cancelable: true }
      )
    }, 200)
  }
  onLoadReplies = () => {
    const { postId, id, replies } = this.props
    this.props.onLoadRepliesPress(postId, id, replies.length)
  }
  onReplyComment = () => {
    const { id, onReplyCommentPress, author } = this.props
    onReplyCommentPress(id, author)
  }
  likeCommentReply = async (replyId) => {
    this.setState({ disableCommentReplyLike: true })
    await this.props.onLikeCommentReplyPress(this.props.postId, this.props.id, replyId)
    this.setState({ disableCommentReplyLike: false })
  }
  undoLikeCommentReply = async (replyId) => {
    this.setState({ disableCommentReplyLike: true })
    await this.props.onUndoLikeCommentReplyPress(this.props.postId, this.props.id, replyId)
    this.setState({ disableCommentReplyLike: false })
  }
  reportCommentReply = () => {
    const replyId = this.state.selectedId
    this.hideMenuModal()
    this.props.onReportCommentReplyPress(replyId)
  }
  showCommentMenu = () => {
    this.props.showMenu(this.props.id, this.props.author)
  }
  reportCommentAuthor = () => {
    const commentAuthor = this.state.author
    this.hideMenuModal()
    if (commentAuthor.type === 'USER') {
      this.props.onReportUserPress(this.state.author._id)
    } else if (commentAuthor.type === 'PAGE') {
      this.props.onReportPagePress(this.state.author._id)
    }
  }

  renderSubComment = ({ item }) => {
    const {
      author,
      formatedDate,
      id,
      liked,
      likesCount,
      text,
      authorImage,
    } = item
    return (
      <CommentSubItem
        author={author}
        authorImage={authorImage}
        disableLike={this.state.disableCommentReplyLike}
        formatedDate={formatedDate}
        id={id}
        liked={liked}
        likesCount={likesCount}
        onLikePress={this.likeCommentReply}
        onUndoLikePress={this.undoLikeCommentReply}
        showMenu={this.showMenuModal}
        text={text}
      />
    )
  }

  renderFooter = () => {
    const {
      repliesCount,
      replies,
      repliesEndReached
    } = this.props
    const repliesCountToShow = repliesCount - replies.length
    const subtitle = `+${repliesCountToShow} respostas`
    if (repliesEndReached === false) {
      return (
        <RowText
          containerStyle={styles.loadSubCommentsRow}
          subtitle={subtitle}
          onPress={this.onLoadReplies}
          renderRight={<ButtonTextGray
            title="Carregar mais"
            onPress={this.onLoadReplies}
            textStyle={{ color: Colors.primary }}
          />}
        />
      )
    }
    return null
  }

  render() {
    const {
      author,
      formatedDate,
      liked,
      likesCount,
      replies,
      text,
      authorImage,
      repliesCount,
    } = this.props
    const { hasPermission } = this.state
    const modalButtons = hasPermission ? [
      { label: 'Excluir comentário', onPress: this.deleteCommentReply }
    ] :
      [
        { label: 'Reportar comentário', onPress: this.reportCommentReply },
        { label: 'Reportar usuário', onPress: this.reportCommentAuthor }
      ]
    const likePressAction = liked ? this.undoLikeComment : this.likeComment
    const extractKey = item => item.id
    return (
      <View>
        <View style={styles.wrap}>
          <View style={styles.avatarRow}>
            <RowAvatar
              avatarSize={Metrics.avatar.small}
              source={authorImage}
              subtitle={formatedDate}
              title={author.name}
              renderRight={
                <View style={styles.buttonWrap}>
                  <CommentLikeButton
                    isActive={liked}
                    number={likesCount}
                    disabled={this.state.disableLike}
                    onPress={likePressAction}
                  />
                  <IconButton
                    name="dots-horizontal"
                    dense
                    size={Metrics.icons.small}
                    onPress={this.showCommentMenu}
                    color={Colors.blackSecondary}
                    containerStyle={{ marginRight: Metrics.tinySpacing / 2 }}
                  />
                </View>
              }
            />
          </View>
          <Text style={styles.commentWithoutBottomMargin}>{text}</Text>
          <ButtonTextGray
            title="Responder"
            onPress={this.onReplyComment}
          />
        </View>
        {((repliesCount > 0)) &&
          <FlatList
            data={replies}
            inverted
            renderItem={this.renderSubComment}
            ListFooterComponent={this.renderFooter}
            keyExtractor={extractKey}
            extraData={this.state}
          />
        }
        <MenuModal
          buttons={modalButtons}
          onCancelPress={this.hideMenuModal}
          visible={this.state.isMenuModalVisible}
        />
      </View>
    )
  }
}
