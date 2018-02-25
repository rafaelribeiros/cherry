import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'

import { MapComponent } from '../components/map'

import { Values } from '../../../constants'


class MapScreenContainer extends Component {
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
      <MapComponent
        feed={[]}
      />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const MapScreen = connect(mapStateToProps, mapDispatchToProps)(MapScreenContainer)
