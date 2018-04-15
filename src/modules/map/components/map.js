import React, { Component } from 'react'
import { FlatList, View, Platform, RefreshControl, InteractionManager } from 'react-native'
import { func, bool, arrayOf, shape, string, number } from 'prop-types'

import MapView from 'react-native-maps'

import { StatusBarStandard } from '../../shared/components/statusBarStandard'

import { Colors, Metrics } from '../../../constants'

import { styles } from './styles/map.style'

export class MapComponent extends Component {

  state = {
    isRendering: true,
    refreshing: false,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  }

  // componentDidMount = () => InteractionManager.runAfterInteractions(() => this.setState({ isRendering: false }))

  getInitialState = () => {
    return {
      region: {
        latitude: 20.3297200,
        longitude: -40.2925000,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    }
  }

  onRegionChange = (region) => {
    console.log(region)
    this.setState({ region })
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBarStandard />
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChange}
        />
      </View >
    )
  }
}
