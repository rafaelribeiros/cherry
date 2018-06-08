import _ from 'lodash'
import {
  GET_POST,
  LIKE_POST,
  UNDO_LIKE_POST,
  REPORT_POST,
  DELETE_POST,
  SHARE_POST,
  GET_COMMENTS,
  GET_COMMENT_REPLIES,
  PUBLISH_COMMENT,
  LIKE_COMMENT,
  UNDO_LIKE_COMMENT,
  REPORT_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_COMMENT_REPLY,
  PUBLISH_POST,
  UPDATE_POST,
  GET_OPENGRAPH,
  LIKE_COMMENT_REPLY,
  UNDO_LIKE_COMMENT_REPLY,
  REPORT_COMMENT_REPLY,
  DELETE_COMMENT_REPLY,
  GET_POST_LIKES,
  VOTE_POST,
  VERIFY_USER,
} from '../../constants/routes'

import { verifyResponse, getUser, mapPost, mapComment, mapCommentReply, mapUser } from '../../config/utils'

export const getPost = async (postId) => {
  const user = await getUser()
  return fetch(GET_POST(postId, user.id), {
    method: 'GET',
    headers: {
      // Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  })
    .then(resp => verifyResponse(resp))
    .then((postBackend) => {
      console.log(postBackend)
      const post = mapPost(postBackend)
      return post
    }).catch((err) => { throw err })
}

export const likePost = async (postId) => {
  const user = await getUser()
  return fetch(LIKE_POST(postId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const undoLikePost = async (postId) => {
  const user = await getUser()
  return fetch(UNDO_LIKE_POST(postId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const reportPost = async (postId) => {
  const user = await getUser()
  return fetch(REPORT_POST(postId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const deletePost = async (postId) => {
  const user = await getUser()
  return fetch(DELETE_POST, {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: postId })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      console.log(response)
      return response
    }).catch((err) => { throw err })
}

export const votePost = async (postId, vote) => {
  const user = await getUser()
  return fetch(VOTE_POST, {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      // Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post: postId, user: user.id, value: vote })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      console.log(response)
      return response
    }).catch((err) => { throw err })
}

export const sharePost = async (postId) => {
  const user = await getUser()
  return fetch(SHARE_POST(postId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(resp => verifyResponse(resp))
    .then((response) => {
      const { payload } = response
      const sharedPost = { url: payload.url, shareCount: payload.shareCount }
      return sharedPost
    }).catch((err) => { throw err })
}

export const getComments = async (postId, skip = 0, sort = 'DATE') => {
  const user = await getUser()
  const params = `?skip=${skip}&limit=${10}&sort=${sort}`
  return fetch(`${GET_COMMENTS(postId)}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  })
    .then(resp => verifyResponse(resp))
    .then((commentsBackend) => {
      const comments = commentsBackend.map((item) => {
        const comment = mapComment(item)
        return comment
      })
      return comments
    }).catch((err) => { throw err })
}

export const publishComment = async (postId, description) => {
  const user = await getUser()
  return fetch(PUBLISH_COMMENT, {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      post: postId,
      user: user.id,
      description,
    })
  })
    .then(resp => verifyResponse(resp))
    .then((commentBackend) => {
      const { comment } = commentBackend
      comment.user = { _id: user.id, name: user.name, image: user.image }
      const newComment = mapComment(comment)
      return newComment
    }).catch((err) => { throw err })
}

export const likeComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(LIKE_COMMENT(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const undoLikeComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(UNDO_LIKE_COMMENT(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const reportComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(REPORT_COMMENT(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const editComment = async (postId, commentId, text) => {
  const user = await getUser()
  return fetch(EDIT_COMMENT(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text,
    })
  }).then(resp => verifyResponse(resp))
    .then((commentBackend) => {
      const { payload } = commentBackend
      if (_.isEmpty(user.pageAdmin)) {
        payload.author = { _id: user.id, name: user.name, image: user.image }
      } else {
        payload.author = { _id: user.pageAdmin.id, name: user.pageAdmin.name, image: user.pageAdmin.imageUrl }
      }
      const comment = mapComment(payload)
      return comment
    }).catch((err) => { throw err })
}

export const deleteComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(DELETE_COMMENT, {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      // Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: commentId
    })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const getCommentReplies = async (postId, commentId, skip = 0, sort = 'DATE') => {
  const user = await getUser()
  const params = `?skip=${skip}&limit=${10}&sort=${sort}`
  return fetch(`${GET_COMMENT_REPLIES(postId, commentId)}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  })
    .then(resp => verifyResponse(resp))
    .then((repliesBackend) => {
      const { payload } = repliesBackend
      const replies = payload.map((item) => {
        const reply = mapCommentReply(item)
        reply.parentId = commentId
        return reply
      })
      return replies
    }).catch((err) => { throw err })
}

export const setCommentReply = async (postId, commentId, text) => {
  const user = await getUser()
  return fetch(SET_COMMENT_REPLY(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, })
  }).then(resp => verifyResponse(resp))
    .then((replyBackend) => {
      const { payload } = replyBackend
      if (_.isEmpty(user.pageAdmin)) {
        payload.author = { _id: user.id, name: user.name, image: user.image }
      } else {
        payload.author = { _id: user.pageAdmin.id, name: user.pageAdmin.name, image: user.pageAdmin.imageUrl }
      }
      const reply = mapCommentReply(payload)
      return reply
    }).catch((err) => { throw err })
}

export const likeCommentReply = async (postId, replyId) => {
  const user = await getUser()
  return fetch(LIKE_COMMENT_REPLY(postId, replyId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const undoLikeCommentReply = async (postId, commentId) => {
  const user = await getUser()
  return fetch(UNDO_LIKE_COMMENT_REPLY(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const reportCommentReply = async (postId, commentId) => {
  const user = await getUser()
  return fetch(REPORT_COMMENT_REPLY(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const deleteCommentReply = async (postId, commentId) => {
  const user = await getUser()
  return fetch(DELETE_COMMENT_REPLY(postId, commentId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    }).catch((err) => { throw err })
}

export const publishPost = async ({
  title,
  description,
  image,
  selectedType,
  anonymus,
  location,
}) => {
  const user = await getUser()
  const bodySend = {
    userId: user.id,
    description,
    user,
    title,
    imgUrl: image.name,
    type: selectedType,
    lat: location.latitude,
    lng: location.longitude,
    placeDescription: location.address,
    anonymus,
  }

  return fetch(PUBLISH_POST, {
    method: 'POST',
    headers: {
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodySend)
  }).then(resp => verifyResponse(resp))
    .then(({ payload }) => {
      const post = payload
      post.user = user
      const newPost = mapPost(post)
      return newPost
    }).catch((err) => { throw err })
}

export const updatePost = async (id, title, body, status) => {
  const user = await getUser()
  return fetch(UPDATE_POST(id), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      body,
      status,
    })
  })
    .then(resp => verifyResponse(resp))
    .then((postBackend) => {
      const { payload } = postBackend
      const post = mapPost(payload, 'REGULAR')
      return post
    }).catch((err) => { throw err })
}

export const fetchOpenGraph = async (description, og, urlsFound, urlsDismissed) => {
  const searchLinks = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal|online))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([-A-Z0-9+&@#/%=~_|$?!:,.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi
  const urls = description.match(searchLinks)
  let updatedUrlsFound = urlsFound
  let updatedUrlsDismissed = urlsDismissed
  let save = false
  if (!og.ogTitle) { // se não possui opengraph
    if (!(urls && urls.length) || urls.length < urlsFound.length) { // se não encontrou nenhuma url reseta os arrays
      updatedUrlsFound = []
      updatedUrlsDismissed = []
      if (updatedUrlsDismissed.length !== urlsDismissed.length || updatedUrlsFound.length !== urlsFound.length) {
        save = true
      }
    }
    if (urls && urls.length) { // se encontrou alguma url adiciona na lista de urlsFound, não adiciona repetido
      urls.forEach((url) => {
        let urlAux = url.toLowerCase().trim()
        if (urlAux.indexOf('http') !== 0) {
          urlAux = `http://${urlAux}`
        }
        if (updatedUrlsFound.indexOf(urlAux) === -1) {
          updatedUrlsFound.push(urlAux)
          save = true
        }
      })
    }
    if (updatedUrlsFound.length > 0) { // se encontrou urls
      for (let i = 0; i < updatedUrlsFound.length; i += 1) {
        const url = updatedUrlsFound[i]
        if (urlsDismissed.indexOf(url) === -1) { // verifica se ela ja foi removida pelo usuário, se ainda não foi, carrega o opengraph
          // envia requisição para carregar opengraph
          // eslint-disable-next-line no-await-in-loop
          const opengraph = await fetchOpenGraphFromApi(url)
          return {
            opengraph, updatedUrlsFound, updatedUrlsDismissed, save
          }
        }
      }
    }
  }
  if (save) {
    return {
      og, updatedUrlsFound, updatedUrlsDismissed, save
    }
  }
  return {
    url: description, og, urlsFound, urlsDismissed, save
  }
}

const fetchOpenGraphFromApi = async (url) => {
  const user = await getUser()
  return fetch(GET_OPENGRAPH(url), {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    }
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const og = response
      og.ogLink = url
      og.ogImage = og.ogImage ? og.ogImage.url : ''
      og.hasOg = true
      return og
    })
    .catch((err) => { throw err })
}

export const getPostLikes = async (postId, skip = 0) => {
  const params = `?skip=${skip}&limit=${10}`
  const user = await getUser()
  return fetch(`${GET_POST_LIKES(postId)}?${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      const users = response.payload.map(user => mapUser(user))
      return users
    })
    .catch((err) => {
      throw err
    })
}

export const verifyUser = async (image) => {
  const user = await getUser()
  return fetch(VERIFY_USER, {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      // Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: user.id, verifyImage: image.name })
  }).then(resp => verifyResponse(resp))
    .then((response) => {
      user.status = 'PENDING'
      return response
    }).catch((err) => { throw err })
}
