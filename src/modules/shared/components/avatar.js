import React, { Component } from 'react'
import { any, number, object, oneOfType, string } from 'prop-types'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Colors, Functions, Metrics, Values } from '../../../constants'

export class Avatar extends Component {

  static propTypes = {
    containerStyle: ViewPropTypes.style,
    extraItem: any,
    name: string,
    size: number,
    source: oneOfType([number, string, object]),
  };

  static defaultProps = {
    containerStyle: {},
    extraItem: null,
    name: '',
    size: Metrics.avatar.standard,
    source: '',
  };

  renderHeaderImage = () => {
    const {
      name = '',
      source = '',
      size = Metrics.avatar.standard
    } = this.props
    if (source) {
      const image = (source.uri) ? { uri: source.uri } : { uri: source }
      return (
        <View style={styles.imageWrap}>
          <FastImage
            style={this.setImageStyle(size)}
            source={image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      )
    }
    const data = Functions.getNameInitials(name)
    const { initials, color = Colors.primary } = data
    return (
      <View style={this.setInitialsWrapStyle(size, color)}>
        <Text style={this.setInitialsStyle(size)}>{initials}</Text>
      </View>
    )
  }

  setImageStyle = size => ({
    borderRadius: size / 2,
    height: size,
    width: size,
  })
  setInitialsWrapStyle = (size, color) => ({
    alignItems: 'center',
    backgroundColor: color,
    borderRadius: size / 2,
    height: size,
    justifyContent: 'center',
    width: size,
  })
  setInitialsStyle = size => ({
    bottom: 1,
    color: '#FFF',
    fontSize: size * 0.45,
  })

  render() {
    const { containerStyle, extraItem } = this.props
    return (
      <View style={containerStyle}>
        {this.renderHeaderImage()}
        {extraItem}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
