import {
  PUBLISH_EVENT,
  UPDATE_EVENT,
  GET_EVENTS,
  LIKE_EVENT,
  UNDO_LIKE_EVENT,
  REPORT_EVENT,
  GET_EVENT_COMMENTS,
  PUBLISH_EVENT_COMMENT,
  EDIT_EVENT_COMMENT,
  DELETE_EVENT_COMMENT,
  SHARE_EVENT,
  LIKE_EVENT_COMMENT,
  UNDO_LIKE_EVENT_COMMENT,
  REPORT_EVENT_COMMENT,
  GET_EVENT,
  DELETE_EVENT,
} from '../../constants/routes'

import { verifyResponse, getUser } from '../../config/utils'

import { Event } from '../../domain/Event'
import { Comment } from '../../domain/Comment'

const mapEvent = (response) => {
  const {
    _id,
    authorId,
    body,
    commentCount,
    comments,
    createdAt,
    image,
    liked,
    likesCount,
    membersOnly,
    owner,
    ownerId,
    shareCount,
    status,
    title,
    type,
    updatedAt,
    eventDate,
    eventLocation,
    eventLink,
    images
  } = response
  return new Event({
    _id,
    authorId,
    body,
    commentCount,
    comments,
    createdAt,
    image,
    liked,
    likesCount,
    membersOnly,
    owner,
    ownerId,
    shareCount,
    status,
    title,
    type,
    updatedAt,
    eventDate,
    eventLocation,
    eventLink,
    images
  })
}

const mapComment = (response) => {
  const {
    _id,
    likesCount,
    text,
    createdAt,
    liked,
    author
  } = response
  return new Comment(
    _id,
    likesCount,
    text,
    createdAt,
    liked,
    author
  )
}

export const publishEvent = async (notifyUsers, {
  title,
  eventDate,
  eventLink,
  eventLocation,
  image,
}) => {
  const user = await getUser()
  const bodySend = { title, eventDate, notifyUsers }

  if (eventLink) {
    bodySend.eventLink = eventLink
  }

  if (eventLocation) {
    bodySend.eventLocation = eventLocation
  }

  if (image.uri !== '') {
    bodySend.status = 'DRAFT'
    bodySend.image = image.name
  }

  return fetch(PUBLISH_EVENT, {
    method: 'POST',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodySend)
  }).then(resp => verifyResponse(resp))
    .then((eventBackend) => {
      const { payload } = eventBackend
      const event = mapEvent(payload)
      return event
    }).catch((err) => { throw err })
}

export const updateEvent = async (id, eventDate, title, eventLink, eventLocation, image, status, notifyUsers) => {
  const user = await getUser()
  const bodySend = {
    eventDate,
    title,
    status,
    eventLink,
    eventLocation,
    notifyUsers
  }
  if (eventLink) {
    bodySend.eventLink = eventLink
  }

  if (eventLocation) {
    bodySend.eventLocation = eventLocation
  }

  if (image) {
    bodySend.image = image
  }
  return fetch(UPDATE_EVENT(id), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodySend)
  }).then(resp => verifyResponse(resp))
    .then((eventBackend) => {
      const { payload } = eventBackend
      const event = mapEvent(payload)
      return event
    }).catch((err) => { throw err })
}

export const getEvent = async (eventId) => {
  const user = await getUser()
  return fetch(GET_EVENT(eventId), {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((eventBackend) => {
      const { payload } = eventBackend
      const event = mapEvent(payload)
      return event
    }).catch((err) => { throw err })
}

export const getEvents = async (skip = 0) => {
  const user = await getUser()
  const params = `?skip=${skip}&limit=${10}`
  return fetch(`${GET_EVENTS}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((eventsBackend) => {
      const { payload } = eventsBackend
      const events = payload.map((item) => {
        const event = mapEvent(item)
        return event
      })
      return events
    }).catch((err) => { throw err })
}

export const deleteEvent = async (eventId) => {
  const user = await getUser()
  return fetch(DELETE_EVENT(eventId), {
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
    }).catch((error) => { throw error })
}

export const likeEvent = async (eventId) => {
  const user = await getUser()
  return fetch(LIKE_EVENT(eventId), {
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
    }).catch((error) => { throw error })
}

export const undoLikeEvent = async (eventId) => {
  const user = await getUser()
  return fetch(UNDO_LIKE_EVENT(eventId), {
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
    }).catch((error) => { throw error })
}

export const reportEvent = async (eventId) => {
  const user = await getUser()
  return fetch(REPORT_EVENT(eventId), {
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
    }).catch((error) => { throw error })
}

export const shareEvent = async (eventId) => {
  const user = await getUser()
  return fetch(SHARE_EVENT(eventId), {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((shareUrlBackend) => {
      const { payload } = shareUrlBackend
      const sharedEvent = { url: payload.url, shareCount: payload.shareCount }
      return sharedEvent
    }).catch((err) => { throw err })
}


export const getComments = async (postId, skip = 0, sort = 'DATE') => {
  const user = await getUser()
  const params = `?skip=${skip}&limit=${10}&sort=${sort}`
  return fetch(`${GET_EVENT_COMMENTS(postId)}${params}`, {
    method: 'GET',
    headers: {
      Authorization: user.authorization,
      'Content-Type': 'application/json'
    },
  }).then(resp => verifyResponse(resp))
    .then((commentsBackend) => {
      const { payload } = commentsBackend
      const comments = payload.map((item) => {
        const comment = mapComment(item)
        return comment
      })
      return comments
    }).catch((err) => { throw err })
}

export const publishComment = async (postId, text) => {
  const user = await getUser()
  return fetch(PUBLISH_EVENT_COMMENT(postId), {
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
      const { comments = [] } = payload
      const item = comments[0]
      item.author = { _id: user.id, name: user.name }
      const comment = mapComment(item)
      return comment
    }).catch((err) => { throw err })
}

export const likeComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(LIKE_EVENT_COMMENT(postId, commentId), {
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
    }).catch((error) => { throw error })
}

export const undoLikeComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(UNDO_LIKE_EVENT_COMMENT(postId, commentId), {
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
    }).catch((error) => { throw error })
}

export const reportComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(REPORT_EVENT_COMMENT(postId, commentId), {
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
    }).catch((error) => { throw error })
}

export const editComment = async (postId, commentId, text) => {
  const user = await getUser()
  return fetch(EDIT_EVENT_COMMENT(postId, commentId), {
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
      const { comments = [] } = payload
      const item = comments[0]
      item.author = { _id: user.id, name: user.name }
      const comment = mapComment(item)
      return comment
    }).catch((err) => { throw err })
}

export const deleteComment = async (postId, commentId) => {
  const user = await getUser()
  return fetch(DELETE_EVENT_COMMENT(postId, commentId), {
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
    }).catch((error) => { throw error })
}
