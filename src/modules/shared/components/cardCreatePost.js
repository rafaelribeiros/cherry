import React from 'react'
import { Text, StyleSheet, Platform } from 'react-native'
import { func } from 'prop-types'

import { Card } from './card'
import { Touchable } from './touchable'
import { Colors } from '../../../constants'
import { Fonts } from '../../../constants/fonts'
import { Metrics } from '../../../constants/metrics'
import { IconButton } from './buttons'

export const CardCreatePost = ({
  onPress,
  // onImagePress,
}) => (
  <Card style={styles.container}>
    <Touchable onPress={onPress} style={styles.wrap}>
      <Text style={styles.title}>Criar ocorrência</Text>
      <IconButton
        name="image"
        color={Colors.blackSecondary}
        // onPress={onImagePress}
      />
    </Touchable>
  </Card>
)

CardCreatePost.defaultProps = {
  onPress: () => {},
  // onImagePress: () => {},
}
CardCreatePost.propTypes = {
  onPress: func,
  // onImagePress: func,
}

const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.tinySpacing,
    ...Platform.select({
      android: {
        marginBottom: Metrics.smallSpacing / 2,
      },
      ios: {
        marginBottom: Metrics.smallSpacing,
      },
    }),
  },
  wrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    ...Fonts.style.description,
    color: Colors.blackSecondary,
    flex: 1,
    marginLeft: Metrics.standardSpacing
  }
})
