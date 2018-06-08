import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import CameraButton from '../../shared/components/CameraRoundButton'
import { LoadingSpinner } from '../../shared/components/loadingSpinner'

import { verifyAccount as styles, crmCardImage } from '../components/styles/verifyAccount.style'
import { getFileName } from '../../../config/utils'
import { Values } from '../../../constants'
import { getVerifyingUser } from '../../../redux/reducers/feed/selectors'
import { verifyUserAction } from '../../../redux/actions/async/feedAsyncActions'

class VerifyAccountContainer extends Component {

  static navigationOptions = () => ({
    title: null,
    ...Values.navbarStyles.primary
  })

  static propTypes = {
    navigation: PropTypes.object,
    menuState: PropTypes.object
  }

  static defaultProps = {
    navigation: {},
    menuState: {}
  }

  state = { }

  openImagePicker = () => {
    const options = {
      inputHeight: 20,
      title: 'Fotografe o seu CRM',
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
      allowsEditing: false,
    }

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.error) {
        alert('Não foi possivel selecionar imagem')
      } else if (!response.didCancel) {
        const { uri, path, fileName } = response
        const name = `verifyImages/${getFileName(fileName || uri)}`
        const image = { uri, uploadUri: (Platform.OS === 'ios') ? uri : path, name }
        await this.props.verifyAccount(image)
        // this.props.navigation.goBack()
      }
    })
  }

  renderSpinnerOrButton = () => {
    const { isLoading } = this.props
    console.log(isLoading)
    if (isLoading) {
      return <LoadingSpinner spinnerColor="#fff" />
    }
    return <CameraButton onPress={this.openImagePicker} />
  }

  render() {
    console.log(this.props)
    // const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>Fotografe seu documento</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.imageContainer}>
            <Image source={crmCardImage} style={styles.mainImage} />
          </View>
          <View style={styles.roundButtonContainer}>
            {this.renderSpinnerOrButton()}
          </View>
        </View>
        {/* <View style={styles.footer}>
          <View style={styles.footerTextContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerText}>VOLTAR</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    )
  }
}


const mapStateToProps = state => ({
  isLoading: getVerifyingUser(state)
})

const mapDispatchToProps = dispatch => ({
  verifyAccount: image => dispatch(verifyUserAction(image))
})

export const VerifyAccountScreen = connect(mapStateToProps, mapDispatchToProps)(VerifyAccountContainer)
