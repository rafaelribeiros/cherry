import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { NavigationActions } from 'react-navigation'

// import { hideAlert } from '../../../redux/actions/sync/authenticationActions'

import { SignUpCity } from '../components/signUpCity'

const onSignUp = ({ navigation, signUp, device, showAlert }) => async (city) => {
  try {
    // const { email, name, password, userState } = navigation.state.params
    // const deviceId = device.userId
    // await signUp(email, name, password, userState, city, deviceId)
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Feed' })]
    })
    navigation.dispatch(actionToDispatch)
  } catch (error) {
    console.log(error)
    //  showAlert(error.message)
  }
}

const navigateBack = goBack => () => {
  goBack()
}

const onHideAlert = hideAlert => () => {
  hideAlert()
}

export const SignUpCityContainer = props => (
  <SignUpCity
    goBack={navigateBack(props.navigation.goBack)}
    onButtonPress={onSignUp(props)}
    onHideAlert={onHideAlert(props.hideAlert)}
  />
)

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  // hideAlert: () => dispatch(hideAlert()),
})

SignUpCityContainer.propTypes = {
  hideAlert: PropTypes.func.isRequired,
  navigation: PropTypes.object,
}

SignUpCityContainer.defaultProps = {
  hideAlert: () => { },
  navigation: {},
}

export const SignUpCityScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpCityContainer)
