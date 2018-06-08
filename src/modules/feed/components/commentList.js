import React, { Component } from 'react'
import { View, FlatList, InteractionManager, Text, Alert } from 'react-native'
import { shape, string, bool, number, arrayOf, func } from 'prop-types'

import { Card } from '../../shared/components/card'
import { CommentItem } from './commentItem'
import { CommentListHeader } from './commentListHeader'
import { LoadingSpinner } from '../../shared/components/loadingSpinner'
import { MenuModal } from '../../shared/components/modals/menuModal'
import { Touchable } from '../../shared/components/touchable'

import { styles } from './styles/post.style'
import { Colors } from '../../../constants'

const commentProps = {
  author: shape({ name: string }),
  formatedDate: string,
  liked: bool,
  likesCount: number,
  text: string
}
const commentDefault = {
  author: {},
  formatedDate: '',
  liked: false,
  likesCount: 0,
  text: ''
}


export class CommentList extends Component {

  static defaultProps = {
    activeUserId: undefined,
    activePageId: undefined,
    commentCount: 0,
    comments: [commentDefault],
    commentsEndReached: false,
    isAdmin: false,
    loadingComments: false,
    postId: '',
    onDeleteCommentPress: () => { },
    onLikeCommentPress: () => { },
    onUndoLikeCommentPress: () => { },
    onReportCommentPress: () => { },
    onLoadMoreComments: () => { },
    onLoadRepliesPress: () => { },
    onReplyCommentPress: () => { },
    onLikeCommentReplyPress: () => { },
    onUndoLikeCommentReplyPress: () => { },
    onReportCommentReplyPress: () => { },
    onDeleteCommentReplyPress: () => { },
    onReportUserPress: () => { },
    onReportPagePress: () => { },
  }

  static propTypes = {
    activeUserId: string,
    activePageId: string,
    commentCount: number,
    comments: arrayOf(shape(commentProps)),
    commentsEndReached: bool,
    isAdmin: bool,
    loadingComments: bool,
    postId: string,
    onDeleteCommentPress: func,
    onLikeCommentPress: func,
    onUndoLikeCommentPress: func,
    onReportCommentPress: func,
    onLoadMoreComments: func,
    onLoadRepliesPress: func,
    onReplyCommentPress: func,
    onLikeCommentReplyPress: func,
    onUndoLikeCommentReplyPress: func,
    onReportCommentReplyPress: func,
    onDeleteCommentReplyPress: func,
    onReportUserPress: func,
    onReportPagePress: func,
  }

  state = {
    loading: true,
    isMenuModalVisible: false,
    selectedId: undefined,
    hasPermission: false,
  }

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => this.setState({ loading: false }))
  }

  setSortText = (sort) => {
    switch (sort) {
      case 'DATE':
        return 'Mais recentes'
      case 'LIKES':
        return 'Mais populares'
      default:
        return 'Mais recentes'
    }
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
  reportComment = () => {
    const commentId = this.state.selectedId
    this.hideMenuModal()
    this.props.onReportCommentPress(commentId)
  }
  deleteComment = () => {
    const commentId = this.state.selectedId
    this.hideMenuModal()
    setTimeout(() => {
      Alert.alert(
        'Deseja excluir comentário?',
        '',
        [
          { text: 'Manter', onPress: () => { }, style: 'cancel' },
          { text: 'Excluir', onPress: () => this.props.onDeleteCommentPress(commentId) },
        ],
        { cancelable: true }
      )
    }, 200)
  }
  loadMore = () => {
    const {
      comments, commentsEndReached, loadingComments, onLoadMoreComments
    } = this.props
    if ((comments.length > 0) && (commentsEndReached === false) && (loadingComments === false)) {
      onLoadMoreComments(comments.length)
    }
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

  renderComment = ({ item }) => {
    const {
      author,
      formatedDate,
      id,
      liked,
      likesCount,
      subComments,
      text,
      authorImage,
      repliesCount,
      replies,
      repliesEndReached,
    } = item
    return (
      <CommentItem
        postId={this.props.postId}
        author={author}
        authorImage={authorImage}
        formatedDate={formatedDate}
        id={id}
        liked={liked}
        likesCount={likesCount}
        onLikeCommentPress={this.props.onLikeCommentPress}
        onUndoLikeCommentPress={this.props.onUndoLikeCommentPress}
        onReplyCommentPress={this.props.onReplyCommentPress}
        onLikeCommentReplyPress={this.props.onLikeCommentReplyPress}
        onUndoLikeCommentReplyPress={this.props.onUndoLikeCommentReplyPress}
        onReportCommentReplyPress={this.props.onReportCommentReplyPress}
        showMenu={this.showMenuModal}
        subComments={subComments}
        text={text}
        repliesCount={repliesCount}
        replies={replies}
        onLoadRepliesPress={this.props.onLoadRepliesPress}
        repliesEndReached={repliesEndReached}
        activeUserId={this.props.activeUserId}
        activePageId={this.props.activePageId}
        isAdmin={this.props.isAdmin}
        onDeleteCommentReplyPress={this.props.onDeleteCommentReplyPress}
      />
    )
  }

  renderFooter = () => {
    if (this.props.loadingComments) {
      return this.renderLoading()
    } else if ((!this.props.loadingComments) && (!this.props.commentsEndReached)) {
      return (
        <Touchable style={styles.loadMore} borderless onPress={this.loadMore}>
          <Text style={styles.loadMoreText}>CARREGAR MAIS COMENTÁRIOS</Text>
        </Touchable>
      )
    }
    return null
  }

  renderLoading = () => {
    return <View style={styles.loadingContainer}><LoadingSpinner spinnerColor={Colors.primary} /></View>
  }

  render() {
    const extractKey = item => item.id
    const { comments, commentCount } = this.props
    const { hasPermission } = this.state
    const modalButtons = hasPermission ? [
      { label: 'Excluir comentário', onPress: this.deleteComment }
    ] :
      [
        { label: 'Reportar comentário', onPress: this.reportComment },
        { label: 'Reportar usuário', onPress: this.reportCommentAuthor }
      ]

    return (
      (comments.length > 0) &&
      <Card>
        <CommentListHeader commentCount={comments.length} />
        {
          this.state.loading ? this.renderLoading()
            : <FlatList
              data={comments}
              extraData={this.state}
              renderItem={this.renderComment}
              keyExtractor={extractKey}
              ListFooterComponent={this.renderFooter}
            />
        }
        <MenuModal
          buttons={modalButtons}
          onCancelPress={this.hideMenuModal}
          visible={this.state.isMenuModalVisible}
        />
      </Card>
    )
  }
}
