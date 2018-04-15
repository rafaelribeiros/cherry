import React, { Component } from 'react'
import {
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Platform,
  Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { bool, func, shape } from 'prop-types'

import { Avatar } from '../../shared/components/avatar'
import { ButtonFooter } from '../../shared/components/buttons'
import { Card } from '../../shared/components/card'
import { HideableView } from '../../shared/components/hideableView'
import { Icon } from '../../shared/components/icon'
import { InputWithLabel } from '../../shared/components/inputs'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'
import { ViewHandlingKeyboard } from '../../shared/components/viewHandlingKeyboard'

import { Colors, Metrics } from '../../../constants'
import { styles } from './styles/profile.style'
import { getFileName } from '../../../config/utils'
import { userDefaultProps, userPropTypes } from '../../shared/propTypes/userPropTypes'
import { ScreenContainerHOC } from '../../shared/components/hoc/screenContainerHOC'

const Container = ScreenContainerHOC(ViewHandlingKeyboard)

export class ProfileEdit extends Component {
  static propTypes = {
    loading: bool.isRequired,
    onSubmitPress: func.isRequired,
    user: shape(userPropTypes),
  }

  static defaultProps = {
    user: userDefaultProps,
  }

  state = {
    image: { name: this.props.user.image, uri: this.props.user.imageUrl, upload: false },
    name: this.props.user.name,
    nameUnchanged: this.props.user.name,
  }

  submitProfile = () => {
    if (this.state.name) {
      this.props.onSubmitPress(this.state)
    } else {
      Alert.alert(
        'Atenção',
        'Preencha seu nome',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: true }
      )
    }
  }

  openImagePicker = () => {
    const options = {
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
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
    }
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        this.showAlert('Error', 'Erro ao selecionar imagem')
      } else if (!response.didCancel) {
        const { uri, path, fileName } = response
        const name = `image/profile/${getFileName(fileName || uri)}`
        const image = {
          uri, uploadUri: (Platform.OS === 'ios') ? uri : path, name, upload: true
        }
        this.setState({
          image
        })
      }
    })
  }

  profileHasChanged = () => (
    (this.state.name !== '' && this.state.name !== this.props.user.name) || (this.state.image.upload)
  )

  render() {
    const {
      loading,
      user,
    } = this.props

    return (
      <Container style={styles.containerComplete}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={this.openImagePicker}>
            <View style={[styles.avatarWrap]}>
              <Avatar
                artist={false}
                containerStyle={{ padding: Metrics.tinySpacing / 2 }}
                name={user.name}
                size={Metrics.avatar.xxl}
                source={this.state.image.uri}
                extraItem={
                  <Icon
                    color={Colors.screen}
                    name="camera"
                    containerStyle={[
                      styles.cameraBadge,
                      { backgroundColor: Colors.primary }
                    ]}
                  />
                }
              />
            </View>
          </TouchableWithoutFeedback>
          <Card style={styles.inputWrap}>
            <InputWithLabel
              onChangeText={name => this.setState({ name })}
              label="Nome"
              placeholder="Qual seu nome?"
              value={this.state.name}
              returnKeyType="done"
            />
          </Card>
        </ScrollView>
        <HideableView isVisible={this.profileHasChanged()} maxHeight={Metrics.buttonHeightStandard}>
          <ButtonFooter
            onPress={this.submitProfile}
            backgroundColor={Colors.primary}
            label="Salvar"
          />
        </HideableView>
        {loading && <LoadingOverlay />}
      </Container>
    )
  }
}
