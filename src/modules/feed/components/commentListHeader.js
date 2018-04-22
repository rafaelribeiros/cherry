import React from 'react'
import { Text, View } from 'react-native'
import { number } from 'prop-types'

import { styles } from './styles/post.style'

export const CommentListHeader = ({ commentCount }) => (
  <View style={styles.titleRowWrap}>
    <Text style={styles.sectionTitle}>{commentCount} comentários</Text>
  </View>
)
CommentListHeader.propTypes = {
  commentCount: number,
}
CommentListHeader.defaultProps = {
  commentCount: 0,
}
