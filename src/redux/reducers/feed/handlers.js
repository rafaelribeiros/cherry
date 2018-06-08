import _ from 'lodash'

export const loadingPosts = (state, { loadingPosts }) => ({ ...state, loadingPosts })
export const fetchPosts = (state, { posts, postsEndReached }) => {
  const oldPosts = _.cloneDeep(state.posts)
  const newPosts = [...oldPosts, ...posts]
  return {
    ...state, posts: newPosts, postsEndReached, loadingPosts: false,
  }
}
export const refreshPosts = (state, { posts, postsEndReached }) => {
  return {
    ...state, posts, postsEndReached, loadingPosts: false,
  }
}
export const loadingPost = (state, { loadingPost }) => ({ ...state, loadingPost })
export const publishingPost = (state, { publishingPost }) => ({ ...state, publishingPost })
export const publishPost = (state, { post }) => {
  const posts = _.cloneDeep(state.posts)
  posts.unshift(post)
  return { ...state, posts, publishingPost: false }
}
export const deletePost = (state, { postId }) => {
  const posts = _.cloneDeep(state.posts)
  const newPosts = posts.filter(item => item.id !== postId)
  return { ...state, posts: newPosts }
}
export const votePostSuccess = (state, { postId, vote }) => {
  const posts = _.cloneDeep(state.posts)
  const post = posts.find(item => item.id === postId)
  if (vote === 1) {
    post.votePositive()
  } else {
    post.voteNegative()
  }
  return { ...state, posts }
}
export const setUserLocation = (state, { loc }) => ({ ...state, loc })
export const verifyUser = (state, { isVerifyingUser }) => ({ ...state, isVerifyingUser })

// export const publishCommentSuccess = (state, { comment, postId }) => {
//   const comments = _.cloneDeep(state.comments)
//   const posts = _.cloneDeep(state.posts)
//   const post = posts.find(item => item.id === postId)
//   if (post) {
//     post.increaseComment()
//   }
//   comments.unshift(comment)
//   return { ...state, posts, comments }
// }
// export const deleteCommentSuccess = (state, { postId, commentId }) => {
//   const comments = _.cloneDeep(state.comments)
//   const posts = _.cloneDeep(state.posts)
//   const newComments = comments.filter(item => item.id !== commentId)
//   const post = posts.find(item => item.id === postId)
//   if (post) {
//     post.decreaseComment()
//   }
//   return { ...state, posts, comments: newComments }
// }
