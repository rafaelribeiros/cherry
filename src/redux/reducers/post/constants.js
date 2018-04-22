import moment from 'moment'

export const NO_POST = {
  id: undefined,
  socialId: undefined,
  authorId: undefined,
  user: {
    image: undefined,
    number: 0,
    party: '',
  },
  body: '',
  origin: 'REGULAR',
  commentCount: 0,
  comments: [],
  createdAt: Date.now(),
  formatedDate: moment().fromNow(),
  images: [],
  liked: false,
  likesCount: 0,
  owner: {},
  ownerId: undefined,
  shareCount: 0,
  status: undefined,
  title: undefined,
  type: undefined,
  updatedAt: undefined,
  video: undefined,
  videoThumbnail: undefined,
  og: {
    ogLink: undefined,
    ogImage: { uri: '' },
    ogTitle: undefined,
    ogDescription: undefined
  },
  contentType: undefined,
}

export const POST_INITIAL_STATE = {
  post: NO_POST,
  loadingComments: false,
  comments: [],
  commentsEndReached: false,
  commenting: false,
}
