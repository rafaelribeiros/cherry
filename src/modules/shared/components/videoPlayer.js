import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Animated } from 'react-native'

import PropTypes from 'prop-types'
import Video from 'react-native-video'

import { ProgressController } from './progressController'
import { LoadingSpinner } from './loadingSpinner'

import { styles } from './styles/videoPlayer.style'
import { Colors } from '../../../constants'
import { IconButton } from './iconButton'
import { Metrics } from '../../../constants/metrics'

const FORWARD_DURATION = 7

export class VideoPlayer extends Component {
  static propTypes = {
    source: PropTypes.object,
    hideControllers: PropTypes.bool,
  }
  static defaultProps = {
    source: { uri: '' },
    hideControllers: true,
  }

  state = {
    paused: false,
    immersion: this.props.hideControllers,
    immersionOpacity: new Animated.Value(1),
    isBuffering: false,
    source: this.props.source
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.immersion !== nextProps.hideControllers) {
      if (nextProps.hideControllers) {
        this.activateImmersion()
      } else {
        this.deactivateImmersion()
      }
      this.setState({ immersion: nextProps.hideControllers })
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevState.ended && this.state.ended) this.videoPlayer.seek(0)
  }

  deactivateImmersion = () => {
    Animated.timing(
      this.state.immersionOpacity,
      { toValue: 1 }
    ).start()
  }
  activateImmersion = () => {
    Animated.timing(
      this.state.immersionOpacity,
      { toValue: 0 }
    ).start()
  }

  onVideoEnd = () => {
    this.setState({
 key: new Date(), currentTime: 0, paused: true, ended: true 
})
  }

  onVideoLoad = (e) => {
    this.setState({ currentTime: e.currentTime, duration: e.duration })
  }

  onProgress = (e) => {
    this.setState({ currentTime: e.currentTime })
  }

  playOrPauseVideo = (paused) => {
    this.props.onContentTouch()
    this.setState({ paused: !paused, ended: false })
  }

  onBackward = (currentTime) => {
    const newTime = Math.max(currentTime - FORWARD_DURATION, 0)
    this.videoPlayer.seek(newTime)
    this.setState({ currentTime: newTime })
  }

  onForward = (currentTime, duration) => {
    if (currentTime + FORWARD_DURATION > duration) {
      this.onVideoEnd()
    } else {
      const newTime = currentTime + FORWARD_DURATION
      this.videoPlayer.seek(newTime)
      this.setState({ currentTime: newTime })
    }
  }

  getCurrentTimePercentage = (currentTime, duration) => {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration)
    }
    return 0
  }

  onProgressChanged = (newPercent, paused) => {
    const { duration } = this.state
    const newTime = newPercent * (duration / 100)
    this.setState({ currentTime: newTime, paused })
    this.videoPlayer.seek(newTime)
  }

  renderVideoIcon = (paused, hideControllers) => {
    if (paused || !hideControllers) {
      const iconName = (paused) ? 'play-circle' : 'pause-circle'
      return (
        <Animated.View
          style={[
            styles.videoIcon,
            { opacity: paused ? 1 : this.state.immersionOpacity }
          ]}
        >
          <IconButton
            name={iconName}
            size={Metrics.icons.xxl}
            width={Metrics.icons.xxl}
            color={Colors.whiteSecondary}
            style={{ backgroundColor: 'transparent' }}
            onPress={() => this.playOrPauseVideo(paused)}
          />
        </Animated.View>
      )
    }
    return null
  }

  renderLoading = () => {
    return (
      <View style={styles.videoIcon} >
        <LoadingSpinner spinnerColor={Colors.primary} />
      </View>
    )
  }

  render() {
    const { onContentTouch, hideControllers } = this.props
    const {
 currentTime, duration, paused, immersionOpacity, isBuffering 
} = this.state
    const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onContentTouch}>
          <View style={styles.videoContainer}>
            <Video
              muted={false}
              style={styles.videoContainer}
              ref={(p) => { this.videoPlayer = p }}
              resizeMode="contain"
              source={this.state.source}
              onEnd={this.onVideoEnd}
              onLoad={this.onVideoLoad}
              onProgress={this.onProgress}
              paused={paused}
              repeat={false}
              onBuffer={({ isBuffering }) => this.setState({ isBuffering })}
            />
            {
              isBuffering ? this.renderLoading() :
                this.renderVideoIcon(paused, hideControllers)
            }
          </View>
        </TouchableWithoutFeedback>
        <Animated.View style={[styles.controller, { opacity: immersionOpacity }]}>
          <View style={[styles.progressBar]}>
            <ProgressController
              duration={duration}
              currentTime={currentTime}
              percent={completedPercentage}
              onNewPercent={this.onProgressChanged}
            />
          </View>
        </Animated.View>
      </View>
    )
  }
}
