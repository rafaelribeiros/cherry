import { transferUtility } from 'react-native-s3'
// import Config from 'react-native-config'
import { RNS3 } from 'react-native-aws3'
import { getUser, verifyResponse } from '../../config/utils'
import { UPLOAD_COMPLETE } from '../../constants/routes'

const Config = {
  AMAZON_CREDENTIALS_BUCKET: 'civita-app',
  AMAZON_CREDENTIALS_REGION: 'us-east-1',
  AMAZON_CREDENTIALS_ACCESS_KEY: 'AKIAJA7DV3ZDX7UDCRWQ',
  AMAZON_CREDENTIALS_SECRET_KEY: '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',
}

const awsCredentials = {
  bucket: Config.AMAZON_CREDENTIALS_BUCKET,
  region: Config.AMAZON_CREDENTIALS_REGION,
  accessKey: Config.AMAZON_CREDENTIALS_ACCESS_KEY,
  secretKey: Config.AMAZON_CREDENTIALS_SECRET_KEY,
}

export function sendImageS3(image, imageName) {
  const file = {
    uri: image.uri,
    name: imageName,
    type: 'image/jpeg'
  }
  const {
    bucket,
    region,
    accessKey,
    secretKey
  } = awsCredentials
  const options = {
    bucket,
    region,
    accessKey,
    secretKey,
    successActionStatus: 201
  }
  return RNS3.put(file, options)
  // return new Promise(async (resolve, reject) => {
  //   await transferUtility.setupWithBasic({
  //     region: awsCredentials.region,
  //     access_key: awsCredentials.accessKey,
  //     secret_key: awsCredentials.secretKey
  //   })
  //   const task = await transferUtility.upload({
  //     file: image.uploadUri,
  //     bucket: awsCredentials.bucket,
  //     key: image.name,
  //     meta: {
  //       'Content-Type': 'image/jpeg',
  //       'x-amz-acl': 'public-read'
  //     }
  //   })
  //   transferUtility.subscribe(task.id, async (err, taskItem) => {
  //     const taskUpdated = taskItem
  //     if (err) {
  //       reject(err)
  //     }
  //     if (taskUpdated.state === 'completed') {
  //       resolve(taskUpdated)
  //     }
  //   })
  // })
}

export async function uploadImages(images) {
  const tasks = []
  images.forEach((image) => {
    tasks.push(sendImageS3(image).then(async (response) => {
      return response
    })
      .catch((err) => {
        throw err
      }))
  })
  return Promise.all(tasks).then(async (response) => {
    return response
  }).catch((err) => {
    throw err
  })
}

export const uploadVideoThumb = async (image) => {
  return new Promise(async (resolve, reject) => {
    await transferUtility.setupWithBasic({
      region: awsCredentials.region,
      access_key: awsCredentials.accessKey,
      secret_key: awsCredentials.secretKey
    })

    const task = await transferUtility.upload({
      file: image.uri,
      bucket: awsCredentials.bucket,
      key: image.uploadName,
      meta: {
        'Content-Type': 'image/jpeg',
        'x-amz-acl': 'public-read'
      }
    })
    transferUtility.subscribe(task.id, async (err, taskItem) => {
      const taskUpdated = taskItem
      if (err) {
        reject(err)
      }
      if (taskUpdated.state === 'completed') {
        resolve(taskUpdated)
      }
    })
  })
}
export async function sendVideoToS3(video, dispatch, functionToDispatch) {
  return new Promise(async (resolve, reject) => {
    await transferUtility.setupWithBasic({
      region: awsCredentials.region,
      access_key: awsCredentials.accessKey,
      secret_key: awsCredentials.secretKey
    })
    const task = await transferUtility.upload({
      file: video.uri,
      bucket: awsCredentials.bucket,
      key: video.uploadName,
      meta: {
        'Content-Type': 'video/mp4',
        'x-amz-acl': 'public-read'
      }
    })
    transferUtility.subscribe(task.id, async (err, taskItem) => {
      const taskUpdated = taskItem
      if (err) {
        reject(err)
      }
      if (taskUpdated.state === 'in_progress') {
        dispatch(functionToDispatch(taskUpdated))
      } else if (taskUpdated.state === 'completed') {
        resolve(taskUpdated)
      }
    })
  })
}
export async function uploadVideo(video, thumbnail, dispatch, functionToDispatch) {
  const tasks = []
  tasks.push(sendVideoToS3(video, dispatch, functionToDispatch))
  tasks.push(uploadVideoThumb(thumbnail))
  return Promise.all(tasks).then(async (response) => {
    return response
  }).catch((err) => {
    throw err
  })
}

export const uploadComplete = async (files) => {
  const user = await getUser()
  return fetch(UPLOAD_COMPLETE, {
    method: 'POST',
    Aceept: 'application/json',
    headers: {
      Authorization: user.authorization,
      Aceept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      files
    })
  })
    .then(resp => verifyResponse(resp))
    .then((response) => {
      return response
    })
    .catch((error) => {
      return error
    })
}

