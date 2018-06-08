import React, { Component } from 'react'
import { View, Text, TouchableOpacity, InteractionManager, PermissionsAndroid, Alert, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'

import { Feed } from '../components/feed'
// import { getCommentsAction } from '../../../redux/actions/async/postAsyncActions'
import {
  getPostsAction,
  refreshPostsAction,
  deletePostAction,
  votePostAction,
  getCommentsAction,
} from '../../../redux/actions/async/feedAsyncActions'
import { fetchPost } from '../../../redux/actions/sync/postSyncActions'
import { Values } from '../../../constants'
import { getPosts, getLoadingPosts, getPostsEndReached, getUserLocation } from '../../../redux/reducers/feed/selectors'
import { getUser } from '../../../redux/reducers/authentication/selectors'
import { setLocation } from '../../../redux/actions/sync/feedSyncActions'

class FeedScreenContainer extends Component {
  static navigationOptions = () => ({
    title: 'Ocorrências Recentes',
    ...Values.navbarStyles.primary
  })

  static propTypes = {
    navigation: object,
    savePost: func,
    getComments: func,
    fetchPosts: func,
  }

  static defaultProps = {
    navigation: {},
    savePost: () => { },
    getComments: () => { },
    fetchPosts: () => { },
  }

  state = {}

  componentDidMount = () => {
    InteractionManager.runAfterInteractions(() => {
      this.getLocalPosts()
    })
  }

  getLocalPosts = async () => {
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
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const loc = { lat, lng }
            AsyncStorage.setItem('loc', JSON.stringify(loc)).then(() => { })
            this.props.setUserLocation(loc)
            await this.props.fetchPosts(0, lat, lng)
          }, async () => {
            const { lat, lng } = this.props.userLoc
            this.props.fetchPosts(0, lat, lng)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3000
          }
        )
      } else {
        this.showAlert('Permissão não concedida', '')
      }
    } catch (error) {
      this.showAlert(error.message, '')
    }
  }
  refreshPosts = async () => {
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
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const loc = { lat, lng }
            AsyncStorage.setItem('loc', JSON.stringify(loc)).then(() => { })
            this.props.setUserLocation(loc)
            await this.props.refreshPosts(lat, lng)
          }, async () => {
            const { lat, lng } = this.props.userLoc
            await this.props.refreshPosts(lat, lng)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 3000
          }
        )
      } else {
        this.showAlert('Permissão não concedida', '')
      }
    } catch (error) {
      this.showAlert(error.message, '')
    }
  }
  showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })
  navigateToNewPost = () => this.props.navigation.navigate('PublishPost')
  // navigateToNewPost = () => this.props.navigation.navigate('VerifyAccount')

  onGoToPostPress = (post) => {
    const commenting = false
    this.props.savePost(post, commenting)
    this.props.getComments(post.id)
    this.props.navigation.navigate('Post', { post })
  }
  onCommentPress = (post) => {
    const commenting = true
    this.props.savePost(post, commenting)
    this.props.getComments(post.id)
    this.props.navigation.navigate('Post', { post })
  }
  onPlacePress = () => {
    this.props.navigation.navigate('Map')
  }

  render() {
    console.log(this.props.userLoc)
    return (
      <Feed
        feed={this.props.posts}
        user={this.props.user}
        isAuthenticated
        // isAuthenticated={this.props.user.isAuthenticated}
        onNewPostPress={this.navigateToNewPost}
        onReadMorePress={this.onGoToPostPress}
        onCommentPress={this.onCommentPress}
        onPlacePress={this.onPlacePress}
        onRefreshPosts={this.refreshPosts}
        isLoadingPosts={this.props.isLoadingPosts}
        onDeletePress={this.props.deletePost}
        onPositivePress={this.props.votePositive}
        onNegativePress={this.props.voteNegative}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  isLoadingPosts: getLoadingPosts(state),
  hasPostsEndReached: getPostsEndReached(state),
  posts: getPosts(state),
  userLoc: getUserLocation(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: (skip, lat, lng) => dispatch(getPostsAction(skip, lat, lng)),
  refreshPosts: (lat, lng) => dispatch(refreshPostsAction(lat, lng)),
  savePost: (post, commenting) => dispatch(fetchPost(post, commenting)),
  getComments: postId => dispatch(getCommentsAction(postId)),
  deletePost: postId => dispatch(deletePostAction(postId)),
  votePositive: (postId, vote) => dispatch(votePostAction(postId, vote)),
  voteNegative: (postId, vote) => dispatch(votePostAction(postId, vote)),
  setUserLocation: loc => dispatch(setLocation(loc)),
})

export const FeedScreen = connect(mapStateToProps, mapDispatchToProps)(FeedScreenContainer)
