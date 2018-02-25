import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'

import { Metrics } from '../../../constants'
import { styles } from './styles/formErrorMessage.style'

export class FormErrorMessage extends PureComponent {
  state = {
    messageOpacity: new Animated.Value(0),
    isVisible: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.isVisible !== nextProps.isVisible) {
      if (nextProps.isVisible) {
        this.showMessage()
      } else {
        this.hideMessage()
      }
      this.setState({ isVisible: nextProps.isVisible })
    }
  }

  showMessage = () => (
    Animated.timing(
      this.state.messageOpacity,
      {
        toValue: 1,
        duration: 275,
      }
    ).start()
  )
  hideMessage = () => (
    Animated.timing(
      this.state.messageOpacity,
      {
        toValue: 0,
        duration: 100,
      }
    ).start()
  )

  render() {
    const { message } = this.props
    return (
      <Animated.Text
        style={[
          styles.errorMessage,
          {
            opacity: this.state.messageOpacity,
            maxHeight: this.state.messageOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, Metrics.maxErrorMessageHeight]
            }),
            paddingVertical: this.state.messageOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, Metrics.tinySpacing]
            }),
          }
        ]}
      >
        {message}
      </Animated.Text>
    )
  }
}

FormErrorMessage.propTypes = {
  message: PropTypes.string,
  isVisible: PropTypes.bool,
}

FormErrorMessage.defaultProps = {
  message: '',
  isVisible: false
}
