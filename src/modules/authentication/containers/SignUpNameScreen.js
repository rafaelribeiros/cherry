import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import { hideAlert } from '../../../redux/actions/sync/authenticationActions'
import { SignUpName } from '../components/signUpName'

const navigateToNextScreen = ({ navigate }) => () => {
  navigate('SignUpEmail')
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
    onButtonPress={navigateToNextScreen(props.navigation)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = dispatch => ({
  // hideAlert: () => dispatch(hideAlert()),
})

SignUpNameContainer.propTypes = {
  hideAlert: PropTypes.func.isRequired,
  navigation: PropTypes.object,
}

SignUpNameContainer.defaultProps = {
  navigation: {},
}

export const SignUpNameScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpNameContainer)
