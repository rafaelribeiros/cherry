import React, { Component } from 'react'
import { Animated, View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { func, bool } from 'prop-types'

import { ButtonPrimaryOutline } from '../buttons'

import { Colors, Metrics } from '../../../../constants'
import { styles } from '../styles/input.styles'

const BUTTON_HEIGHT = Metrics.buttonHeightDense + Metrics.tinySpacing

export class InputFooter extends Component {
  static propTypes = {
    multiline: bool,
    onSubmit: func,
  };

  static defaultProps = {
    multiline: true,
    onSubmit: () => { },
  }

  state = {
    value: '',
    buttonOpacity: new Animated.Value(0),
    hasButton: false,
  }

  setValue = (value) => {
    this.setState({ value })
    if (!this.state.hasButton && value) this.showButton()
    if (this.state.hasButton && !value) this.hideButton()
  }

  showButton = () => {
    this.setState({ hasButton: true })
    Animated.timing(
      this.state.buttonOpacity,
      { toValue: 1, duration: 275 }
    ).start()
  }
  hideButton = () => {
    this.setState({ hasButton: false })
    Animated.timing(
      this.state.buttonOpacity,
      { toValue: 0, duration: 275 }
    ).start()
  }

  submitValue = () => {
    this.props.onSubmit(this.state.value)
    this.setValue('')
    this.blur()
  }

  setButtonHeight = () => (
    this.state.buttonOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, BUTTON_HEIGHT]
    })
  )

  focus = () => this.textInput.focus()
  blur = () => this.textInput.blur()


  render() {
    const { multiline } = this.props
    const { value } = this.state
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => this.textInput.focus()}>
          <View style={styles.footerInputWrap}>
            <TextInput
              multiline={multiline || true}
              onChangeText={this.setValue}
              ref={(input) => { this.textInput = input }}
              selectionColor={Colors.primary}
              style={styles.footerInput}
              underlineColorAndroid="transparent"
              value={value}
              {...this.props}
            />
          </View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            opacity: this.state.buttonOpacity,
            height: this.setButtonHeight()
          }}
        >
          <ButtonPrimaryOutline
            containerStyle={styles.footerInputButton}
            label={'Comentar'}
            onPress={this.submitValue}
          />
        </Animated.View>
      </View>
    )
  }
}
