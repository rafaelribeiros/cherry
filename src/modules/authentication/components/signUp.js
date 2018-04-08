import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { func, string, number, bool } from 'prop-types'

import { Navbar } from '../../shared/components/navbar'
import { SignUpForm } from './signUpForm'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'
import { BackButtonFloating } from '../../shared/components/backButtonFloating'
import { ViewHandlingKeyboard } from '../../shared/components/viewHandlingKeyboard'
import { ScreenContainerHOC } from '../../shared/components/hoc/screenContainerHOC'

import { styles } from './styles/signUp.styles'
import { Images } from '../../../constants/index'


const Container = ScreenContainerHOC(ViewHandlingKeyboard)

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
  };

  render() {
    const { navBarTitle, loading } = this.props
    return (
      <Container style={styles.container}>
        <StatusBar
          animated
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <SignUpForm hideKeyboard={this.hideKeyboard} {...this.props} />
        <BackButtonFloating title={navBarTitle} onPress={this.props.goBack} />
        {loading && <LoadingOverlay />}
      </Container>
    )
  }
}
