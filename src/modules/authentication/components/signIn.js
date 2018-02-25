import React, { Component } from 'react'
import { View, ImageBackground, StatusBar, StyleSheet, Platform, Keyboard } from 'react-native'
import PropTypes from 'prop-types'

import { LoadingOverlay } from '../../shared/components/loadingOverlay'

import { SignInForm } from './signInForm'

import { styles } from './styles/signIn.styles'
import { Images } from '../../../constants/index'

export class SignIn extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func,
    navigateToForgotPassword: PropTypes.func,
    onHideAlert: PropTypes.func,
    goBack: PropTypes.func,
    alert: PropTypes.shape({
      showAlert: PropTypes.bool,
      message: '',
    }),
    loading: PropTypes.bool,
  }

  static defaultProps = {
    onButtonPress: () => { },
    navigateToForgotPassword: () => { },
    onHideAlert: () => { },
    goBack: () => { },
    alert: { showAlert: false, message: '' },
    loading: false
  }

  state = {
    isKeyboardActive: false,
    keyboardHeight: 0,
  };

  componentDidMount = () => {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }
  }

  componentWillUnmount = () => {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListener.remove()
      this.keyboardWillHideListener.remove()
    }
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener.remove()
      this.keyboardDidHideListener.remove()
    }
  }

  keyboardWillShow = (event) => {
    if (Platform.OS === 'ios') { this.setKeyboard(event) }
  }
  keyboardDidShow = (event) => {
    if (Platform.OS === 'android') { this.setKeyboard(event) }
  }
  setKeyboard = (event) => {
    const keyboardHeight = event.endCoordinates.height
    this.setState({
      isKeyboardActive: true,
      keyboardHeight: Platform.OS === 'ios' ? keyboardHeight : 0,
    })
  }

  keyboardWillHide = () => {
    if (Platform.OS === 'ios') { this.unsetKeyboard() }
  }
  keyboardDidHide = () => {
    if (Platform.OS === 'android') { this.unsetKeyboard() }
  }
  unsetKeyboard = () => {
    this.setState({
      isKeyboardActive: false,
      keyboardHeight: 0,
    })
  }

  onSignInButtonPress = (email, password) => {
    this.props.onButtonPress(email, password)
  }

  onForgotPasswordButtonPress = () => {
    this.props.navigateToForgotPassword()
  }

  render() {
    const conatinerStyle = [
      styles.container,
      {
        paddingBottom: this.state.keyboardHeight,
      }
    ]
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          barStyle="light-content"
          backgroundColor={'transparent'}
          translucent
        />
        <ImageBackground resizeMode={'cover'} style={conatinerStyle} source={Images.signIn}>
          <View style={StyleSheet.flatten([styles.absoluteFill, styles.darkOverlay])} />
          <SignInForm
            onButtonPress={this.onSignInButtonPress}
            onForgotPasswordButtonPress={this.onForgotPasswordButtonPress}
            alert={this.props.alert}
            hideAlert={this.props.onHideAlert}
          />
        </ImageBackground>
        {this.props.loading && <LoadingOverlay elevated />}
      </View>
    )
  }
}
