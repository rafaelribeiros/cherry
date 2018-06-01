import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { hideAlert, setCity } from '../../../redux/actions/sync/authenticationSyncActions'

import { SignUpCity } from '../components/signUpCity'

const onSignUp = ({ navigation, setUserCity }) => async (city) => {
  setUserCity(city)
  navigation.navigate('SignUpState')
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
  hideAlert: () => dispatch(hideAlert()),
  setUserCity: city => dispatch(setCity(city))
})

SignUpCityContainer.propTypes = {
  hideAlert: PropTypes.func,
  navigation: PropTypes.object,
}

SignUpCityContainer.defaultProps = {
  hideAlert: () => { },
  navigation: {},
}

export const SignUpCityScreen = connect(mapStateToProps, mapDispatchToProps)(SignUpCityContainer)
