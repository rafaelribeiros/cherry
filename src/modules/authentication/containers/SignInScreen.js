import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bool, shape, func } from 'prop-types'
import { NavigationActions } from 'react-navigation'

import { signInAction } from '../../../redux/actions/async/authenticationAsyncActions'
import { hideAlert } from '../../../redux/actions/sync/authenticationSyncActions'
import { getLoading, getAlert } from '../../../redux/reducers/authentication/selectors'
import { SignIn } from '../components/signIn'

class SignInContainer extends Component {

  state = {}

  static propTypes = {
    navigation: shape({
      navigate: func
    }),
    hideAlert: func,
    loading: bool,
    signIn: func,
    alert: shape({
      showAlert: bool,
      message: '',
    }),
  }

  static defaultProps = {
    navigation: {
      navigate: () => { }
    },
    hideAlert: () => { },
    loading: false,
    signIn: () => { },
    alert: { showAlert: false, message: '' },
  }

  goBack = () => {
    this.props.hideAlert()
    this.props.navigation.goBack()
  }

  onSignIn = async (email, password) => {
    try {
      await this.props.signIn(email, password)
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'home' })]
      })
      this.props.navigation.dispatch(actionToDispatch)
    } catch (error) {
      console.log(error)
    }
  }

  goToSignUp = () => {
    this.props.navigation.navigate('SignUpEmail')
  }

  render() {
    return (
      <SignIn
        navigateToSignUp={this.goToSignUp}
        onButtonPress={this.onSignIn}
        goBack={this.goBack}
        loading={this.props.loading}
        alert={this.props.alert}
      />
    )
  }
}

const mapStateToProps = state => ({
  loading: getLoading(state),
  alert: getAlert(state),
})

const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => dispatch(signInAction(email, password)),
  hideAlert: () => dispatch(hideAlert())
})

export const SignInScreen = connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
