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
    onPress: PropTypes.func,
  }
  static defaultProps = {
    disabled: false,
    isActive: false,
    number: 0,
    onPress: () => { },
  }

  state = {
    processingTouch: false
  }

  onPressButton = async () => {
    const { onPress } = this.props
    this.setState({ processingTouch: true })
    await onPress()
    this.setState({ processingTouch: false })
  }

  renderNumber = number => (
    (typeof number === 'number' && number !== 0) &&
    <Text style={styles.buttonNumber}>{number}</Text>
  )

  render() {
    const { isActive, disabled, number } = this.props
    const buttonOpacity = (disabled && this.state.processingTouch) ? { opacity: 0.5 } : {}
    const [iconColor, iconName] = ((disabled && this.state.processingTouch) || isActive) ? [Colors.primary, 'thumb-up'] : [Colors.blackSecondary, 'thumb-up-outline']
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
        <Touchable disabled={disabled} borderless onPress={this.onPressButton} style={styles.buttonWrap}>
          <Icon
            color={iconColor}
            containerStyle={buttonOpacity}
            dense
            name="arrow-up-bold-circle-outline"
          />
        </Touchable>
        {this.renderNumber(number)}
        <Touchable disabled={disabled} borderless onPress={this.onPressButton} style={styles.buttonWrap}>
          <Icon
            color={Colors.blackSecondary}
            containerStyle={buttonOpacity}
            dense
            name="arrow-down-bold-circle"
          />
        </Touchable>
      </View>
    )
  }
}
