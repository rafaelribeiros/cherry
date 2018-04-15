// import { AsyncStorage } from 'react-native'
// import { getUserPages, updateUserPages, getUserProfile, updateProfile } from '../../../services/profile'
// import { followPage, unfollowPage, getPages } from '../../../services/page'
// import { fetchUserCandidates, loadingProfile } from '../sync/profileSyncActions'
// import { fetchCandidates, fetchMoreCandidates } from '../sync/filterSyncActions'
// import { saveUser } from '../sync/authenticationSyncActions'
// import { uploadComplete, sendImageS3 } from '../../../services/upload'


// export function getUserCandidatesAction() {
//   return async (dispatch) => {
//     try {
//       const userPages = await getUserPages()
//       dispatch(fetchUserCandidates(userPages))
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function fetchCandidatesAction(skip = 0, type = '', search = '') {
//   return async (dispatch) => {
//     try {
//       const pages = await getPages(skip, type, search)
//       const pagesEndReached = pages.length < 10
//       dispatch(fetchCandidates(pages, type, pagesEndReached))
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function fetchMoreCandidatesAction(skip = 0, type = '', search = '') {
//   return async (dispatch) => {
//     try {
//       const pages = await getPages(skip, type, search)
//       const pagesEndReached = pages.length < 10
//       dispatch(fetchMoreCandidates(pages, type, pagesEndReached))
//     } catch (err) {
//       throw err
//     }
//   }
// }


// export function updateUserPagesAction(pageIds) {
//   return async () => {
//     try {
//       await updateUserPages(pageIds)
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function followCandidateAction(pageId) {
//   return async () => {
//     try {
//       await followPage(pageId)
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function unfollowCandidateAction(pageId) {
//   return async () => {
//     try {
//       await unfollowPage(pageId)
//     } catch (err) {
//       throw err
//     }
//   }
// }

// export function getUserProfileAction() {
//   return async (dispatch) => {
//     try {
//       const user = await getUserProfile()
//       AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
//       dispatch(saveUser(user))
//     } catch (error) {
//       dispatch(loadingProfile(false))
//       throw error
//     }
//   }
// }

// export function updateProfileAction(name, image) {
//   return async (dispatch) => {
//     try {
//       dispatch(loadingProfile(true))
//       const user = await updateProfile(name, image.name)
//       if (image.upload) {
//         await sendImageS3(image)
//         await uploadComplete([image.name])
//       }
//       AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
//       dispatch(saveUser(user))
//       dispatch(loadingProfile(false))
//     } catch (error) {
//       dispatch(loadingProfile(false))
//       throw error
//     }
//   }
// }
