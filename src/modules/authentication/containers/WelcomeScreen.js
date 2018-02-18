import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { bool, string, shape, func } from 'prop-types'
import { connect } from 'react-redux'

export class WelcomeContainer extends Component {
  static propTypes = {
    navigation: shape({
      navigate: func
    }),
  }

  static defaultProps = {
    navigation: {
      navigate: () => { }
    },
  }

  render() {
    return (
      <View>
        <Text>OI</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const WelcomeScreen = connect(
  mapStateToProps, mapDispatchToProps
)(WelcomeContainer)
