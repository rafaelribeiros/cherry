import React from 'react'
import { SafeAreaView, Text, View, Image, StatusBar, Alert } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FBSDK from 'react-native-fbsdk'

import { ButtonFacebook } from '../../shared/components/buttons/buttonFacebook'
import { ButtonFlat } from '../../shared/components/buttons/buttonFlat'
import { ButtonPrimaryGradient } from '../../shared/components/buttons/buttonPrimaryGradient'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'

import { styles } from './styles/signIn.styles'
import { Images, Colors, Metrics } from '../../../constants'

const {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} = FBSDK


const {
  standardBottomSpacing,
  welcomeButton,
  largeBottomSpacing,
  alternativeLoginWrap,
  alternativeLoginLine,
  alternativeLoginText
} = styles

const authenticateWithFacebook = (props) => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then(
      (result) => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken().then((data) => {
            const token = data.accessToken.toString()
            const infoRequest = new GraphRequest(
              '/me',
              {
                parameters: {
                  fields: { string: 'email,name,first_name,middle_name,last_name' },
                  access_token: { string: token }
                }
              },
              (error, result) => {
                if (error) {
                  props.onErrorFacebook()
                } else if (result.isCancelled) {
                  props.onErrorFacebook()
                } else {
                  props.onFacebookButtonPress(result.email, token)
                }
              }
            )
            new GraphRequestManager().addRequest(infoRequest).start()
          })
        }
      },
      () => {
        props.onErrorFacebook()
        Alert.alert(
          'Atenção',
          'Erro ao conectar com o facebook. Tente novamente.',
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: true }
        )
      }
    )
}

export const Welcome = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.flexCenteredContent}>
        <Image source={Images.welcomeLogoPath} />
      </View>
      <View style={{ paddingHorizontal: Metrics.standardSpacing * 2 }}>
        <ButtonPrimaryGradient
          containerStyle={[welcomeButton, standardBottomSpacing]}
          label="Entrar"
          onPress={props.onPressSignIn}
        />
        <ButtonFlat
          containerStyle={[welcomeButton, largeBottomSpacing]}
          label="Criar conta"
          onPress={props.onPressSignUp}
        />
        <View style={alternativeLoginWrap}>
          <View style={alternativeLoginLine} />
          <Text style={alternativeLoginText}>Ou</Text>
          <View style={alternativeLoginLine} />
        </View>
        <ButtonFacebook
          containerStyle={largeBottomSpacing}
          label="Conectar com o Facebook"
          onPress={() => authenticateWithFacebook(props)}
          renderLeft={
            <Icon
              color={Colors.facebookColor}
              name="facebook-box"
              size={Metrics.icons.medium}
            />
          }
        />
      </View>
      {props.loading && <LoadingOverlay elevated />}
    </SafeAreaView>
  )
}

Welcome.propTypes = {
  loading: PropTypes.bool,
  onPressSignIn: PropTypes.func.isRequired,
  onPressSignUp: PropTypes.func.isRequired,
}

Welcome.defaultProps = {
  loading: false
}
