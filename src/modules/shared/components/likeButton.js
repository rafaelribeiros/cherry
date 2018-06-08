import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

import { Icon } from './icon'
import { Touchable } from './touchable'

import { styles } from './styles/rowInteract.styles'
import { Colors } from '../../../constants'

export class LikeButton extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    isActive: PropTypes.bool,
    number: PropTypes.number,
    onPositivePress: PropTypes.func,
    onNegativePress: PropTypes.func,
  }
  static defaultProps = {
    disabled: false,
    isActive: false,
    number: 0,
    onPositivePress: () => { },
    onNegativePress: () => { },
  }

  state = {
    processingTouch: false
  }

  onPositivePressButton = async () => {
    const { onPositivePress, votedPositive, postId } = this.props
    if (votedPositive === false) {
      this.setState({ processingTouch: true })
      await onPositivePress(postId, 1)
      this.setState({ processingTouch: false })
    }
  }

  onNegativePressButton = async () => {
    const { onNegativePress, votedNegative, postId } = this.props
    if (votedNegative === false) {
      this.setState({ processingTouch: true })
      await onNegativePress(postId, -1)
      this.setState({ processingTouch: false })
    }
  }

  renderNumber = number => (
    <Text style={styles.buttonNumber}>{number}</Text>
  )

  render() {
    const {
      isActive,
      disabled,
      number,
      votedNegative,
      votedPositive
    } = this.props
    const buttonOpacity = (disabled && this.state.processingTouch) ? { opacity: 0.5 } : {}
    const [firstIconColor] = (((disabled && this.state.processingTouch) || votedPositive) && (number > 0)) ? [Colors.primary, 'thumb-up'] : [Colors.blackSecondary, 'thumb-up-outline']
    const [secondIconColor] = (((disabled && this.state.processingTouch) || votedNegative) && (number > 0)) ? [Colors.primary, 'thumb-up'] : [Colors.blackSecondary, 'thumb-up-outline']
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
        <Touchable disabled={disabled} borderless onPress={this.onPositivePressButton} style={styles.buttonWrap}>
          <Icon
            color={firstIconColor}
            containerStyle={buttonOpacity}
            dense
            name="arrow-up-bold-circle-outline"
          />
        </Touchable>
        {this.renderNumber(number)}
        <Touchable disabled={disabled} borderless onPress={this.onNegativePressButton} style={styles.buttonWrap}>
          <Icon
            color={secondIconColor}
            containerStyle={buttonOpacity}
            dense
            name="arrow-down-bold-circle-outline"
          />
        </Touchable>
      </View>
    )
  }
}
