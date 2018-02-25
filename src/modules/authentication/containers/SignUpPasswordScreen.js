import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation'

// import { signUpAction } from '../../../redux/actions/async/authenticationAsyncActions'
// import { hideAlert, showAlert } from '../../../redux/actions/sync/authenticationActions'
import { SignUpPassword } from '../components/signUpPassword'


const onSignUp = ({ navigation, signUp, device, showAlert }) => async (password) => {
  try {
    const { email, name } = navigation.state.params
    const deviceId = device.userId
    await signUp(email, name, password, deviceId)
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'home' })]
    })
    navigation.dispatch(actionToDispatch)
  } catch (error) {
    showAlert(error.message)
  }
}

const navigateBack = (goBack, hideAlert) => () => {
  hideAlert()
  goBack()
}

const onHideAlert = hideAlert => () => {
  hideAlert()
}

export const SignUpPasswordContainer = props => (
  <SignUpPassword
    goBack={navigateBack(props.navigation.goBack, onHideAlert(props.hideAlert))}
    onButtonPress={onSignUp(props)}
    loading={props.loading}
    alert={props.alert}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

SignUpPasswordContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
  hideAlert: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  loading: PropTypes.bool,
  alert: PropTypes.shape({
    showAlert: PropTypes.bool,
    message: PropTypes.string,
  }),
}

SignUpPasswordContainer.defaultProps = {
  signUp: () => { },
  hideAlert: () => { },
  navigation: {},
  loading: false,
  alert: { showAlert: false, message: '' }
}

const mapStateToProps = state => ({
  // loading: state.auth.loading,
  // alert: state.auth.alert,
  // device: state.auth.device
})

const mapDispatchToProps = dispatch => ({
  // signUp: (email, name, password, deviceId) => dispatch(signUpAction(email, name, password, deviceId)),
  // hideAlert: () => dispatch(hideAlert()),
  // showAlert: message => dispatch(showAlert(message))
})

export const SignUpPasswordScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpPasswordContainer)
