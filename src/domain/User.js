import _ from 'lodash'
import { getImageUrl } from '../config/utils'

export class User {
  constructor({
    _id,
    firstname,
    email,
    userImage,
    image,
    type,
    status,
    city,
    state,
  }) {
    this.id = _id
    this.name = firstname
    this.email = email
    this.image = userImage || image
    this.imageUrl = getImageUrl(userImage || image)
    this.userStatus = status
    this.city = city
    this.state = state
    this.userType = type
    this.isAuthenticated = status === 'VERIFIED'
  }
}
