import React from 'react'
import { View, Text } from 'react-native'
import { bool, shape, number, func } from 'prop-types'

import { Icon } from '../icon'
import { LikeButton } from '../likeButton'
import { Touchable } from '../touchable'

import { Colors } from '../../../../constants'
import { styles } from '../styles/rowInteract.styles'

const buttonDefaultProps = { number: 0, onPress: () => { } }
const buttonProps = shape({ number, onPress: func, })

export const interactionButton = (iconName, { number, onPress }) => (
  <Touchable borderless onPress={onPress} style={styles.buttonWrap}>
    <Icon
      color={Colors.blackSecondary}
      dense
      name={iconName}
    />
    {/* {renderNumber(number)} */}
  </Touchable>
)

const renderNumber = number => (
  <Text style={styles.buttonNumber}>{number}</Text>
)

const Divider = () => (
  <View style={styles.dividerWrap}>
    <View style={styles.divider} />
  </View>
)

export const RowInteract = ({
  like, comment, share, menu, hasMenu, karma, votedNegative, votedPositive, onPositivePress, onNegativePress, postId
}) => (
  <View style={styles.wrap}>
    <LikeButton
      disabled={like.disabled}
      isActive={like.isActive}
      number={karma}
      onPress={like.onPress}
      votedNegative={votedNegative}
      votedPositive={votedPositive}
      onPositivePress={onPositivePress}
      onNegativePress={onNegativePress}
      postId={postId}
    />
    <Divider />
    {interactionButton('message-text', comment)}
    {/* <Divider />
    {interactionButton('share', share)} */}
    {hasMenu &&
      <View style={styles.alignRight}>
        {interactionButton('dots-horizontal', menu)}
      </View>
    }
  </View>
)
RowInteract.defaultProps = {
  like: {
    isActive: false,
    number: 0,
    onPress: () => { },
  },
  comment: buttonDefaultProps,
  share: buttonDefaultProps,
  menu: { onPress: () => { } },
  hasMenu: false,
}
RowInteract.propTypes = {
  like: shape({
    isActive: bool,
    number,
    onPress: func,
  }),
  comment: buttonProps,
  share: buttonProps,
  menu: shape({
    onPress: func
  }),
  hasMenu: bool,
}
