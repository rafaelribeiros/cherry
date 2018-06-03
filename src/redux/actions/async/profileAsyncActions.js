import { AsyncStorage } from 'react-native'
import { getUserProfile, updateProfile } from '../../../services/profile'
import { loadingProfile } from '../sync/profileSyncActions'

import { saveUser } from '../sync/authenticationSyncActions'
import { sendImageS3 } from '../../../services/upload'

export function getUserProfileAction() {
  return async (dispatch) => {
    try {
      const user = await getUserProfile()
      AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(saveUser(user))
    } catch (error) {
      dispatch(loadingProfile(false))
      throw error
    }
  }
}

export function updateProfileAction(name, image, city, state) {
  return async (dispatch) => {
    try {
      dispatch(loadingProfile(true))
      const user = await updateProfile(name, image.name, city, state)
      if (image.upload) {
        await sendImageS3(image, image.name)
      }
      AsyncStorage.setItem('profile', JSON.stringify(user)).then(() => { })
      dispatch(saveUser(user))
      dispatch(loadingProfile(false))
    } catch (error) {
      dispatch(loadingProfile(false))
      throw error
    }
  }
}
