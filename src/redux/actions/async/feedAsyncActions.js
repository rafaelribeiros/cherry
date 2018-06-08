import { Alert, AsyncStorage } from 'react-native'

import { getPosts, } from '../../../services/feed'
import {
  // likePost,
  // undoLikePost,
  // reportPost,
  deletePost,
  // sharePost,
  publishPost,
  votePost,
  getComments,
  publishComment,
  deleteComment,
  verifyUser,
  // updatePost,
  // fetchOpenGraph,
} from '../../../services/post'
import { sendImageS3 } from '../../../services/upload'

import {
  // loadingPosts,
  // fetchPosts,
  // refreshPosts,
  // likeFeedPostSuccess,
  // undoLikePostSuccess,
  deletePostSuccess,
  // shareFeedPostSuccess,
  // followPageOnFeedSuccess,
  publishingPost,
  publishPostSuccess,
  loadingPosts,
  fetchPosts,
  refreshPosts,
  votePostSuccess,
  verifyingUser,
  // updatePostStatusOnFeed,
  // loadingOg,
  // saveOpenGraph,
  // saveOgUrlsFound,
  // saveOgUrlsDismissed,
  // uploadingImage,
  // updateUploadVideoProgress,
  // uploadVideoSuccess,
  // uploadVideoFailed,
} from '../sync/feedSyncActions'
import { loadingComments, fetchComments, publishCommentSuccess, deleteCommentSuccess } from '../sync/postSyncActions'
import { saveUser } from '../sync/authenticationSyncActions'

const showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })

export function getPostsAction(skip, lat, lng) {
  return async (dispatch) => {
    try {
      dispatch(loadingPosts(true))
      const posts = await getPosts(skip, lat, lng)
      const postsEndReached = posts.length < 10
      dispatch(fetchPosts(posts, postsEndReached))
    } catch (err) {
      dispatch(loadingPosts(false))
    }
  }
}

export function publishPostAction(formData, navigation) {
  return async (dispatch) => {
    try {
      dispatch(publishingPost(true))
      const post = await publishPost(formData)
      dispatch(publishPostSuccess(post))
      const { image } = formData
      if (image.uri) {
        await sendImageS3(image, image.name)
      }
      navigation.goBack()
    } catch (err) {
      showAlert(err.message, '')
    }
  }
}

export function refreshPostsAction(lat, lng) {
  return async (dispatch) => {
    try {
      dispatch(loadingPosts(true))
      const posts = await getPosts(0, lat, lng)
      const postsEndReached = posts.length < 10
      dispatch(refreshPosts(posts, postsEndReached))
    } catch (err) {
      dispatch(loadingPosts(false))
      showAlert(err.message, '')
    }
  }
}

export function deletePostAction(postId) {
  return async (dispatch) => {
    try {
      await deletePost(postId)
      dispatch(deletePostSuccess(postId))
    } catch (error) {
      throw error
    }
  }
}

export function votePostAction(postId, vote) {
  return async (dispatch) => {
    try {
      await votePost(postId, vote)
      dispatch(votePostSuccess(postId, vote))
    } catch (error) {
      throw error
    }
  }
}

export function getCommentsAction(postId, skip, sort) {
  return async (dispatch) => {
    try {
      dispatch(loadingComments(true))
      const comments = await getComments(postId, skip, sort)
      const commentsEndReached = comments.length < 10
      dispatch(fetchComments(comments, true))
    } catch (error) {
      dispatch(loadingComments(false))
      throw error
    }
  }
}

export function publishCommentAction(postId, text) {
  return async (dispatch) => {
    try {
      const comment = await publishComment(postId, text)
      dispatch(publishCommentSuccess(comment, postId))
    } catch (error) {
      throw error
    }
  }
}

export function deleteCommentAction(postId, commentId) {
  return async (dispatch) => {
    try {
      await deleteComment(postId, commentId)
      dispatch(deleteCommentSuccess(postId, commentId))
    } catch (error) {
      throw error
    }
  }
}

export function verifyUserAction(image) {
  return async (dispatch) => {
    try {

      dispatch(verifyingUser(true))
      const user = await verifyUser(image)
      if (image.uri) {
        await sendImageS3(image, image.name)
      }
      AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(saveUser(user))
      dispatch(verifyingUser(false))
    } catch (error) {
      throw error
    }
  }
}
