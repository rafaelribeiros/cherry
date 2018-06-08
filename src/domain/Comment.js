import moment from 'moment'
import { getImageUrl } from '../config/utils'

const mapUser = (user) => {
  return {
    userImage: getImageUrl(user.image || user.userImage),
    name: user.firstname || user.name,
    id: user._id || user.id,
    email: user.email,
  }
}

export class Comment {
  constructor({
    _id,
    likesCount,
    description,
    createdAt,
    liked,
    user
  }) {

    this.id = _id
    this.author = user ? mapUser(user) : {}
    this.createdAt = createdAt
    this.text = description
    this.formatedDate = moment(createdAt).fromNow()
    this.liked = typeof liked !== 'undefined' ? liked : false
    this.likesCount = 0
  }

  updateText(text) {
    this.text = text
  }

  increaseLike() {
    this.liked = true
    this.likesCount += 1
  }

  decreaseLike() {
    this.liked = false
    this.likesCount -= 1
  }

}
