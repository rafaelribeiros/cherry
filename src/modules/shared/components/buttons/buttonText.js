import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ViewPropTypes
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { Touchable } from '../touchable'

import { Colors } from '../../../../constants'

export class ButtonText extends Component {

  static propTypes = {
    color: PropTypes.string,
    containerStyle: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    gradient: PropTypes.shape({
      color: PropTypes.array,
      start: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      end: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
    isLoading: PropTypes.bool,
    loadingSpinnerColor: PropTypes.string,
    lowerCase: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    outline: PropTypes.bool,
    title: PropTypes.string,
    uppercase: PropTypes.bool,
    withGradient: PropTypes.bool,
  }

  static defaultProps = {
    color: Colors.primary,
    containerStyle: {},
    contentStyle: {},
    disabled: false,
    gradient: {
      color: ['#00DED3', '#00BAA8'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
    isLoading: false,
    loadingSpinnerColor: Colors.whitePrimary,
    lowerCase: false,
    onPress: () => { },
    outline: false,
    title: '',
    uppercase: false,
    withGradient: false,
  }

  renderText() {
    const { isLoading } = this.props
    if (!isLoading) {
      const {
        color,
        lowerCase,
        title,
        uppercase,
      } = this.props

      const buttonTitle =
        (uppercase || (Platform.OS === 'android' && !lowerCase))
          ? title.toUpperCase()
          : title

      const textStyles = (uppercase) ? [styles.textUppercase] : [styles.text]
      if (color !== Colors.primary) { textStyles.push({ color }) }

      if (Platform.OS === 'ios') {
        return (
          <Text style={textStyles}>{buttonTitle}</Text>
        )
      }
      return (
        <Text style={[textStyles, { color }]}>{buttonTitle}</Text>
      )
    }
    const { loadingSpinnerColor } = this.props
    return (
      <ActivityIndicator color={loadingSpinnerColor} />
    )
  }

  renderTextButton() {
    const {
      color,
      contentStyle,
      disabled,
      gradient,
      outline,
      withGradient,
    } = this.props
    const buttonStyles = [styles.button]

    // #region ios
    if (Platform.OS === 'ios') {

      if (withGradient === true) {

        const gradientColors = (!disabled) ? gradient.color : [Colors.blackDisabledAlt2, Colors.blackDisabledAlt]
        if (contentStyle !== {}) { buttonStyles.push(contentStyle) }

        return (
          <LinearGradient
            Colors={gradientColors}
            start={{ x: gradient.start.x, y: gradient.start.y }}
            end={{ x: gradient.end.x, y: gradient.end.y }}
            style={buttonStyles}
          >
            {this.renderText()}
          </LinearGradient>
        )
      }

      if (outline === true) {
        const outlineStyle = [styles.outlineButton]
        if (color !== Colors.primary) { outlineStyle.push({ borderColor: color }) }
        buttonStyles.push(outlineStyle)
      }

      if (contentStyle !== {}) { buttonStyles.push(contentStyle) }

      return (
        <View style={buttonStyles}>
          {this.renderText()}
        </View>
      )
    }
    // #endregion ios

    // #region android
    if (outline === true) {
      const outlineStyle = [styles.outlineButton]
      if (color !== Colors.primary) { outlineStyle.push({ borderColor: color }) }
      buttonStyles.push(outlineStyle)
    }
    if (contentStyle !== {}) { buttonStyles.push(contentStyle) }

    if (withGradient === true) {

      const gradientColors = (!disabled) ? gradient.color : [Colors.blackDisabledAlt2, Colors.blackDisabledAlt]
      if (contentStyle !== {}) { buttonStyles.push(contentStyle) }

      return (
        <LinearGradient
          Colors={gradientColors}
          start={{ x: gradient.start.x, y: gradient.start.y }}
          end={{ x: gradient.end.x, y: gradient.end.y }}
          style={buttonStyles}
        >
          {this.renderText()}
        </LinearGradient>
      )
    }
    return (
      <View style={buttonStyles}>
        {this.renderText()}
      </View>
    )
    // #endregion android
  }

  render() {
    const { containerStyle, disabled, onPress } = this.props

    return (
      <Touchable style={containerStyle} disabled={disabled} onPress={onPress}>
        {this.renderTextButton()}
      </Touchable>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    minWidth: 92,
    minHeight: 32,
    justifyContent: 'center',
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 2,
  },
  text: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        color: Colors.primary,
        textAlign: 'center',
        fontSize: 17,
      },
      android: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        textAlign: 'center'
      },
    })
  },
  textUppercase: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
        color: Colors.primary,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
      },
      android: {
        fontFamily: 'sans-serif-medium',
        fontSize: 14,
        textAlign: 'center'
      },
    })
  },
})
