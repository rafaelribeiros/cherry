import React, { Component } from 'react'
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  Image
} from 'react-native'
import { func, bool, shape, string } from 'prop-types'

import ImagePicker from 'react-native-image-picker'

import { ButtonFooter } from '../../shared/components/buttons'
import { IconButton } from '../../shared/components/iconButton'
import { MediaButtonsContainer } from '../../shared/components/mediaButtonsContainer'
import { InputWithLabel, InputMultlineWithLabel } from '../../shared/components/inputs'
import { SelectWithLabel } from '../../shared/components/selects'
import { Toggle } from '../../shared/components/toggle'
import { LoadingSpinner } from '../../shared/components/loadingSpinner'

import { getFileName } from '../../../config/utils'
import {
  CONFIRM_DELETE_TEXT,
  CONFIRM_DELETE_TITLE,
  INPUT_FORM_BLANK,
} from '../../../constants/messages'
import { Colors, Metrics, Values, } from '../../../constants'
import { styles } from './styles/publishPostForm.style'

export class PublishPostForm extends Component {
  static defaultProps = {
    onPublishPress: () => { },
    openGraph: {
      hasOg: false,
      ogTitle: '',
      ogImage: '',
      ogLink: '',
      ogDescription: ''
    },
    loadingOg: false,
  }

  static propTypes = {
    onPublishPress: func,
    openGraph: shape({
      hasOg: bool,
      ogTitle: string,
      ogImage: string,
      ogLink: string,
      ogDescription: string
    }),
    loadingOg: bool
  }

  state = {
    title: '',
    description: '',
    image: { uri: '' },
    isModalVisible: false,
    anonymus: false,
    selectedType: '',
    items: [
      'Assalto',
      'Assasinato',
      'Sequestro',
      'Furto',
      'Outro',
    ]
  }

  showModal = () => {
    setTimeout(() => this.videoModal.activateImmersion(), 2000)
    this.setState({ isModalVisible: true })
  }
  hideModal = () => this.setState({ isModalVisible: false })

  onRemoveImagePress = () => {
    Alert.alert(
      CONFIRM_DELETE_TITLE('esta imagem'),
      CONFIRM_DELETE_TEXT,
      [
        { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => {
            this.setState({ image: { uri: '' } })
          },
          style: 'destructive'
        },
      ],
      { cancelable: true }
    )
  }

  showAlert = (title, text, onPress) => {
    Alert.alert(
      title,
      text,
      [{ text: 'OK', onPress }],
      { cancelable: true }
    )
  }

  onSubmitPress = () => {
    const { description } = this.state
    if (description === '') {
      return this.showAlert('', INPUT_FORM_BLANK('a descrição'))
    }
    return (
      Alert.alert(
        '',
        'Deseja concluir esta publicação?',
        [
          { text: 'Editar', onPress: () => { } },
          { text: 'Publicar', onPress: () => this.props.onPublishPress(this.state, this.props.openGraph) }
        ]
      )
    )
  }

  setDescripton = (description) => {
    this.setState({ description })
  }

  switchPostStatus = () => {
    this.setState({ anonymus: !this.state.anonymus })
  }

  openImagePicker = () => {
    const options = Values.galleryInputOptions.image
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        this.showAlert('Error', 'Erro ao selecionar imagem')
      } else if (!response.didCancel) {
        const { uri, path, fileName } = response
        const name = `image/${getFileName(fileName || uri)}`
        this.setState({ image: { uri, uploadUri: (Platform.OS === 'ios') ? uri : path, name } })
      }
    })
  }

  focusDescription = () => this.descriptionInput.focus()

  renderToggle = () => {
    return (
      <Toggle
        title="Publicar anonimamente"
        subtitle=""
        value={this.state.anonymus}
        onValueChange={this.switchPostStatus}
      />
    )
  }

  render() {
    const {
      title,
      description,
      image,
      anonymus,
      items,
      selectedType,
    } = this.state

    const hasImage = (image.uri !== '')

    const backgroundColor = Colors.primary
    const publishButtonText = anonymus ? 'Publicar anonimamente' : 'Publicar'

    const mediaTextContainerStyle = StyleSheet.flatten([
      styles.mediaTextContainer,
      { marginTop: (hasImage) ? Metrics.tinySpacing : Metrics.standardSpacing }
    ])
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderToggle()}
          <InputWithLabel
            label="TÍTULO"
            placeholder="Insira o título da publicação"
            value={title}
            onChangeText={title => this.setState({ title })}
            onSubmitEditing={this.focusDescription}
          />
          <SelectWithLabel
            items={items}
            label="TIPO"
            placeholder="Selecione o tipo da publicação"
            selectedValue={selectedType}
            onValueChange={selectedType => this.setState({ selectedType })}
          />
          <InputMultlineWithLabel
            ref={(ref) => { this.descriptionInput = ref }}
            label="TEXTO DA PUBLICAÇÃO"
            placeholder="Diga alguma coisa..."
            value={description}
            onChangeText={description => this.setDescripton(description)}
          />
          <View style={mediaTextContainerStyle}>
            {
              (hasImage) &&
              <IconButton
                color={Colors.blackDisabledAlt}
                dense
                name="delete"
                onPress={this.onRemoveImagePress}
                size={Metrics.icons.medium}
                style={styles.icon}
              />
            }
          </View>
          {(!hasImage) &&
            <MediaButtonsContainer
              buttonsColor={backgroundColor}
              onImagePress={this.openImagePicker}
              isImageVisible
            />
          }
          {(hasImage) &&
            <Image style={{ aspectRatio: 16 / 9 }} source={{ uri: image.uri }} />
          }
          {
            this.props.loadingOg && <LoadingSpinner spinnerColor={Colors.primary} />
          }
        </ScrollView>
        <ButtonFooter onPress={this.onSubmitPress} label={publishButtonText} />
      </View>
    )
  }
}
