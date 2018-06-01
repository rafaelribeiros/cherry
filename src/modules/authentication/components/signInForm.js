import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import { ButtonPrimary } from '../../shared/components/buttons/index'
import { Input } from '../../shared/components/inputs/index'
import { FormErrorMessage } from '../../shared/components/formErrorMessage'

import { styles } from './styles/signIn.styles'

import { INPUT_FORM_BLANK, INVALID_EMAIL, INVALID_PASSWORD } from '../../../constants/messages'

export class SignInForm extends Component {

  static propTypes = {
    onButtonPress: PropTypes.func,
    onSignUpButtonPress: PropTypes.func,
    hideAlert: PropTypes.func,
    alert: PropTypes.shape({
      showAlert: PropTypes.bool,
      message: PropTypes.string,
    })
  }

  static defaultProps = {
    onButtonPress: () => { },
    onSignUpButtonPress: () => { },
    hideAlert: () => { },
    alert: {
      showAlert: false,
      message: '',
    }
  }

  state = {
    email: '',
    password: '',
    passwordSecure: true,
    secureIcon: 'eye-off-outline',
    alert: { showAlert: false, message: '' },
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  componentWillReceiveProps(nextProps) {
    const { alert } = nextProps
    this.setState({ alert })
  }

  onSignInButtonPress = () => {
    const { email, password } = this.state
    if (email === '') {
      this.setAlert(true, INPUT_FORM_BLANK('o email'))
    } else if ((this.state.pattern.test(email) === false)) {
      this.setAlert(true, INVALID_EMAIL)
    } else if (password === '') {
      this.setAlert(true, INPUT_FORM_BLANK('a senha'))
    } else if (password.length < 6) {
      this.setAlert(true, INVALID_PASSWORD)
    } else {
      this.props.onButtonPress(email, password)
    }
  }

  setAlert = (showAlert, message) => { this.setState({ alert: { showAlert, message } }) }

  changePasswordSecure = () => {
    const { passwordSecure } = this.state
    this.setState({
      passwordSecure: !passwordSecure,
      secureIcon: !passwordSecure ? 'eye-off-outline' : 'eye-outline',
    })
  }

  setInput = (input) => { this.setState({ inputRef: input }) }

  setInputState = (name, value) => {
    const { showAlert } = this.state.alert
    if (showAlert) {
      this.props.hideAlert()
      this.setAlert(false, '')
    }
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { email, password, passwordSecure, secureIcon } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.bodyContainer}>
          <Input
            autoFocus
            keyboardAppearance={'dark'}
            keyboardType={'email-address'}
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder={'Insira seu email'}
            primaryIcon={'email-outline'}
            returnKeyType={'next'}
            setValue={email => this.setInputState('email', email)}
            value={email}
          />
          <Input
            autoCorrect={false}
            keyboardAppearance={'dark'}
            onIconPress={this.changePasswordSecure}
            onSubmitEditing={this.onSignInButtonPress}
            placeholder={'Insira sua senha'}
            primaryIcon={'lock-outline'}
            ref={(input) => { this.passwordInput = input }}
            returnKeyType={'done'}
            secondaryIcon={secureIcon}
            secureTextEntry={passwordSecure}
            setInput={this.setInput}
            setValue={password => this.setInputState('password', password)}
            value={password}
          />
          <FormErrorMessage
            message={this.state.alert.message}
            isVisible={this.state.alert.showAlert}
          />
          <TouchableWithoutFeedback onPress={this.props.onSignUpButtonPress}>
            <View style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Não tem cadastro?
                <Text style={styles.forgotPasswordLink}> Cadastre-se aqui</Text>
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ButtonPrimary disabled={this.state.alert.showAlert} label={'Entrar'} onPress={this.onSignInButtonPress} />
      </View>
    )
  }
}
