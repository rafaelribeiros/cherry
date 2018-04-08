import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import PropTypes from 'prop-types'
import { Metrics } from '../../../constants'

export class HideableView extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    isVisible: PropTypes.bool.isRequired,
    maxHeight: PropTypes.number.isRequired,
  }
  static defaultProps = {
    children: null,
  }

  state = {
    opacity: new Animated.Value(this.props.isVisible ? 1 : 0),
    maxHeight: new Animated.Value(this.props.isVisible ? this.props.maxHeight : 0),
    isVisible: this.props.isVisible
  }

  componentDidMount = () => {
    this.setState(HideableView.switchVisibility(this.props, this.state))
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (nextProps.isVisible !== prevState.isVisible) {
      return HideableView.switchVisibility(nextProps, prevState)
    }
    return null
  }

  static switchVisibility = ({ isVisible, maxHeight }, state) => {
    const [opacityValue, opacityDelay, maxHeightValue] = isVisible ? [1, 0, maxHeight] : [0, 100, 0]
    Animated.parallel([
      Animated.timing(
        state.opacity,
        {
          toValue: opacityValue,
          duration: Metrics.animation.fast,
          delay: opacityDelay
        }
      ),
      Animated.timing(
        state.maxHeight,
        {
          toValue: maxHeightValue,
          duration: Metrics.animation.standard,
        }
      )
    ]).start()
    return { isVisible }
  }

  render() {
    const { children } = this.props
    const { opacity, maxHeight } = this.state
    return (
      <Animated.View style={{ opacity, maxHeight }}>
        {children}
      </Animated.View>
    )
  }
}
