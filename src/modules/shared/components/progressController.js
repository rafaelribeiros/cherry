import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { styles } from './styles/videoPlayer.style'
import { Colors } from '../../../constants'

const radiusOfHolder = 5
const radiusOfActiveHolder = 7

export class ProgressController extends Component {

  constructor(props, context, ...args) {
    super(props, context, ...args)
    this.state = { lineX: new Animated.Value(0), slideX: new Animated.Value(0), width: 0 }
    this.onLayout = this.onLayout.bind(this)
    this.onLinePressed = this.onLinePressed.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.moving) {
      this.state.slideX.setValue(this.computeScreenX(nextProps.percent))
    }
  }

  computeScreenX(percent) {
    return percent * (this.state.width / 100)
  }

  componentWillMount() {
    this.holderPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        const { slideX } = this.state
        this.setState({ moving: true })
        slideX.setOffset(slideX._value)
        slideX.setValue(0)
      },
      onPanResponderMove: (e, gestureState) => {
        const totalX = this.state.slideX._offset + gestureState.dx
        const newPercent = (totalX / this.state.width) * 100
        this.notifyPercentChange(newPercent, true)
        Animated.event([
          null, { dx: this.state.slideX }
        ])(e, gestureState)
      },
      onPanResponderRelease: () => {
        this.state.slideX.flattenOffset()
        const newPercent = (this.state.slideX._value / this.state.width) * 100
        this.setState({ moving: false })
        this.notifyPercentChange(newPercent, false)
      }
    })
  }

  notifyPercentChange(newPercent, paused) {
    const { onNewPercent } = this.props
    if (onNewPercent instanceof Function) {
      onNewPercent(newPercent, paused)
    }
  }

  onLayout(e) {
    this.setState({ width: e.nativeEvent.layout.width - (radiusOfHolder * 2) })
  }

  getHolderStyle() {
    const { moving, slideX, width } = this.state
    if (width > 0) {
      const interpolatedAnimation = slideX.interpolate({
        inputRange: [0, width],
        outputRange: [0, width],
        extrapolate: 'clamp'
      })
      return [styles.holder, moving && styles.activeHolder,
        { transform: [{ translateX: interpolatedAnimation }] }
      ]
    }
    return [styles.holder]
  }

  onLinePressed(e) {
    const newPercent = (e.nativeEvent.locationX / this.state.width) * 100
    this.notifyPercentChange(newPercent, false)
  }

  formatSeconds(sec = 0) {
    const { duration = 0 } = this.props
    const seconds = Math.min(Math.max(sec, 0), duration)
    const minutes = seconds / 60
    const remainingSeconds = seconds % 60
    return `${_.padStart(minutes.toFixed(0), 2, 0)}:${_.padStart(remainingSeconds.toFixed(0), 2, 0)}`
  }

  render() {
    const { moving } = this.state
    const { currentTime, duration, percent } = this.props
    return (
      <View style={styles.view}>
        <Text style={[styles.timeText, { marginRight: 10 }]}>{this.formatSeconds(currentTime)}</Text>
        <View
          style={styles.barView}
          onLayout={this.onLayout}
          {...this.holderPanResponder.panHandlers}
        >
          <View style={{ flexDirection: 'row', top: moving ? radiusOfActiveHolder : radiusOfHolder }}>
            <TouchableOpacity
              style={[styles.line, { flex: percent, borderColor: Colors.primary }]}
              onPress={this.onLinePressed}
            />
            <TouchableOpacity
              style={[styles.line, { flex: 100 - percent, borderColor: 'white' }]}
              onPress={this.onLinePressed}
            />
          </View>
          <Animated.View style={this.getHolderStyle()} />
        </View>
        <Text style={[styles.timeText, { marginLeft: 10 }]}>{this.formatSeconds(duration)}</Text>
      </View>
    )
  }
}

ProgressController.propTypes = {
  currentTime: PropTypes.number,
  percent: PropTypes.number,
  onNewPercent: PropTypes.func,
  duration: PropTypes.number
}

ProgressController.defaultProps = {
  currentTime: 0,
  percent: 0,
  onNewPercent: () => { },
  duration: 0
}
