import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import { hideAlert } from '../../../redux/actions/sync/authenticationActions'

import { SignUpState } from '../components/signUpState'

const navigateToNextScreen = ({ navigate, state }) => (userState) => {
  const { email, name, password } = state.params
  navigate('SignUpCity', { email, name, password, userState })
}

const navigateBack = goBack => () => {
  goBack()
}

const onHideAlert = hideAlert => () => {
  hideAlert()
}

export const SignUpStateContainer = props => (
  <SignUpState
    goBack={navigateBack(props.navigation.goBack)}
    onButtonPress={navigateToNextScreen(props.navigation)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  // hideAlert: () => dispatch(hideAlert()),
})

SignUpStateContainer.propTypes = {
  hideAlert: PropTypes.func.isRequired,
  navigation: PropTypes.object,
}

SignUpStateContainer.defaultProps = {
  hideAlert: () => { },
  navigation: {},
}

export const SignUpStateScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpStateContainer)
