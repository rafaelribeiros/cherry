import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { SignUpPassword } from '../components/signUpPassword'


const navigateToNextScreen = ({ navigate, state }) => (password) => {
  const { email, name } = state.params
  navigate('SignUpState', { email, name, password })
}

const navigateBack = goBack => () => goBack()

export const SignUpPasswordContainer = props => (
  <SignUpPassword
    goBack={navigateBack(props.navigation.goBack)}
    onButtonPress={navigateToNextScreen(props.navigation)}
  />
)

SignUpPasswordContainer.propTypes = {
  navigation: PropTypes.object,
}

SignUpPasswordContainer.defaultProps = {
  navigation: {},
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export const SignUpPasswordScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpPasswordContainer)
