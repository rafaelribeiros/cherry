import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Welcome } from '../components/welcome'

class WelcomeContainer extends Component {

   static propTypes = {
    navigator: PropTypes.object
  }
  static defaultProps = {
    navigator: {}
  }

  state = {}

  render() {
    return (
      <Welcome />
    )
  }
}


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const WelcomeScreen = connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
