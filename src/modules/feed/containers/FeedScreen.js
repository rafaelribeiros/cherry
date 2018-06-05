import React, { Component } from 'react'
import { View, Text, TouchableOpacity, InteractionManager, PermissionsAndroid, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'

import { Feed } from '../components/feed'
import { getCommentsAction } from '../../../redux/actions/async/postAsyncActions'
import { getPostsAction } from '../../../redux/actions/async/feedAsyncActions'
import { fetchPost } from '../../../redux/actions/sync/postSyncActions'
import { Values } from '../../../constants'
import { getPosts, getLoadingPosts, getPostsEndReached } from '../../../redux/reducers/feed/selectors'
import { getUser } from '../../../redux/reducers/authentication/selectors'

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
        navigator.geolocation.getCurrentPosition(async (position) => {
          console.log(position)
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          await this.props.fetchPosts(0, lat, lng)
        }, () => {
          this.showAlert('Atenção', 'Sua localização está desativada.')
        })
      } else {
        this.showAlert('Permissão não concedida', '')
      }
    } catch (error) {
      this.showAlert(error.message, '')
    }
  }
  showAlert = (title, text) => Alert.alert(title, text, [{ text: 'OK', onPress: () => { } }], { cancelable: true })
  navigateToNewPost = () => this.props.navigation.navigate('PublishPost')
  onGoToPostPress = (post) => {
    const commenting = false
    this.props.savePost(post, commenting)
    // this.props.getComments(post.id)
    this.props.navigation.navigate('Post', { post })
  }
  onCommentPress = (post) => {
    console.log('passou')
    const commenting = true
    this.props.savePost(post, commenting)
    // this.props.getComments(post.id)
    this.props.navigation.navigate('Post', { post })
  }
  onPlacePress = () => {
    this.props.navigation.navigate('Map')
  }

  render() {
    return (
      <Feed
        feed={this.props.posts}
        isAuthenticated
        // isAuthenticated={this.props.user.isAuthenticated}
        onNewPostPress={this.navigateToNewPost}
        onReadMorePress={this.onGoToPostPress}
        onCommentPress={this.onCommentPress}
        onPlacePress={this.onPlacePress}
        onRefreshPosts={this.getLocalPosts}
      />
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  isLoadingPosts: getLoadingPosts(state),
  hasPostsEndReached: getPostsEndReached(state),
  posts: getPosts(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: (skip, lat, lng) => dispatch(getPostsAction(skip, lat, lng)),
  savePost: (post, commenting) => dispatch(fetchPost(post, commenting)),
  getComments: postId => dispatch(getCommentsAction(postId)),
})

export const FeedScreen = connect(mapStateToProps, mapDispatchToProps)(FeedScreenContainer)
