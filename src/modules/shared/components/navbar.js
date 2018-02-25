import React from 'react'
import { Platform, StyleSheet, Text, TouchableNativeFeedback, View, ViewPropTypes } from 'react-native'

import { arrayOf, func, number, shape, string, bool } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Touchable } from './touchable'
import { styles } from './styles/navbar.style'
import { Colors, Metrics } from '../../../constants'

const defaultProps = {
  rightIcons: undefined,
  title: '',
  onBack: undefined,
  transparent: false,
  backgroundColor: Colors.primary,
}
const propTypes = {
  rightIcons: arrayOf(
    shape({
      name: string,
      onPress: func
    })
  ),
  title: string,
  onBack: func,
  transparent: bool,
  backgroundColor: string
}


const iconDefaultProps = {
  color: Colors.blackSecondaryAlt,
  onPress: () => { },
  size: 24,
  style: {},
  wrapStyle: {},
}
const iconTypes = {
  color: string,
  name: string.isRequired,
  onPress: func,
  size: number,
  style: ViewPropTypes.style,
  wrapStyle: ViewPropTypes.style,
}

const buildIcon = ({
  color,
  name,
  onPress,
  size,
  style,
  wrapStyle
}) => {
  const background =
    Platform.OS === 'android'
      ? TouchableNativeFeedback.SelectableBackgroundBorderless()
      : null
  return (
    <Touchable
      background={background}
      key={name}
      onPress={onPress}
      style={wrapStyle || styles.buttonTouch}
    >
      <Icon
        color={color || Colors.gray500}
        name={name}
        size={size || Metrics.icons.medium}
        style={style}
      />
    </Touchable>
  )
}
buildIcon.propTypes = iconTypes
buildIcon.defaultProps = iconDefaultProps


const BuildGroup = (icons) => {
  const iconGroup = icons.map((icon) => {
    return buildIcon(icon)
  })
  return <View style={styles.buttonGroupWrap}>{iconGroup}</View>
}

const IconGroup = ({ icons }) => (
  (typeof icons !== 'undefined') && BuildGroup(icons)
)

/**
|------------------------------------------------|
| Home screen navigation bar without back button |
|------------------------------------------------|
*/
export const NavbarMain = ({ title, rightIcons }) => (
  <View style={styles.wrap}>
    <Text numberOfLines={1} style={styles.titleMain}>
      {title}
    </Text>
    <IconGroup icons={rightIcons} />
  </View>
)
NavbarMain.defaultProps = defaultProps
NavbarMain.propTypes = propTypes

/**
|----------------------------------------------------|
| Navigation bar with back button and centered title |
|----------------------------------------------------|
*/
const getWrapWidth = rightIconsCount => (
  (rightIconsCount >= 2)
    ? (Metrics.smallSpacing + (Metrics.navBarButtonHeight * rightIconsCount))
    : Metrics.singleTitleWrapMargin
)

export const Navbar = ({ rightIcons, title, onBack, transparent, backgroundColor }) => {
  const hasRightIcons = (typeof rightIcons !== 'undefined' && typeof rightIcons === 'object')
  const rightIconsCount = (hasRightIcons) ? rightIcons.length : 0
  const iconWrapStyle = StyleSheet.flatten({ width: getWrapWidth(rightIconsCount) })
  const navberBackgroundColor = transparent ? {} : { backgroundColor }

  const backButton = {
    color: Colors.white,
    onPress: onBack,
    ...Platform.select({
      android: { name: 'arrow-left' },
      ios: {
        name: 'chevron-left',
        size: Metrics.icons.xl,
        style: styles.iosBackButtonAlignment
      }
    })
  }
  return (
    <View style={[styles.wrap, navberBackgroundColor]}>
      <View style={iconWrapStyle}>
        {buildIcon(backButton)}
      </View>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <View style={iconWrapStyle}>
        <IconGroup icons={rightIcons} />
      </View>
    </View>
  )
}
Navbar.defaultProps = defaultProps
Navbar.propTypes = propTypes
