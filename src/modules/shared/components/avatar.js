import React, { Component } from 'react'
import { View, Text, ViewPropTypes, Image } from 'react-native'
import { any, number, object, oneOfType, string } from 'prop-types'
import { Colors, Functions, Metrics } from '../../../constants'

export class Avatar extends Component {

  static propTypes = {
    containerStyle: ViewPropTypes.style,
    extraItem: any,
    name: string,
    size: number,
    source: oneOfType([number, string, object]),
    imageStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    containerStyle: {},
    extraItem: null,
    name: '',
    size: Metrics.avatar.standard,
    source: '',
    imageStyle: {},
  };

  state = { imageError: false }

  onImageError = () => {
    this.setState({ imageError: true })
  }

  renderHeaderImage = () => {
    const {
      name = '',
      source = '',
      size = Metrics.avatar.standard,
      imageStyle,
    } = this.props
    if ((source) && (this.state.imageError === false)) {
      const image = (source.uri) ? { uri: source.uri } : { uri: source }
      return (
        // <View style={styles.imageWrap}>
        <View style={this.setImageWrapStyle(size, imageStyle)}>
          <Image
            style={this.setImageStyle(size)}
            source={image}
            resizeMode="cover"
            onError={this.onImageError}
          />
        </View>
      )
    }
    const data = Functions.getNameInitials(name)
    const { initials, color = Colors.primary } = data
    return (
      <View style={this.setInitialsWrapStyle(size, color, imageStyle)}>
        <Text style={this.setInitialsStyle(size)}>{initials}</Text>
      </View>
    )
  }

  setImageWrapStyle = (size, imageStyle) => ({
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    ...imageStyle
  })
  setImageStyle = size => ({
    borderRadius: size / 2,
    height: size,
    width: size,
  })
  setInitialsWrapStyle = (size, color, imageStyle) => ({
    alignItems: 'center',
    backgroundColor: color,
    borderRadius: size / 2,
    height: size,
    justifyContent: 'center',
    width: size,
    ...imageStyle
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
