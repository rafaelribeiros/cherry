import React, { Component } from 'react'
import { View, ImageBackground, StatusBar, StyleSheet, Platform, Keyboard } from 'react-native'
import { func, string, number, bool} from 'prop-types'

import { Navbar } from '../../shared/components/navbar'
// import { SignUpProgress } from './signUpProgress'
import { SignUpForm } from './signUpForm'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'

import { styles } from './styles/signUp.styles'
import { Images } from '../../../constants/index'

export class SignUp extends Component {

  static propTypes = {
    onButtonPress: func,
    goBack: func,
    navBarTitle: string,
    backgroundImage: number,
    signUpProgress: string,
    loading: bool,
    hasPicker: bool
  }

  static defaultProps = {
    onButtonPress: () => { },
    goBack: () => { },
    navBarTitle: '',
    backgroundImage: Images.signUp,
    signUpProgress: '0%',
    loading: false,
    hasPicker: false
  }

  state = {
    keyboardHeight: 0,
  };

  componentDidMount = () => {
    if ((Platform.OS === 'ios') && (!this.props.hasPicker)) {
      this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)
      this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)
    }
    if ((Platform.OS === 'android') && (!this.props.hasPicker)) {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
    }
  }

  componentWillUnmount = () => {
    if ((Platform.OS === 'ios') && (!this.props.hasPicker)) {
      this.keyboardWillShowListener.remove()
      this.keyboardWillHideListener.remove()
    }
    if ((Platform.OS === 'android') && (!this.props.hasPicker)) {
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
      keyboardHeight: 0,
    })
  }

  render() {
    const { navBarTitle, backgroundImage, loading } = this.props
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
        <ImageBackground resizeMode={'cover'} style={conatinerStyle} source={backgroundImage}>
          <View style={StyleSheet.flatten([styles.absoluteFill, styles.darkOverlay])} />
          <Navbar transparent onBack={this.props.goBack} title={navBarTitle} />
          <SignUpForm {...this.props} />
        </ImageBackground>
        {loading && <LoadingOverlay />}
      </View>
    )
  }
}
