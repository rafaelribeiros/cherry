import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { setState, hideAlert } from '../../../redux/actions/sync/authenticationSyncActions'

import { SignUpState } from '../components/signUpState'

const navigateToNextScreen = ({ navigation, setUserState }) => (state) => {
  setUserState(state)
  navigation.navigate('SignUpPassword')
}

const navigateBack = ({ navigation, hideAlert }) => () => {
  hideAlert()
  navigation.goBack()
}

const onHideAlert = hideAlert => () => {
  hideAlert()
}

export const SignUpStateContainer = props => (
  <SignUpState
    goBack={navigateBack(props)}
    onButtonPress={navigateToNextScreen(props)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(hideAlert()),
  setUserState: userState => dispatch(setState(userState)),
})

SignUpStateContainer.propTypes = {
  hideAlert: PropTypes.func,
  navigation: PropTypes.object,
}

SignUpStateContainer.defaultProps = {
  hideAlert: () => { },
  navigation: {},
}

export const SignUpStateScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpStateContainer)
