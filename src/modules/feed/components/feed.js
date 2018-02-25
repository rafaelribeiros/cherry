import React, { Component } from 'react'
import { FlatList, View, Platform, RefreshControl, InteractionManager } from 'react-native'
import { func, bool, arrayOf, shape, string, number } from 'prop-types'

import { StatusBarStandard } from '../../shared/components/statusBarStandard'

import { Colors, Metrics } from '../../../constants'

import { styles } from './styles/feed.style'

export class Feed extends Component {

  state = {
    isRendering: true,
    refreshing: false,
  }

  // componentDidMount = () => InteractionManager.runAfterInteractions(() => this.setState({ isRendering: false }))

  render() {
    return (
      <View style={styles.container} >
        <StatusBarStandard />
      </View >
    )
  }
}
