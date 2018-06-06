import { Alert, AsyncStorage } from 'react-native'

import { getPosts, } from '../../../services/feed'
import {
  // likePost,
  // undoLikePost,
  // reportPost,
  // deletePost,
  // sharePost,
  publishPost,
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
  // deletePostSuccess,
  // shareFeedPostSuccess,
  // followPageOnFeedSuccess,
  publishingPost,
  publishPostSuccess,
  loadingPosts,
  fetchPosts,
  refreshPosts,
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
