import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, object, bool, shape } from 'prop-types'

import { updateProfileAction } from '../../../redux/actions/async/profileAsyncActions'

import { ProfileEdit } from '../components/profileEdit'

import { userDefaultProps, userPropTypes } from '../../shared/propTypes/userPropTypes'
// import { getUser } from '../../../redux/reducers/authentication/selectors'
import { getLoading } from '../../../redux/reducers/profile/selectors'

class ProfileEditContainer extends Component {

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

  state = {
    user: {
      id: '1',
      name: 'Aline Moura',
      imageUrl: 'http://writestylesonline.com/wp-content/uploads/2017/03/Michele-Lando-Circle-3.8.17_smaller.png',
      image: 'http://writestylesonline.com/wp-content/uploads/2017/03/Michele-Lando-Circle-3.8.17_smaller.png'
    }
  }

  submitProfile = async ({ name, image }) => {
    await this.props.updateProfile(name, image)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <ProfileEdit
        loading={this.props.loading}
        onSubmitPress={this.submitProfile}
        user={this.state.user}
      />
    )
  }
}

const mapStateToProps = state => ({
  // user: getUser(state),
  loading: getLoading(state),
})

const mapDispatchToProps = dispatch => ({
  // updateProfile: (name, image) => dispatch(updateProfileAction(name, image)),
})

export const ProfileEditScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileEditContainer)
