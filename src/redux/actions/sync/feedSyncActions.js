import {
  LOADING_POSTS,
  FETCH_POSTS,
  REFRESH_POSTS,
  LIKE_POST_SUCCESS,
  UNDO_LIKE_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  FEED_SHARE_POST_SUCCESS,
  UPDATE_POST_STATUS_ON_FEED,
  FOLLOW_PAGE_ON_FEED_SUCCESS,
  PUBLISHING_POST,
  PUBLISH_POST_SUCCESS,
  CLEAR_NEW_POST_STATE,
  LOADING_OG,
  SAVE_OPEN_GRAPH,
  SAVE_OG_URLS_FOUND,
  SAVE_OG_URLS_DISMISSED,
  UPLOADING_POST_IMAGE,
  UPDATE_UPLOAD_VIDEO_PROGRESS,
  UPLOAD_VIDEO_SUCCESS,
  UPLOAD_VIDEO_FAILED,
  CLEAN_FEED_POSTS,
  INCREASE_POST_COMMENT_COUNT_ON_FEED,
  DECREASE_POST_COMMENT_COUNT_ON_FEED,
  UPDATE_POST_ON_FEED,
  VOTE_POST_SUCCESS,
  SET_USER_LOCATION,
  VERIFYING_USER,
} from '../../types/feedTypes'

export const loadingPosts = loadingPosts => ({ type: LOADING_POSTS, loadingPosts })
export const fetchPosts = (posts, postsEndReached) => ({ type: FETCH_POSTS, posts, postsEndReached })
export const refreshPosts = (posts, postsEndReached) => ({ type: REFRESH_POSTS, posts, postsEndReached })
export const likeFeedPostSuccess = postId => ({ type: LIKE_POST_SUCCESS, postId })
export const undoLikePostSuccess = postId => ({ type: UNDO_LIKE_POST_SUCCESS, postId })
export const deletePostSuccess = postId => ({ type: DELETE_POST_SUCCESS, postId })
export const votePostSuccess = (postId, vote) => ({ type: VOTE_POST_SUCCESS, postId, vote })
export const shareFeedPostSuccess = (postId, shareCount) => ({ type: FEED_SHARE_POST_SUCCESS, postId, shareCount })
export const updatePostStatusOnFeed = (postId, status) => ({ type: UPDATE_POST_STATUS_ON_FEED, postId, status })
export const followPageOnFeedSuccess = (postId, postType) => ({ type: FOLLOW_PAGE_ON_FEED_SUCCESS, postId, postType })
export const publishingPost = publishingPost => ({ type: PUBLISHING_POST, publishingPost })
export const publishPostSuccess = post => ({ type: PUBLISH_POST_SUCCESS, post })
export const clearNewPostState = () => ({ type: CLEAR_NEW_POST_STATE })
export const loadingOg = loadingOg => ({ type: LOADING_OG, loadingOg })
export const saveOpenGraph = og => ({ type: SAVE_OPEN_GRAPH, og })
export const saveOgUrlsFound = ogUrlsFound => ({ type: SAVE_OG_URLS_FOUND, ogUrlsFound })
export const saveOgUrlsDismissed = ogUrlsDismissed => ({ type: SAVE_OG_URLS_DISMISSED, ogUrlsDismissed })
export const uploadingImage = uploadingImage => ({ type: UPLOADING_POST_IMAGE, uploadingImage })
export const updateUploadVideoProgress = data => ({ type: UPDATE_UPLOAD_VIDEO_PROGRESS, data })
export const uploadVideoSuccess = () => ({ type: UPLOAD_VIDEO_SUCCESS })
export const uploadVideoFailed = () => ({ type: UPLOAD_VIDEO_FAILED })
export const cleanFeedPosts = () => ({ type: CLEAN_FEED_POSTS })
export const increasePostCommentCount = postId => ({ type: INCREASE_POST_COMMENT_COUNT_ON_FEED, postId })
export const decreasePostCommentCount = postId => ({ type: DECREASE_POST_COMMENT_COUNT_ON_FEED, postId })
export const updatePost = post => ({ type: UPDATE_POST_ON_FEED, post })
export const setLocation = loc => ({ type: SET_USER_LOCATION, loc })
export const verifyingUser = isVerifyingUser => ({ type: VERIFYING_USER, isVerifyingUser })
