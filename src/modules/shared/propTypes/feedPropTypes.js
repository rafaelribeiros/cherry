import {
  array,
  arrayOf,
  bool,
  func,
  number,
  object,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types'

import { candidatePropTypes, candidateDefaultProps } from './candidatePropTypes'

export const feedItemDefault = {
  user: candidateDefaultProps,
  audio: undefined,
  image: undefined,
  interactions: {
    like: {
      isActive: false,
      number: 0,
      onPress: () => { },
    },
    comment: {
      number: 0,
      onPress: () => { },
    },
    share: {
      number: 0,
      onPress: () => { },
    },
  },
  // isExclusive: false,
  isSubscriber: false,
  menu: {
    buttons: [],
    hideMenuModal: () => { },
    isMenuModalVisible: false,
    showMenuModal: () => { },
  },
  title: undefined,
  text: undefined,
  textMaxLength: undefined,
  videoThumbnail: undefined,
  authorId: undefined,
  likes: [],
  status: undefined,
  video: undefined,
  comments: [],
  images: [],
  og: {
    ogLink: undefined,
    ogImage: { uri: '' },
    ogTitle: undefined,
    ogDescription: undefined
  },
  isOgPocket: false,
  liked: false,
  commentCount: 0,
  shareCount: 0,
  type: 'REGULAR',
}
export const feedItemProps = {
  user: shape(candidatePropTypes).isRequired,
  type: oneOf(['REGULAR', 'SPONSORED']),
  audio: shape({
    file: oneOfType([string, number, object]),
    title: string
  }),
  id: oneOfType([string, number]).isRequired,
  image: oneOfType([number, string, object]),
  interactions: shape({
    like: shape({
      isActive: bool,
      number,
      onPress: func,
    }),
    comment: shape({
      number,
      onPress: func,
    }),
    share: shape({
      number,
      onPress: func,
    }),
  }),
  // isExclusive: bool,
  isSubscriber: bool,
  menu: shape({
    buttons: arrayOf(shape({
      label: string,
      onPress: func
    })),
    hideMenuModal: func,
    isMenuModalVisible: bool,
    showMenuModal: func,
  }),
  title: string,
  text: string,
  textMaxLength: number,
  videoThumbnail: oneOfType([number, string, object]),
  authorId: string,
  likes: array,
  status: string,
  video: string,
  comments: array,
  images: array,
  og: shape({
    ogLink: string,
    ogImage: oneOfType([number, string, object]),
    ogTitle: string,
    ogDescription: string
  }),
  isOgPocket: bool,
  liked: bool,
  commentCount: number,
  shareCount: number,
}
