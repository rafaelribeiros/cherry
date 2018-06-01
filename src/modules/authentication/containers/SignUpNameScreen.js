import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hideAlert, setName } from '../../../redux/actions/sync/authenticationSyncActions'
import { SignUpName } from '../components/signUpName'

const navigateToNextScreen = ({ navigation, setUserName }) => (name) => {
  setUserName(name)
  navigation.navigate('SignUpEmail')
}

const navigateBack = goBack => () => {
  goBack()
}

const onHideAlert = hideAlert => () => {
  hideAlert()
}

export const SignUpNameContainer = props => (
  <SignUpName
    goBack={navigateBack(props.navigation.goBack)}
    onButtonPress={navigateToNextScreen(props)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(hideAlert()),
  setUserName: name => dispatch(setName(name))
})

SignUpNameContainer.propTypes = {
  hideAlert: PropTypes.func.isRequired,
  navigation: PropTypes.object,
}

SignUpNameContainer.defaultProps = {
  navigation: {},
}

export const SignUpNameScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpNameContainer)
