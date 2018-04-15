import { AsyncStorage } from 'react-native'
// import Config from 'react-native-config'
// import { User } from '../domain/User'
// import { Post } from '../domain/Post'
// import { Comment } from '../domain/Comment'
// import { CommentReply } from '../domain/CommentReply'
const Config = ''

export async function getUser() {
  let userJson
  await AsyncStorage.getItem('profile')
    .then((profile) => {
      if (profile) {
        userJson = JSON.parse(profile)
      } else {
        userJson = {}
      }
    }).catch((err) => {
      userJson = { err }
    })

  return userJson
}

export async function getDevice() {
  let deviceJson
  await AsyncStorage.getItem('device')
    .then((device) => {
      if (device) {
        deviceJson = JSON.parse(device)
      } else {
        deviceJson = {}
      }
    }).catch((err) => {
      deviceJson = { err }
    })

  return deviceJson
}

export async function verifyResponse(response) {
  if (response.status !== 200 && response.status !== 201) {
    if (response.status === 401) {
      response.message = 'Usuário bloqueado!'
      throw await response.json()
    }
    throw await response.json()
  } else {
    return response.json()
  }
}

export function getFileName(file) {
  let fileName = file.substr(file.lastIndexOf('/') + 1)
  const array = fileName.split('?')
  fileName = array[0]
  const fileExtension = fileName.substr(fileName.lastIndexOf('.') + 1)
  return (`${Date.now().toString(36) + Math.random().toString(36).substr(2, 15)}.${fileExtension}`)
}

export function getImageUrl(imageName, size = 'small') {
  const image = imageName
  const imageSize = size
  if (typeof image !== 'undefined' && image != null && image !== '') {
    if (image.startsWith('https://') || image.startsWith('http://') || image.startsWith('file://') || image.startsWith('content://') || image.startsWith('/')) {
      return image
    } else if (imageSize) {
      const fileExtension = image.substr(image.lastIndexOf('.') + 1)
      let imageName = image.replace(/\.[^/.]+$/, '')
      imageName = `${imageName}.${fileExtension}`
      const imageUrl = `${Config.IMAGE_URL}${imageSize}/${imageName}`
      return imageUrl
    }
    const imageUrl = `${Config.IMAGE_URL}${imageSize}/${imageName}`
    return imageUrl
  }
  return imageName
}

export function getVideoUrl(url) {
  if (url !== null) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return url
    }
    const videoUrl = `${Config.IMAGE_URL}${url}`
    return videoUrl
  }
  return null
}

// export const mapUser = (item) => {
//   const {
//     _id,
//     name,
//     email,
//     userImage,
//     authorization,
//     userType,
//     userStatus,
//     premiumMember,
//     deviceId,
//     facebookId,
//     facebookToken,
//     phone,
//     city,
//     country,
//     state,
//     age,
//     adsBlocked,
//     pageAdmin,
//   } = item
//   return new User({
//     _id,
//     name,
//     email,
//     userImage,
//     authorization,
//     userType,
//     userStatus,
//     premiumMember,
//     deviceId,
//     facebookId,
//     facebookToken,
//     phone,
//     city,
//     country,
//     state,
//     age,
//     adsBlocked,
//     pageAdmin,
//   })
// }

// export const mapPost = (item, type) => {
//   const {
//     _id,
//     socialId,
//     authorId,
//     body,
//     commentCount,
//     comments,
//     createdAt,
//     images,
//     liked,
//     likesCount,
//     membersOnly,
//     owner,
//     ownerId,
//     shareCount,
//     status,
//     title,
//     updatedAt,
//     video,
//     videoThumbnail,
//     og,
//     contentType,
//   } = item
//   return new Post({
//     _id,
//     socialId,
//     authorId,
//     body,
//     commentCount,
//     comments,
//     createdAt,
//     images,
//     liked,
//     likesCount,
//     membersOnly,
//     owner,
//     ownerId,
//     shareCount,
//     status,
//     title,
//     type,
//     updatedAt,
//     video,
//     videoThumbnail,
//     og,
//     contentType
//   })
// }

// export const mapComment = (item) => {
//   const {
//     _id,
//     likesCount,
//     text,
//     createdAt,
//     liked,
//     author,
//     repliesCount,
//   } = item
//   return new Comment({
//     _id,
//     likesCount,
//     text,
//     createdAt,
//     liked,
//     author,
//     repliesCount,
//   })
// }

// export const mapCommentReply = (item) => {
//   const {
//     _id,
//     likesCount,
//     text,
//     createdAt,
//     liked,
//     author,
//     parentId,
//   } = item
//   return new CommentReply({
//     _id,
//     likesCount,
//     text,
//     createdAt,
//     liked,
//     author,
//     parentId
//   })
// }

