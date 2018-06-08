import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'

import { MapComponent } from '../components/map'

import { Values } from '../../../constants'
import { getPosts, getUserLocation, getLoadingPosts } from '../../../redux/reducers/feed/selectors'
import { refreshPostsAction } from '../../../redux/actions/async/feedAsyncActions'


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
        feed={this.props.posts}
        onRefreshPosts={this.props.refreshPosts}
        userLoc={this.props.userLoc}
        isLoadingPosts={this.props.isLoadingPosts}
      />
    )
  }
}

const mapStateToProps = state => ({
  posts: getPosts(state),
  userLoc: getUserLocation(state),
  isLoadingPosts: getLoadingPosts(state),
})

const mapDispatchToProps = dispatch => ({
  refreshPosts: (lat, lng) => dispatch(refreshPostsAction(lat, lng)),
})

export const MapScreen = connect(mapStateToProps, mapDispatchToProps)(MapScreenContainer)
