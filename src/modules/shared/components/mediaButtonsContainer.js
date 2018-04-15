import React from 'react'
import { ScrollView } from 'react-native'
import { func, string, bool } from 'prop-types'

import { ButtonWithIcon } from './buttons'
import { styles } from './styles/mediaButtonsContainer.styles'

export const MediaButtonsContainer = (props) => {
  const {
    buttonsColor,
    isAudioVisible,
    isImageVisible,
    isVideoVisible,
    onAudioPress,
    onImagePress,
    onVideoPress,
  } = props
  return (
    <ScrollView horizontal contentContainerStyle={styles.container}>
      {
        isImageVisible &&
        <ButtonWithIcon
          backgroundColor={buttonsColor}
          onPress={onImagePress}
          icon="image"
          label="Foto"
          containerStyle={styles.iconSpacing}
        />
      }
      {
        isVideoVisible &&
        <ButtonWithIcon
          backgroundColor={buttonsColor}
          onPress={onVideoPress}
          icon="youtube-play"
          label="Vídeo"
          containerStyle={styles.iconSpacing}
        />
      }
      {
        isAudioVisible &&
        <ButtonWithIcon
          backgroundColor={buttonsColor}
          onPress={onAudioPress}
          icon="music-note"
          label="Áudio"
          containerStyle={styles.iconSpacing}
        />
      }
    </ScrollView>
  )
}

MediaButtonsContainer.propTypes = {
  onImagePress: func,
  onVideoPress: func,
  onAudioPress: func,
  buttonsColor: string,
  isImageVisible: bool,
  isVideoVisible: bool,
  isAudioVisible: bool,
}

MediaButtonsContainer.defaultProps = {
  onImagePress: () => { },
  onVideoPress: () => { },
  onAudioPress: () => { },
  isImageVisible: false,
  isVideoVisible: false,
  isAudioVisible: false,
  buttonsColor: undefined,
}
