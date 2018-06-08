import React, { Component } from 'react'
import { FlatList, View, Platform, RefreshControl, InteractionManager, PermissionsAndroid, Alert } from 'react-native'
import { func, bool, arrayOf, shape, string, number } from 'prop-types'

import MapView, { Marker } from 'react-native-maps'
import _ from 'lodash'

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

  componentDidMount = () => InteractionManager.runAfterInteractions(async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Civita Permissão de Localização',
          message: 'Civita precisa de acesso a sua localização ' +
          'para enviar informações sobre eventos próximos a você.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude } = position.coords
            const { longitude } = position.coords
            this.setState({
              isRendering: false,
              region: {
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }
            })
          }, async () => {
            const { lat, lng } = this.props.userLoc
            this.setState({
              isRendering: false,
              region: {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
              }
            })
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3000
          }
        )
      } else {
        this.setState({ isRendering: false })
        this.showAlert('Permissão não concedida', '')
      }
    } catch (error) {
      this.setState({ isRendering: false })
      this.showAlert(error.message, '')
    }
  })

  showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })

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
    this.setState({ region })
    _.debounce(() => {
      if (!this.props.isLoadingPosts) {
        this.props.onRefreshPosts(region.latitude, region.longitude)
      }
    }, 300)()
  }

  renderMark = (marker) => {
    const [longitude, latitude] = marker.loc.coordinates
    return (
      <Marker
        coordinate={{ latitude, longitude }}
        title={marker.contentType}
        description={marker.body}
      />
    )
  }

  render() {
    return (
      <View style={styles.container} >
        <StatusBarStandard />
        {
         (this.state.isRendering === false) &&
         <MapView
           style={styles.map}
           region={this.state.region}
           onRegionChangeComplete={this.onRegionChange}
         >
           {this.props.feed.map(marker => this.renderMark(marker))}
         </MapView>
         }
      </View>
    )
  }
}
