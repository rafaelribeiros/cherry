import React from 'react'
import { Text, View, TouchableWithoutFeedback } from 'react-native'
import { arrayOf, func, number, string } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Avatar } from '../avatar'
import { Touchable } from '../touchable'

import { styles } from '../styles/rows.styles'
import { Metrics, Colors } from '../../../../constants'

const isCandidateSelected = (candidate, selectedCandidates) => {
  if (typeof selectedCandidates === 'undefined' && selectedCandidates.length === 0) return false
  return selectedCandidates.findIndex(selection => selection === candidate) > -1
}

export const RowCandidateSelectable = ({
  id,
  onPress,
  image,
  title,
  subtitle,
  selectedCandidates
}) => {
  const [iconName, iconColor] = isCandidateSelected(id, selectedCandidates)
    ? ['checkbox-marked-circle-outline', Colors.primary]
    : ['checkbox-blank-circle-outline', Colors.blackDisabledAlt]
  return (
    <Touchable onPress={() => onPress(id)}>
      <View style={[styles.wrapFlat, styles.rightIndent]}>
        <Avatar size={Metrics.avatar.standard} containerStyle={styles.avatar} name={title} source={image} />
        <View style={styles.infoWrap}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          {subtitle && <Text numberOfLines={1} style={styles.subTitle}>{subtitle}</Text>}
        </View>
        <Icon
          name={iconName}
          color={iconColor}
          size={Metrics.icons.medium}
          style={styles.icon}
        />
      </View>
    </Touchable>
  )
}
RowCandidateSelectable.defaultProps = {
  id: undefined,
  image: '',
  onPress: () => { },
  selectedCandidates: [],
  subtitle: '',
  title: '',
}
RowCandidateSelectable.propTypes = {
  id: string,
  image: string,
  onPress: func,
  selectedCandidates: arrayOf(string),
  subtitle: string,
  title: string,
}
