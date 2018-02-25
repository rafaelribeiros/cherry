import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { func, array, bool, object, shape, string, number } from 'prop-types'


class FeedScreenContainer extends Component {
  static navigationOptions = () => ({
    title: 'Ocorrências',
  })

  static propTypes = {
    navigation: object,
  }

  static defaultProps = {
    navigation: {},
  }


  render() {
    return (
      <View />
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const FeedScreen = connect(mapStateToProps, mapDispatchToProps)(FeedScreenContainer)
