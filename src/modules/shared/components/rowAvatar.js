import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { func, string, element, number } from 'prop-types'

import { Avatar } from './avatar'

import { styles } from './styles/rowAvatar.style'
import { Metrics } from '../../../constants'

export const RowAvatar = ({
  avatarSize, name, source, date, renderRight, onPress
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.wrap}>
        <Avatar size={avatarSize} containerStyle={styles.avatar} name={name} source={source} />
        <View style={styles.infoWrap}>
          <Text numberOfLines={1} style={styles.title}>{name}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>{date}</Text>
        </View>
        {renderRight}
      </View>
    </TouchableWithoutFeedback>
  )
}
RowAvatar.defaultProps = {
  onPress: () => { },
  avatarSize: Metrics.avatar.standard,
  name: '',
  date: '',
  renderRight: null,
  source: '',
}
RowAvatar.propTypes = {
  onPress: func,
  avatarSize: number,
  name: string,
  date: string,
  renderRight: element,
  source: string,
}
