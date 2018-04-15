import React from 'react'
import { StyleSheet, View, ViewPropTypes, Text } from 'react-native'
import PropTypes from 'prop-types'

import { Icon } from './icon'
import { Touchable } from './touchable'

import { Colors, Metrics, Fonts } from '../../../constants'

export const RowMenuWithIcon = ({
  title, subtitle, onPress, button, containerStyle, icon
}) => (
  <Touchable onPress={onPress} style={StyleSheet.flatten([styles.card, containerStyle])}>
    {
    icon.name && <Icon
      style={styles.icon}
      color={button.color || Colors.blackSecondary}
      name={icon.name}
      size={button.size || Metrics.icons.medium}
    />}
    <View style={styles.dataWrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
    {
      button.name &&
      <Icon
        color={button.color || Colors.blackSecondary}
        name={button.name}
        size={button.size || Metrics.icons.medium}
      />
    }
  </Touchable>
)
RowMenuWithIcon.propTypes = {
  button: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
  }),
  icon: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number,
  }),
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
}
RowMenuWithIcon.defaultProps = {
  button: {},
  icon: {},
  containerStyle: {},
  onPress: () => {},
  subtitle: undefined,
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.darkDivider,
    flexDirection: 'row',
    minHeight: Metrics.smallSpacing,
  },
  dataWrap: {
    flex: 1,
    marginHorizontal: Metrics.standardSpacing,
    marginVertical: Metrics.smallSpacing,
  },
  title: {
    ...Fonts.style.normal,
    color: Colors.blackPrimary,
  },
  subtitle: {
    ...Fonts.style.description,
    color: Colors.blackSecondary,
  },
  icon: {
    marginLeft: Metrics.standardSpacing
  }
})
