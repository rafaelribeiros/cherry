import React from 'react'
import { func, shape, object, bool, string } from 'prop-types'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { getAlert, getLoading, getRegData } from '../../../redux/reducers/authentication/selectors'
import { signUpAction } from '../../../redux/actions/async/authenticationAsyncActions'
import { hideAlert } from '../../../redux/actions/sync/authenticationSyncActions'
import { SignUpPassword } from '../components/signUpPassword'


const onSignUp = ({ navigation, regData, signUp }) => async (password) => {
  try {
    const formData = regData
    formData.password = password
    await signUp(formData)
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'home' })]
    })
    navigation.dispatch(actionToDispatch)
  } catch (err) {
    throw err
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
    goBack={navigateBack(props.navigation.goBack, props.hideAlert)}
    onButtonPress={onSignUp(props)}
    onHideAlert={onHideAlert(props.hideAlert)}
    alert={props.alert}
    loading={props.loading}
  />
)

SignUpPasswordContainer.propTypes = {
  hideAlert: func,
  navigation: object,
  alert: shape({
    showAlert: bool,
    message: string,
  }),
  loading: bool,
}

SignUpPasswordContainer.defaultProps = {
  hideAlert: () => { },
  navigation: {},
  alert: {
    showAlert: false,
    message: '',
  },
  loading: false,
}

const mapStateToProps = state => ({
  loading: getLoading(state),
  alert: getAlert(state),
  regData: getRegData(state),
})

const mapDispatchToProps = dispatch => ({
  hideAlert: () => dispatch(hideAlert()),
  signUp: formData => dispatch(signUpAction(formData)),
})

export const SignUpPasswordScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpPasswordContainer)
