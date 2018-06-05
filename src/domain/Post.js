import moment from 'moment'
// import _ from 'lodash'
import { getImageUrl } from '../config/utils'

const mapUser = (user) => {
  return {
    userImage: getImageUrl(user.image || user.userImage),
    name: user.firstname || user.name,
    id: user._id || user.id,
    email: user.email,
  }
}

export class Post {
  constructor({
    _id,
    loc,
    anonymus,
    karma,
    status,
    title,
    description,
    type,
    placeDescription,
    createdAt,
    imageUrl,
    user,
    authorId,
  }) {
    this.id = _id
    this.authorId = authorId
    this.body = description
    this.createdAt = createdAt
    this.formatedDate = moment(createdAt).fromNow()
    this.images = imageUrl ? [imageUrl] : []
    this.karma = karma
    this.status = status
    this.title = title
    this.contentType = type
    this.user = user ? mapUser(user) : {}
    this.placeDescription = placeDescription
    this.anonymus = anonymus
    this.loc = loc
  }

  increaseLike() {
    this.liked = true
    this.likesCount += 1
  }

  decreaseLike() {
    this.liked = false
    this.likesCount -= 1
  }

  increaseComment() {
    this.commentCount += 1
  }

  decreaseComment() {
    this.commentCount -= 1
  }

  updateComments(commentsCount) {
    this.commentCount = commentsCount
  }

  updateStatus(status) {
    this.status = status
  }

  updateShareCount(shareCount) {
    this.shareCount = shareCount
  }

  changeType(type) {
    this.type = type
  }

}
