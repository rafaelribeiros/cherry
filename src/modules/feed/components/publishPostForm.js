import React, { Component } from 'react'
import {
  Alert,
  Platform,
  ScrollView,
  View,
  Image,
  Text
} from 'react-native'
import { func, bool } from 'prop-types'
import _ from 'lodash'
import ImagePicker from 'react-native-image-picker'
import LinearGradient from 'react-native-linear-gradient'
import RNGooglePlaces from 'react-native-google-places'

import { ButtonFooter } from '../../shared/components/buttons'
import { IconButton } from '../../shared/components/iconButton'
import { MediaButtonsContainer } from '../../shared/components/mediaButtonsContainer'
import { InputWithLabel, InputMultlineWithLabel } from '../../shared/components/inputs'
import { SelectWithLabel } from '../../shared/components/selects'
import { Toggle } from '../../shared/components/toggle'
import { LoadingSpinner } from '../../shared/components/loadingSpinner'
import { Touchable } from '../../shared/components/touchable'
import { Icon } from '../../shared/components/icon'

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
  }

  static propTypes = {
    onPublishPress: func,
  }

  state = {
    title: '',
    description: '',
    image: { uri: '' },
    anonymus: false,
    selectedType: '',
    location: {},
    items: [
      'Assalto',
      'Assasinato',
      'Sequestro',
      'Furto',
      'Outro',
    ]
  }

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
    const { description, location, selectedType } = this.state
    if (description === '') {
      return this.showAlert(INPUT_FORM_BLANK('a descrição'), '')
    } else if (_.isEmpty(location)) {
      return this.showAlert(INPUT_FORM_BLANK('o local da ocorrência'), '')
    } else if (selectedType === '') {
      return this.showAlert(INPUT_FORM_BLANK('o tipo da ocorrência'), '')
    }
    return (
      Alert.alert(
        '',
        'Deseja concluir esta publicação?',
        [
          { text: 'Editar', onPress: () => { } },
          { text: 'Publicar', onPress: () => this.props.onPublishPress(this.state) }
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

  openSearchModal = () => {
    RNGooglePlaces.openAutocompleteModal({ country: 'BR' })
      .then((location) => {
        this.setState({ location })
        console.log(location)
      })
      .catch(error => console.log(error.message))
  }

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
      location,
    } = this.state

    const hasImage = (image.uri !== '')

    const backgroundColor = Colors.primary
    const publishButtonText = anonymus ? 'Publicar anonimamente' : 'Publicar'
    const locationText = location.address ? location.address : 'Local da Ocorrência'

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
          <Touchable
            onPress={this.openSearchModal}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon
              style={styles.icon}
              color={Colors.blackSecondary}
              name="map-marker"
              size={Metrics.icons.medium}
            />
            <Text>{locationText}</Text>
          </Touchable>
          <InputMultlineWithLabel
            ref={(ref) => { this.descriptionInput = ref }}
            label="TEXTO DA PUBLICAÇÃO"
            placeholder="Diga alguma coisa..."
            value={description}
            onChangeText={description => this.setDescripton(description)}
          />
          {(!hasImage) &&
            <MediaButtonsContainer
              buttonsColor={backgroundColor}
              onImagePress={this.openImagePicker}
              isImageVisible
            />
          }
          {(hasImage) &&
            <View style={{ aspectRatio: 16 / 9, }}>
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: image.uri }} />
              <LinearGradient
                locations={[0.4, 0.8, 1]}
                colors={['#0000', 'rgba(0, 0, 0, 0.60)', 'rgba(0, 0, 0, 0.7)']}
                style={styles.linearContainer}
              >
                <IconButton
                  color={Colors.white}
                  dense
                  name="delete"
                  onPress={this.onRemoveImagePress}
                  size={Metrics.icons.medium}
                />
              </LinearGradient>
            </View>
          }
        </ScrollView>
        <ButtonFooter onPress={this.onSubmitPress} label={publishButtonText} />
      </View>
    )
  }
}
