import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'
import moment from 'moment'

import { Feed } from '../components/feed'

import { Values } from '../../../constants'

class FeedScreenContainer extends Component {
  static navigationOptions = () => ({
    title: 'Ocorrências Recentes',
    ...Values.navbarStyles.primary
  })

  static propTypes = {
    navigation: object,
  }

  static defaultProps = {
    navigation: {},
  }

  state = {
    posts: [
      {
        id: '1',
        candidate: {
          id: '123',
          name: 'José da Silva',
          number: 123,
          party: 'PES',
          pageType: 'Presidente'
        },
        type: 'Assalto',
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
        candidate: {
          id: '123',
          name: 'João de Almeida',
          number: 123,
          party: 'PES',
          pageType: 'Presidente',
          image: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Christopher_Fabian_profile.jpg'
        },
        type: 'Assalto',
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
        candidate: {
          id: '123',
          name: 'Anônimo',
          number: 123,
          party: 'PES',
          pageType: 'Presidente'
        },
        type: 'Assasinato',
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


  render() {
    return (
      <Feed
        feed={this.state.posts}
        isAdmin={true}
      />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const FeedScreen = connect(mapStateToProps, mapDispatchToProps)(FeedScreenContainer)
