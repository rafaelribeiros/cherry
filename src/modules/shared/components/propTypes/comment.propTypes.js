import {
  bool,
  number,
  shape,
  string,
} from 'prop-types'

export const commentProps = {
  author: shape({ name: string }),
  formatedDate: string,
  liked: bool,
  likesCount: number,
  text: string
}
export const commentDefault = {
  author: {},
  formatedDate: '',
  liked: false,
  likesCount: 0,
  text: ''
}
