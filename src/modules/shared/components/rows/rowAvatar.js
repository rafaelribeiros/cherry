import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { func, string, element, number } from 'prop-types'

import { Avatar } from '../avatar'

import { styles } from '../styles/rowAvatar.style'
import { Metrics } from '../../../../constants'

export const RowAvatar = ({
  avatarSize, title, source, subtitle, extraSubtitle, renderRight, onPress
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.wrap}>
        <Avatar size={avatarSize} containerStyle={styles.avatar} name={title} source={source} />
        <View style={styles.infoWrap}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          {subtitle && <Text numberOfLines={1} style={styles.subTitle}>{subtitle}</Text>}
          {extraSubtitle !== '' && <Text numberOfLines={1} style={styles.extraSubTitle}>{extraSubtitle}</Text>}
        </View>
        {renderRight}
      </View>
    </TouchableWithoutFeedback>
  )
}
RowAvatar.defaultProps = {
  onPress: () => { },
  avatarSize: Metrics.avatar.standard,
  title: '',
  subtitle: '',
  extraSubtitle: '',
  renderRight: null,
  source: '',
}
RowAvatar.propTypes = {
  onPress: func,
  avatarSize: number,
  title: string,
  subtitle: string,
  extraSubtitle: string,
  renderRight: element,
  source: string,
}
