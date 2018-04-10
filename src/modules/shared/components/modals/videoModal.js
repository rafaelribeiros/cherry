import React, { Component } from 'react'
import {
  Animated,
  Modal,
  StatusBar,
  StyleSheet,
  View,
  Platform,
} from 'react-native'

import { bool, func, object } from 'prop-types'

import { ButtonNavText } from '../buttons/buttonNavText'
import { VideoPlayer } from '../videoPlayer'

import { Colors, Metrics } from '../../../../constants'

export class VideoModal extends Component {
  static propTypes = {
    visible: bool.isRequired,
    hideModal: func.isRequired,
    video: object
  }
  static defaultProps = {
    video: {}
  }

  autoImmersion = () => {}
  state = {
    immersionOpacity: new Animated.Value(1),
    immersion: true,
    backgroundColor: 'black'
  }

  toggleImmersion = () => {
    const { immersion } = this.state
    if (this.props.visible) {
      if (!immersion) {
        clearTimeout(this.autoImmersion)
        this.activateImmersion()
      } else {
        this.deactivateImmersion()
        this.autoImmersion = setTimeout(this.toggleImmersion, 2000)
      }
    }
  }

  deactivateImmersion = () => {
    Animated.timing(
      this.state.immersionOpacity,
      { toValue: 1 }
    ).start()
    if (Platform.OS === 'ios') StatusBar.setHidden(false, true)
    this.setState({ immersion: false })
  }
  activateImmersion = () => {
    Animated.timing(
      this.state.immersionOpacity,
      { toValue: 0 }
    ).start()
    if (Platform.OS === 'ios') StatusBar.setHidden(true, true)
    this.setState({ immersion: true })
  }

  dismissModal = () => {
    this.deactivateImmersion()
    this.props.hideModal()
  }

  renderNavBar = () => (
    <Animated.View style={[styles.navBar, { opacity: this.state.immersionOpacity }]}>
      <ButtonNavText
        title="Fechar"
        onPress={this.dismissModal}
      />
    </Animated.View>
  )

  render() {
    const { visible, hideModal, video } = this.props
    const { backgroundColor, immersion } = this.state
    return (
      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={hideModal}
        transparent
      >
        <StatusBar backgroundColor={backgroundColor} />
        <View style={styles.container}>
          {
            (video) &&
              <VideoPlayer
                hideControllers={immersion}
                onContentTouch={this.toggleImmersion}
                source={{ uri: video.uri }}
              />
          }
        </View>
        {this.renderNavBar()}
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    ...StyleSheet.absoluteFillObject,
    bottom: null,
    backgroundColor: Colors.blackSecondaryAlt,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    ...Platform.select({
      android: {
        height: Metrics.navBarHeight - Metrics.statusBarHeight,
      },
      ios: {
        paddingTop: Metrics.statusBarHeight,
        height: Metrics.navBarHeight,
      }
    })
  },
  backButton: {
    borderColor: 'red',
    borderWidth: 1,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    aspectRatio: Metrics.ratio.wide,
    width: '100%',
    height: null,
  }
})
