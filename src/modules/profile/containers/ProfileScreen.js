import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'

import { Profile } from '../components/profile'

import { Values } from '../../../constants'


class ProfileScreenContainer extends Component {
  static navigationOptions = () => ({
    title: null,
    ...Values.navbarStyles.primary
  })

  static propTypes = {
    navigation: object,
  }

  static defaultProps = {
    navigation: {},
  }


  render() {
    return (
      <Profile />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreenContainer)
