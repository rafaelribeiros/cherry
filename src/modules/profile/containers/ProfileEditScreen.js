import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, bool, shape } from 'prop-types'

import { updateProfileAction } from '../../../redux/actions/async/profileAsyncActions'

import { ProfileEdit } from '../components/profileEdit'

import { userDefaultProps, userPropTypes } from '../../shared/propTypes/userPropTypes'
import { getUser } from '../../../redux/reducers/authentication/selectors'
import { getLoading } from '../../../redux/reducers/profile/selectors'
import { Values } from '../../../constants'

class ProfileEditContainer extends Component {

  static navigationOptions = () => ({
    ...Values.navbarStyles.primary
  })

  static defaultProps = {
    updateProfile: () => { },
    navigation: {},
    user: userDefaultProps,
    loading: false
  }

  static propTypes = {
    updateProfile: func,
    navigation: object,
    user: shape(userPropTypes),
    loading: bool,
  }

  state = {}

  submitProfile = async ({
    name,
    image,
    city,
    state
  }) => {
    await this.props.updateProfile(name, image, city, state)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <ProfileEdit
        loading={this.props.loading}
        onSubmitPress={this.submitProfile}
        user={this.props.user}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  loading: getLoading(state),
})

const mapDispatchToProps = dispatch => ({
  updateProfile: (name, image, city, state) => dispatch(updateProfileAction(name, image, city, state)),
})

export const ProfileEditScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileEditContainer)
