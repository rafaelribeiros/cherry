import { Platform } from 'react-native'

import { Colors } from './colors'

const artistName = 'Luciano Huck'

const navbarStyles = {
  androidStatusBarSpacing: {
    ...Platform.select({
      android: {
        paddingTop: 24,
        height: 80
      }
    })
  },
  primary: {
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.primary,
      ...Platform.select({
        android: {
          paddingTop: 24,
          height: 80
        }
      })
    },
  },
  special: {
    headerTintColor: Colors.white,
    headerStyle: {
      backgroundColor: Colors.special,
      ...Platform.select({
        android: {
          paddingTop: 24,
          height: 80
        }
      })
    },
  }
}

const shadowCompositeColor = {
  shadowColor: 'black',
  shadowOpacity: 0.18,
}
const elevation = {
  e1: {
    ...Platform.select({
      android: { elevation: 1 },
      ios: {
        ...shadowCompositeColor,
        shadowOffset: { height: 1, width: 0 },
        shadowRadius: 0,
      }
    })
  },
  e2: {
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        ...shadowCompositeColor,
        shadowOffset: { height: 2, width: 0 },
        shadowRadius: 2,
      }
    })
  },
  e4: {
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        ...shadowCompositeColor,
        shadowOffset: { height: 4, width: 0 },
        shadowRadius: 4,
      }
    })
  },
}

const styleShortcut = {
  centerContent: {
    justifyContent: 'center',
    alignSelf: 'center',
  }
}

const galleryInputOptions = {
  image: {
    inputHeight: 20,
    title: 'Postar uma foto',
    mediaType: 'photo',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar foto...',
    chooseFromLibraryButtonTitle: 'Selecionar da biblioteca…',
    permissionDenied: {
      title: 'Permissão negada',
      text: 'Acessar a camera e selecionar fotos da biblioteca',
      reTryTitle: 'Tentar novamente',
      okTitle: 'Ok',
    },
    noData: true,
    quality: 0.8,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    },
  },
}


export const Values = {
  artistName,
  elevation,
  navbarStyles,
  styleShortcut,
  galleryInputOptions,
}
