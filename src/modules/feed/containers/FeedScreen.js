import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'
import moment from 'moment'

import { Feed } from '../components/feed'
import { getCommentsAction } from '../../../redux/actions/async/postAsyncActions'
import { fetchPost } from '../../../redux/actions/sync/postSyncActions'
import { Values } from '../../../constants'

class FeedScreenContainer extends Component {
  static navigationOptions = () => ({
    title: 'Ocorrências Recentes',
    ...Values.navbarStyles.primary
  })

  static propTypes = {
    navigation: object,
    savePost: func,
    getComments: func,
  }

  static defaultProps = {
    navigation: {},
    savePost: () => { },
    getComments: () => { },
  }

  state = {
    posts: [
      {
        id: '1',
        user: {
          id: '123',
          name: 'José da Silva',
          number: 123,
          party: 'PES',
          pageType: 'Presidente'
        },
        contentType: 'Assalto',
        formatedDate: moment().fromNow(),
        interactions: {
          like: {
            isActive: false,
            number: 12,
            onPress: () => { },
          },
          comment: {
            number: 22,
            onPress: () => { },
          },
          share: {
            number: 1,
            onPress: () => { },
          },
        },
        isSubscriber: true,
        menu: {
          buttons: [],
          hideMenuModal: () => { },
          isMenuModalVisible: false,
          showMenuModal: () => { },
        },
        title: 'Título da ocorrencia 1',
        body: 'Texto da publicação está sendo exibida',
        liked: true,
        likesCount: 12,
        commentCount: 22,
        shareCount: 1,
      },
      {
        id: '2',
        user: {
          id: '123',
          name: 'João de Almeida',
          number: 123,
          party: 'PES',
          pageType: 'Presidente',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Christopher_Fabian_profile.jpg'
        },
        contentType: 'Assalto',
        formatedDate: moment().fromNow(),
        images: ['https://www.carlosbritto.com/wp-content/uploads/2017/09/roubo-celulares.jpg'],
        interactions: {
          like: {
            isActive: false,
            number: 12,
            onPress: () => { },
          },
          comment: {
            number: 22,
            onPress: () => { },
          },
          share: {
            number: 1,
            onPress: () => { },
          },
        },
        isSubscriber: true,
        menu: {
          buttons: [],
          hideMenuModal: () => { },
          isMenuModalVisible: false,
          showMenuModal: () => { },
        },
        title: 'Título da ocorrencia 2',
        body: 'Texto da publicação está sendo exibida',
        liked: true,
        likesCount: 12,
        commentCount: 22,
        shareCount: 1,
      },
      {
        id: '3',
        user: {
          id: '123',
          name: 'Anônimo',
          number: 123,
          party: 'PES',
          pageType: 'Presidente'
        },
        contentType: 'Assasinato',
        formatedDate: moment().fromNow(),
        interactions: {
          like: {
            isActive: false,
            number: 12,
            onPress: () => { },
          },
          comment: {
            number: 22,
            onPress: () => { },
          },
          share: {
            number: 1,
            onPress: () => { },
          },
        },
        isSubscriber: true,
        menu: {
          buttons: [],
          hideMenuModal: () => { },
          isMenuModalVisible: false,
          showMenuModal: () => { },
        },
        title: 'Título da ocorrencia 3',
        body: 'Texto da publicação está sendo exibida',
        liked: true,
        likesCount: 12,
        commentCount: 22,
        shareCount: 1,
      }
    ]
  }

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

  render() {
    return (
      <Feed
        feed={this.state.posts}
        isAuthenticated={true}
        onNewPostPress={this.navigateToNewPost}
        onReadMorePress={this.onGoToPostPress}
        onCommentPress={this.onCommentPress}
      />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  savePost: (post, commenting) => dispatch(fetchPost(post, commenting)),
  getComments: postId => dispatch(getCommentsAction(postId)),
})

export const FeedScreen = connect(mapStateToProps, mapDispatchToProps)(FeedScreenContainer)
