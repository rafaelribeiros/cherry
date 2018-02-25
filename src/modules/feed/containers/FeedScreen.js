import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
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

  test = () => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignIn' })]
    })
    this.props.navigation.dispatch(actionToDispatch)
  }


  render() {
    return (
      <TouchableOpacity onPress={this.test}>
        <View>
          <Text>Next</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const FeedScreen = connect(mapStateToProps, mapDispatchToProps)(FeedScreenContainer)
