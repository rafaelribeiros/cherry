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
