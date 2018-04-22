import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { func, bool, number } from 'prop-types'

import { Touchable } from '../../shared/components/touchable'
import { Colors } from '../../../constants'
import { Icon } from '../../shared/components/icon'


const renderNumber = number => (
  (typeof number === 'number' && number !== 0) &&
  <Text style={styles.buttonNumber}>{number}</Text>
)

export const CommentLikeButton = ({
  isActive, disabled, number, onPress
}) => {
  const [iconName, iconColor] = (isActive) ? ['thumb-up', Colors.primary] : ['thumb-up-outline', Colors.blackSecondary]
  return (
    <Touchable disabled={disabled} borderless onPress={onPress} style={styles.buttonWrap}>
      {renderNumber(number)}
      <Icon
        color={iconColor}
        dense
        name={iconName}
      />
    </Touchable>
  )
}
CommentLikeButton.defaultProps = {
  isActive: false,
  disabled: false,
  number: 0,
  onPress: () => { },
}
CommentLikeButton.propTypes = {
  isActive: bool,
  disabled: bool,
  number,
  onPress: func,
}
export const styles = StyleSheet.create({
  buttonWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
