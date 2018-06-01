import React, { Component } from 'react'
import { Alert, Platform, Linking, Share, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bool, func, object, shape } from 'prop-types'
// import Config from 'react-native-config'
import { NavigationActions } from 'react-navigation'

// import { getUserProfileAction } from '../../../redux/actions/async/profileAsyncActions'
// import { logoutAction } from '../../../redux/actions/async/authenticationAsyncActions'

import { Profile } from '../components/profile'
import { userPropTypes, userDefaultProps } from '../../shared/propTypes/userPropTypes'
import { getLoading } from '../../../redux/reducers/profile/selectors'
import { getUser } from '../../../redux/reducers/authentication/selectors'

import { Values } from '../../../constants'
import {
  APP_REQUEST_FAIL,
  EMAIL_SUBJECTS,
  POST_REQUEST_FAIL,
  SHARE_APP_MESSAGE,
} from '../../../constants/messages'

const Config = ''

class ProfileScreenContainer extends Component {
  static navigationOptions = { header: null }

  static defaultProps = {
    getProfile: () => { },
    // logout: () => { },
    navigation: userDefaultProps,
    user: {},
    loading: false
  }

  static propTypes = {
    getProfile: func,
    // logout: func,
    navigation: object,
    user: shape(userPropTypes),
    loading: bool,
  }

  state = {
    refreshing: false,
  }

  componentDidMount = () => this.props.getProfile()

  onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.getProfile()
    this.setState({ refreshing: false })
  }

  logout = async () => {
    try {
      // await this.props.logout()
      AsyncStorage.removeItem('profile').then(async () => { })
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'auth' })]
      })
      this.props.navigation.dispatch(actionToDispatch)
    } catch (error) {
      alert(error.message)
    }
  }

  showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })

  navigateToAdmin = () => this.props.navigation.navigate('Admins')

  navigateEditProfile = (isAdmin) => {
    if (!isAdmin) {
      this.props.navigation.navigate('ProfileEdit')
    } else {
      this.props.navigation.navigate('PageEdit', { func: () => { } })
    }
  }

  navigateToEmailApp = (subjectType) => {
    const email = `mailto:${Config.EMAIL_ADDRESS}?subject=${EMAIL_SUBJECTS[subjectType]}`
    Linking.canOpenURL(email).then((supported) => {
      if (!supported) {
        return this.showAlert('Erro ao abrir', APP_REQUEST_FAIL('um aplicativo de e-mail'))
      }
      return Linking.openURL(email)
    }).catch(() => this.showAlert('Erro ao abrir', APP_REQUEST_FAIL('um aplicativo de e-mail')))
  }

  navigateToStore = () => {
    return Linking.canOpenURL(Values.STORE_LINK).then((supported) => {
      if (!supported) {
        return this.showAlert('Erro ao abrir', APP_REQUEST_FAIL('a loja de aplicativos'))
      }
      return Linking.openURL(Values.STORE_LINK)
    }).catch(() => this.showAlert('Erro ao abrir', APP_REQUEST_FAIL('a loja de aplicativos')))
  }

  onSharePress = () => {
    try {
      Share
        .share(
          {
            ...Platform.select({
              ios: {
                message: `${SHARE_APP_MESSAGE}`,
                url: Config.STORES_URL,
              },
              android: {
                message: `${SHARE_APP_MESSAGE} ${Config.STORES_URL}`
              }
            }),
            title: Config.APP_NAME,
          },
          {
            ...Platform.select({
              ios: {
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToTwitter'
                ]
              },
              android: {
                dialogTitle: `Compartilhar ${Config.APP_NAME} `
              }
            })
          }
        )
    } catch (error) {
      this.showAlert('Erro ao compartilhar', POST_REQUEST_FAIL('compartilhar'))
    }
  }

  render() {
    return (
      <Profile
        user={this.props.user}
        logout={this.logout}
        onEditAdminPress={this.navigateToAdmin}
        onEditProfilePress={this.navigateEditProfile}
        onViewProfilePress={() => { }}
        onHelpPress={() => this.navigateToEmailApp('HELP')}
        onInvitePress={this.onSharePress}
        onRateAppPress={this.navigateToStore}
        loading={this.props.loading}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  loading: getLoading(state),
})

const mapDispatchToProps = () => ({
  // getProfile: () => dispatch(getUserProfileAction()),
  // logout: () => dispatch(logoutAction()),
})

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreenContainer)
