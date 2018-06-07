import moment from 'moment'
// import _ from 'lodash'
import { getImageUrl, } from '../config/utils'

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
    imgUrl,
    user,
    authorId,
    votedNegative,
    votedPositive,
  }) {
    this.id = _id
    this.authorId = authorId
    this.body = description
    this.createdAt = createdAt
    this.formatedDate = moment(createdAt).fromNow()
    this.images = imgUrl ? [getImageUrl(imgUrl, 'medium')] : []
    this.karma = karma
    this.status = status
    this.title = title
    this.contentType = type
    this.user = user ? mapUser(user) : {}
    this.placeDescription = placeDescription
    this.anonymus = anonymus
    this.loc = loc
    this.votedNegative = votedNegative || false
    this.votedPositive = votedPositive || false
  }

  voteNegative() {
    this.votedNegative = true
    this.votedPositive = false
    this.karma -= 1
  }

  votePositive() {
    this.votedPositive = true
    this.votedNegative = false
    this.karma += 1
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
