import React, { Component } from 'react'
import { connect } from 'react-redux'

import { bool, func, shape, string, array, object } from 'prop-types'

import { Post } from '../components/post'
import {
  getPost,
  getLoadingComments,
  getComments,
  getCommentsEndReached,
  getCommenting
} from '../../../redux/reducers/post/selectors'
import { clearPost } from '../../../redux/actions/sync/postSyncActions'
import { getPostAction } from '../../../redux/actions/async/postAsyncActions'
import { Values } from '../../../constants'
import { getUser } from '../../../redux/reducers/authentication/selectors'

class PostScreenContainer extends Component {
  static navigationOptions = () => ({
    ...Values.navbarStyles.primary,
  })

  static defaultProps = {
    navigation: {},
    fetchPost: () => { },
    user: { id: '', isAdmin: false },
    commenting: false,
    post: {},
    clearPostState: () => { },
    likePost: () => { },
    undoLikePost: () => { },
    sharePost: () => { },
    reportPost: () => { },
    deletePost: () => { },
    followPage: () => { },
    comments: [],
    getMoreComments: () => { },
    publishComment: () => { },
    loadingComments: false,
    commentsEndReached: false,
    likeComment: () => { },
    undoLikeComment: () => { },
    reportComment: () => { },
    deleteComment: () => { },
    fetchComments: () => { },
    getReplies: () => { },
    addCommentReply: () => { },
    likeCommentReply: () => { },
    undoLikeCommentReply: () => { },
    reportCommentReply: () => { },
    deleteCommentReply: () => { },
    reportUser: () => { },
    reportPage: () => { },
  }

  static propTypes = {
    navigation: object,
    fetchPost: func,
    user: shape({ id: string, isAdmin: bool }),
    commenting: bool,
    post: object,
    clearPostState: func,
    likePost: func,
    undoLikePost: func,
    sharePost: func,
    reportPost: func,
    deletePost: func,
    followPage: func,
    comments: array,
    getMoreComments: func,
    publishComment: func,
    loadingComments: bool,
    commentsEndReached: bool,
    likeComment: func,
    undoLikeComment: func,
    reportComment: func,
    deleteComment: func,
    fetchComments: func,
    getReplies: func,
    addCommentReply: func,
    likeCommentReply: func,
    undoLikeCommentReply: func,
    reportCommentReply: func,
    deleteCommentReply: func,
    reportUser: func,
    reportPage: func,
  }

  componentDidMount = () => {
    const { params = {} } = this.props.navigation.state
    const { post = {} } = params
    this.props.fetchPost(post.id)
  }

  componentWillUnmount = () => this.props.clearPostState()

  render() {
    return (
      <Post
        autofocusInput={this.props.commenting}
        // activeUserId={this.props.user.id}
        // activePageId={this.props.user.pageAdmin.id}
        // isAdmin={this.props.user.isAdmin}
        post={this.props.post}
        onLikePress={this.props.likePost}
        onUndoLikePress={this.props.undoLikePost}
        onSharePress={this.props.sharePost}
        onReportPress={this.props.reportPost}
        onDeletePress={this.props.deletePost}
        onFollowPage={this.props.followPage}
        comments={this.props.comments}
        onPublishCommentPress={this.props.publishComment}
        loadingComments={this.props.loadingComments}
        commentsEndReached={this.props.commentsEndReached}
        onLoadMoreComments={this.props.getMoreComments}
        onLikeCommentPress={this.props.likeComment}
        onUndoLikeCommentPress={this.props.undoLikeComment}
        onReportCommentPress={this.props.reportComment}
        onDeleteCommentPress={this.props.deleteComment}
        onLoadSortedComments={this.props.fetchComments}
        onLoadRepliesPress={this.props.getReplies}
        onReplyCommentPress={this.props.addCommentReply}
        onLikeCommentReplyPress={this.props.likeCommentReply}
        onUndoLikeCommentReplyPress={this.props.undoLikeCommentReply}
        onReportCommentReplyPress={this.props.reportCommentReply}
        onDeleteCommentReplyPress={this.props.deleteCommentReply}
        navigation={this.props.navigation}
        onCandidatePress={this.navigateToPage}
        onReportUserPress={this.props.reportUser}
        onReportPagePress={this.props.reportPage}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  commenting: getCommenting(state),
  post: getPost(state),
  comments: getComments(state),
  loadingComments: getLoadingComments(state),
  commentsEndReached: getCommentsEndReached(state),
})

const mapDispatchToProps = dispatch => ({
  clearPostState: () => dispatch(clearPost()),
  fetchPost: postId => dispatch(getPostAction(postId))
})

export const PostScreen = connect(mapStateToProps, mapDispatchToProps)(PostScreenContainer)
