import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hideAlert, setEmail } from '../../../redux/actions/sync/authenticationSyncActions'
import { SignUpEmail } from '../components/signUpEmail'

const navigateToNextScreen = ({ navigation, setUserEmail }) => (email) => {
  setUserEmail(email)
  navigation.navigate('SignUpCity')
}

const navigateBack = goBack => () => {
  goBack()
}

const onHideAlert = hideAlert => () => {
  hideAlert()
}

export const SignUpEmailContainer = props => (
  <SignUpEmail
    goBack={navigateBack(props.navigation.goBack)}
    onButtonPress={navigateToNextScreen(props)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(hideAlert()),
  setUserEmail: email => dispatch(setEmail(email))
})

SignUpEmailContainer.propTypes = {
  hideAlert: PropTypes.func.isRequired,
  navigation: PropTypes.object,
}

SignUpEmailContainer.defaultProps = {
  hideAlert: () => { },
  navigation: {},
}

export const SignUpEmailScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpEmailContainer)
