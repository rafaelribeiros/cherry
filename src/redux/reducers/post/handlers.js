import _ from 'lodash'

import { POST_INITIAL_STATE } from './constants'

export const fetchPost = (state, { post, commenting }) => ({ ...state, post, commenting })

export const likePost = (state, { postId }) => {
  const post = _.cloneDeep(state.post)
  if (post.id === postId) {
    post.increaseLike()
  }
  return { ...state, post }
}
export const undolikePost = (state, { postId }) => {
  const post = _.cloneDeep(state.post)
  if (post.id === postId) {
    post.decreaseLike()
  }
  return { ...state, post }
}
export const deletePost = (state, { postId }) => {
  const post = _.cloneDeep(state.post)
  if (post.id === postId) {
    return { ...POST_INITIAL_STATE }
  }
  return { ...state }
}
export const sharePost = (state, { shareCount }) => {
  const post = _.cloneDeep(state.post)
  post.updateShareCount(shareCount)
  return { ...state, post }
}
export const loadingComments = (state, { loadingComments }) => ({ ...state, loadingComments })
export const fetchComments = (state, { comments, commentsEndReached }) => ({
  ...state, comments, commentsEndReached, loadingComments: false
})
export const fetchMoreComments = (state, { comments, commentsEndReached }) => {
  const oldComments = _.cloneDeep(state.comments)
  const newComments = [...oldComments, ...comments]
  return {
    ...state, comments: newComments, commentsEndReached, loadingComments: false
  }
}
export const publishComment = (state, { comment }) => {
  const comments = _.cloneDeep(state.comments)
  const post = _.cloneDeep(state.post)
  // post.increaseComment()
  comments.unshift(comment)
  return { ...state, post, comments }
}
export const likeComment = (state, { commentId }) => {
  const comments = _.cloneDeep(state.comments)
  const comment = comments.find(item => item.id === commentId)
  if (comment) {
    comment.increaseLike()
  }
  return { ...state, comments }
}
export const undolikeComment = (state, { commentId }) => {
  const comments = _.cloneDeep(state.comments)
  const comment = comments.find(item => item.id === commentId)
  if (comment) {
    comment.decreaseLike()
  }
  return { ...state, comments }
}
export const editComment = (state, { comment }) => {
  const comments = _.cloneDeep(state.comments)
  const commentItem = comments.find(item => item.id === comment.id)
  if (commentItem) {
    commentItem.updateText(comment.text)
  }
  return { ...state, comments }
}
export const deleteComment = (state, { commentId }) => {
  const comments = _.cloneDeep(state.comments)
  const post = _.cloneDeep(state.post)
  const newComments = comments.filter(item => item.id !== commentId)
  // post.decreaseComment()
  return { ...state, post, comments: newComments }
}
export const clearComments = state => ({ ...state, comments: [] })
export const fetchCommentReplies = (state, { commentId, replies, repliesEndReached }) => {
  const comments = _.cloneDeep(state.comments)
  const commentItem = comments.find(item => item.id === commentId)
  const oldReplies = _.cloneDeep(commentItem.replies)
  const newReplies = [...oldReplies, ...replies]
  commentItem.repliesEndReached = repliesEndReached
  commentItem.replies = newReplies
  return { ...state, comments }
}
export const addCommentReply = (state, { commentId, reply }) => {
  const comments = _.cloneDeep(state.comments)
  const commentItem = comments.find(item => item.id === commentId)
  if (commentItem) {
    commentItem.replies.unshift(reply)
    commentItem.increaseRepliesCount()
  }
  return { ...state, comments }
}
export const likeCommentReply = (state, { commentId, replyId }) => {
  const comments = _.cloneDeep(state.comments)
  const comment = comments.find(item => item.id === commentId)
  const replies = _.cloneDeep(comment.replies)
  const reply = replies.find(item => item.id === replyId)
  if (reply) {
    reply.increaseLike()
  }
  comment.replies = replies
  return { ...state, comments }
}
export const undolikeCommentReply = (state, { commentId, replyId }) => {
  const comments = _.cloneDeep(state.comments)
  const comment = comments.find(item => item.id === commentId)
  const replies = _.cloneDeep(comment.replies)
  const reply = replies.find(item => item.id === replyId)
  if (reply) {
    reply.decreaseLike()
  }
  comment.replies = replies
  return { ...state, comments }
}
export const deleteCommentReply = (state, { commentId, replyId }) => {
  const comments = _.cloneDeep(state.comments)
  const post = _.cloneDeep(state.post)
  const comment = comments.find(item => item.id === commentId)
  const replies = _.cloneDeep(comment.replies)
  const newReplies = replies.filter(item => item.id !== replyId)
  post.decreaseComment()
  comment.replies = newReplies
  return { ...state, post, comments }
}
export const changePostType = (state, { postType }) => {
  const post = _.cloneDeep(state.post)
  post.changeType(postType)
  return { ...state, post }
}
