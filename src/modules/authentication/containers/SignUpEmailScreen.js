import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import { hideAlert } from '../../../redux/actions/sync/authenticationActions'

import { SignUpEmail } from '../components/signUpEmail'

const navigateToNextScreen = navigate => () => {
  navigate('SignUpPassword')
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
    onButtonPress={navigateToNextScreen(props.navigation.navigate)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  // hideAlert: () => dispatch(hideAlert()),
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
