import { Alert } from 'react-native'

import {
  getPost,
  //   likePost,
  //   undoLikePost,
  //   reportPost,
  //   deletePost,
  //   sharePost,
  //   getComments,
  //   publishComment,
  //   likeComment,
  //   undoLikeComment,
  //   reportComment,
  //   editComment,
  //   deleteComment,
  //   getCommentReplies,
  //   setCommentReply,
  //   likeCommentReply,
  //   undoLikeCommentReply,
  //   reportCommentReply,
  //   deleteCommentReply,
} from '../../../services/post'
// import { followPage } from '../../../services/page'
import {
  //   likePostSuccess,
  //   undoLikePostSuccess,
  //   deletePostSuccess,
  //   sharePostSuccess,
  fetchPost,
  //   loadingComments,
  //   fetchComments,
  //   fetchMoreComments,
  //   publishCommentSuccess,
  //   likeCommentSuccess,
  //   undoLikeCommentSuccess,
  //   editCommentSuccess,
  //   deleteCommentSuccess,
  //   fetchCommentReplies,
  //   addCommentReply,
  //   followPageSuccess,
  //   likeCommentReplySuccess,
  //   undoLikeCommentReplySuccess,
  //   deleteCommentReplySuccess,
} from '../sync/postSyncActions'
// import {
//   shareFeedPostSuccess,
//   followPageOnFeedSuccess,
//   increasePostCommentCount,
//   decreasePostCommentCount,
//   updatePost,
// } from '../sync/feedSyncActions'
import { POST_REQUEST_FAIL, POST_REPORT_SUCCESS } from '../../../constants/messages'

const showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })

export function getPostAction(postId) {
  return async (dispatch) => {
    try {
      const post = await getPost(postId)
      console.log(post)
      dispatch(fetchPost(post))
      // dispatch(updatePost(post))
    } catch (error) {
      showAlert('Erro ao carregar', POST_REQUEST_FAIL('carregar'))
    }
  }
}

// export function likePostAction(postId) {
//   return async (dispatch) => {
//     try {
//       await likePost(postId)
//       dispatch(likePostSuccess(postId))
//     } catch (err) {
//       showAlert('Erro ao curtir', POST_REQUEST_FAIL('curtir'))
//     }
//   }
// }

// export function undoLikePostAction(postId) {
//   return async (dispatch) => {
//     try {
//       await undoLikePost(postId)
//       dispatch(undoLikePostSuccess(postId))
//     } catch (err) {
//       showAlert('Erro ao remover curtir', POST_REQUEST_FAIL('remover curtir da'))
//     }
//   }
// }

// export function reportPostAction(postId) {
//   return async () => {
//     try {
//       await reportPost(postId)
//       showAlert('Postagem reportada', POST_REPORT_SUCCESS)
//     } catch (err) {
//       showAlert('Erro ao reportar', POST_REQUEST_FAIL('reportar'))
//     }
//   }
// }

// export function deletePostAction(postId, navigation) {
//   return async (dispatch) => {
//     try {
//       await deletePost(postId)
//       navigation.goBack()
//       dispatch(deletePostSuccess(postId))
//     } catch (err) {
//       showAlert('Erro ao excluir', POST_REQUEST_FAIL('excluir'))
//     }
//   }
// }

// export function sharePostAction(postId) {
//   return async (dispatch) => {
//     try {
//       const sharedPost = await sharePost(postId)
//       dispatch(sharePostSuccess(sharedPost.shareCount))
//       dispatch(shareFeedPostSuccess(postId, sharedPost.shareCount))
//       return sharedPost
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function getCommentsAction(postId, skip, sort) {
//   return async (dispatch) => {
//     try {
//       dispatch(loadingComments(true))
//       const comments = await getComments(postId, skip, sort)
//       const commentsEndReached = comments.length < 10
//       dispatch(fetchComments(comments, commentsEndReached))
//     } catch (error) {
//       dispatch(loadingComments(false))
//       throw error
//     }
//   }
// }

// export function getMoreCommentsAction(postId, skip, sort) {
//   return async (dispatch) => {
//     try {
//       dispatch(loadingComments(true))
//       const comments = await getComments(postId, skip, sort)
//       const commentsEndReached = comments.length < 10
//       dispatch(fetchMoreComments(comments, commentsEndReached))
//     } catch (error) {
//       dispatch(loadingComments(false))
//       throw error
//     }
//   }
// }

// export function publishCommentAction(postId, text) {
//   return async (dispatch) => {
//     try {
//       const comment = await publishComment(postId, text)
//       dispatch(publishCommentSuccess(comment, postId))
//       dispatch(increasePostCommentCount(postId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function likeCommentAction(postId, commentId) {
//   return async (dispatch) => {
//     try {
//       await likeComment(postId, commentId)
//       dispatch(likeCommentSuccess(commentId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function undoLikeCommentAction(postId, commentId) {
//   return async (dispatch) => {
//     try {
//       await undoLikeComment(postId, commentId)
//       dispatch(undoLikeCommentSuccess(commentId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function reportCommentAction(postId, commentId) {
//   return async () => {
//     try {
//       await reportComment(postId, commentId)
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function editCommentAction(postId, commentId, text) {
//   return async (dispatch) => {
//     try {
//       const comment = await editComment(postId, commentId, text)
//       dispatch(editCommentSuccess(comment))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function deleteCommentAction(postId, commentId) {
//   return async (dispatch) => {
//     try {
//       await deleteComment(postId, commentId)
//       dispatch(deleteCommentSuccess(postId, commentId))
//       dispatch(decreasePostCommentCount(postId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function getCommentRepliesAction(postId, commentId, skip) {
//   return async (dispatch) => {
//     try {
//       const replies = await getCommentReplies(postId, commentId, skip)
//       const repliesEndReached = replies.length < 10
//       dispatch(fetchCommentReplies(commentId, replies, repliesEndReached))
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function addCommentReplyAction(postId, commentId, text) {
//   return async (dispatch) => {
//     try {
//       const reply = await setCommentReply(postId, commentId, text)
//       dispatch(addCommentReply(commentId, reply))
//       dispatch(increasePostCommentCount(postId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function likeCommentReplyAction(postId, commentId, replyId) {
//   return async (dispatch) => {
//     try {
//       await likeCommentReply(postId, replyId)
//       dispatch(likeCommentReplySuccess(commentId, replyId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function undoLikeReplyCommentAction(postId, commentId, replyId) {
//   return async (dispatch) => {
//     try {
//       await undoLikeCommentReply(postId, replyId)
//       dispatch(undoLikeCommentReplySuccess(commentId, replyId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function reportCommentReplyAction(postId, replyId) {
//   return async () => {
//     try {
//       await reportCommentReply(postId, replyId)
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function deleteCommentReplyAction(postId, commentId, replyId) {
//   return async (dispatch) => {
//     try {
//       await deleteCommentReply(postId, replyId)
//       dispatch(deleteCommentReplySuccess(commentId, replyId))
//       dispatch(decreasePostCommentCount(postId))
//     } catch (error) {
//       throw error
//     }
//   }
// }

// export function followPageAction(pageId, postId) {
//   return async (dispatch) => {
//     try {
//       await followPage(pageId)
//       dispatch(followPageOnFeedSuccess(postId, 'REGULAR'))
//       dispatch(followPageSuccess('REGULAR'))
//     } catch (err) {
//       throw err
//     }
//   }
// }

