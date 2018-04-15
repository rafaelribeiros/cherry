import React, { Component } from 'react'
import { View } from 'react-native'
import { func, string, number, bool } from 'prop-types'

import { FormTitleAndSubtitle } from './formTitleAndSubtitle'
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
    backgroundImage: number,
    signUpProgress: string,
    loading: bool,
    hasPicker: bool,
    title: string,
    subtitle: string,
  }

  static defaultProps = {
    onButtonPress: () => { },
    goBack: () => { },
    backgroundImage: Images.signUp,
    signUpProgress: '0%',
    loading: false,
    hasPicker: false,
    title: '',
    subtitle: '',
  }

  state = {};

  render() {
    const {
      loading,
      title,
      subtitle
    } = this.props
    return (
      <Container style={styles.centeredContainer}>
        <View style={styles.centeredContainer}>
          <FormTitleAndSubtitle title={title} subtitle={subtitle} />
          <SignUpForm {...this.props} />
        </View>
        <BackButtonFloating onPress={this.props.goBack} />
        {loading && <LoadingOverlay />}
      </Container>
    )
  }
}
