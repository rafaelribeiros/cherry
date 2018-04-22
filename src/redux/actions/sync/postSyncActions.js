import {
  FETCH_POST,
  LIKE_POST_SUCCESS,
  UNDO_LIKE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  SHARE_POST_SUCCESS,
  LOADING_COMMENTS,
  FETCH_COMMENTS,
  FETCH_MORE_COMMENTS,
  PUBLISH_COMMENT_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  UNDO_LIKE_COMMENT_SUCCESS,
  EDIT_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  CLEAR_POST,
  FETCH_COMMENT_REPLIES,
  ADD_COMMENT_REPLY,
  FOLLOW_PAGE_ON_POST_SUCCESS,
  LIKE_COMMENT_REPLY_SUCCESS,
  UNDO_LIKE_COMMENT_REPLY_SUCCESS,
  DELETE_COMMENT_REPLY_SUCCESS,
} from '../../types/postTypes'

export const fetchPost = (post, commenting) => ({ type: FETCH_POST, post, commenting })
export const likePostSuccess = postId => ({ type: LIKE_POST_SUCCESS, postId })
export const undoLikePostSuccess = postId => ({ type: UNDO_LIKE_POST_SUCCESS, postId })
export const deletePostSuccess = postId => ({ type: DELETE_POST_SUCCESS, postId })
export const sharePostSuccess = shareCount => ({ type: SHARE_POST_SUCCESS, shareCount })
export const loadingComments = loadingComments => ({ type: LOADING_COMMENTS, loadingComments })
export const fetchComments = (comments, commentsEndReached) => ({ type: FETCH_COMMENTS, comments, commentsEndReached })
export const fetchMoreComments = (comments, commentsEndReached) => ({ type: FETCH_MORE_COMMENTS, comments, commentsEndReached })
export const publishCommentSuccess = (comment, postId) => ({ type: PUBLISH_COMMENT_SUCCESS, comment, postId })
export const likeCommentSuccess = commentId => ({ type: LIKE_COMMENT_SUCCESS, commentId })
export const undoLikeCommentSuccess = commentId => ({ type: UNDO_LIKE_COMMENT_SUCCESS, commentId })
export const editCommentSuccess = comment => ({ type: EDIT_COMMENT_SUCCESS, comment })
export const deleteCommentSuccess = (postId, commentId) => ({ type: DELETE_COMMENT_SUCCESS, postId, commentId })
export const clearPost = () => ({ type: CLEAR_POST })
export const fetchCommentReplies = (commentId, replies, repliesEndReached) => ({
  type: FETCH_COMMENT_REPLIES, commentId, replies, repliesEndReached,
})
export const addCommentReply = (commentId, reply) => ({ type: ADD_COMMENT_REPLY, commentId, reply })
export const likeCommentReplySuccess = (commentId, replyId) => ({ type: LIKE_COMMENT_REPLY_SUCCESS, commentId, replyId })
export const undoLikeCommentReplySuccess = (commentId, replyId) => ({ type: UNDO_LIKE_COMMENT_REPLY_SUCCESS, commentId, replyId })
export const deleteCommentReplySuccess = (commentId, replyId) => ({ type: DELETE_COMMENT_REPLY_SUCCESS, commentId, replyId })
export const followPageSuccess = postType => ({ type: FOLLOW_PAGE_ON_POST_SUCCESS, postType })

