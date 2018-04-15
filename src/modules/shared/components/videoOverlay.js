import React from 'react'
import { StyleSheet } from 'react-native'

import { func } from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Touchable } from './touchable'

import { Metrics } from '../../../constants'
import { Colors } from '../../../constants/colors'

export const VideoOverlay = ({ onPress }) => (
  <Touchable onPress={onPress} style={styles.wrap}>
    <Icon
      name="play-circle"
      size={Metrics.icons.xl}
      color={Colors.whiteSecondary}
    />
  </Touchable>
)
VideoOverlay.defaultProps = { onPress: () => { } }
VideoOverlay.propTypes = { onPress: func }

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blackDisabledAlt2
  }
})
