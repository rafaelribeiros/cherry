import React from 'react'
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native'
import { func, string, shape } from 'prop-types'

import { ButtonText } from './buttons/buttonText'
import { Colors, Fonts, Metrics } from '../../../constants'

export const HeaderText = ({
  containerStyle, title, button: { label, onPress }
}) => (
  <View style={StyleSheet.flatten([styles.container, containerStyle])} >
    <Text style={styles.title}>{title}</Text>
    {
      label &&
      <ButtonText
        title={label}
        onPress={onPress}
      />
    }
  </View>
)

HeaderText.defaultProps = {
  containerStyle: undefined,
  title: '',
  button: {},
}

HeaderText.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: string,
  button: shape({
    label: string,
    onPress: func
  }),
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    ...Fonts.style.description,
    color: Colors.blackSecondaryAlt,
    flex: 1,
    marginLeft: Metrics.standardSpacing,
    marginBottom: Metrics.tinySpacing,
  }
})

