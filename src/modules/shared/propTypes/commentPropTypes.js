import { arrayOf, shape, string, bool, number } from 'prop-types'

export const subCommentPropTypes = {
  author: shape({
    id: string,
    image: string,
    name: string,
  }),
  commentId: string,
  formatedDate: string,
  liked: bool,
  likesCount: number,
  text: string,
}

export const subCommentDefaultProps = {
  author: {},
  commentId: '',
  formatedDate: '',
  liked: false,
  likesCount: 0,
  text: '',
}

export const commentPropTypes = {
  subComments: arrayOf(shape(subCommentPropTypes)),
  ...subCommentPropTypes
}

export const commentDefaultProps = {
  subComment: [],
  ...subCommentDefaultProps
}
