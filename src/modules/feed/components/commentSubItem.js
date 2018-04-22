import React from 'react'
import { Text, View } from 'react-native'

import { func, bool } from 'prop-types'

import { commentPropTypes, commentDefaultProps } from '../../shared/propTypes/commentPropTypes'

import { CommentLikeButton } from '../../shared/components/commentLikeButton'
import { IconButton } from '../../shared/components/iconButton'
import { RowAvatar } from '../../shared/components/rows'

import { styles } from './styles/post.style'
import { Colors, Metrics } from '../../../constants'

export const CommentSubItem = ({
  author,
  disableLike,
  formatedDate,
  id,
  liked,
  likesCount,
  onLikePress,
  onUndoLikePress,
  showMenu,
  text,
  authorImage,
}) => (
  <View style={styles.wrap}>
    <View style={styles.avatarRowWithInset}>
      <RowAvatar
        avatarSize={Metrics.avatar.small}
        source={authorImage}
        subtitle={formatedDate}
        title={author.name}
        renderRight={
          <View style={styles.buttonWrap}>
            <CommentLikeButton
              isActive={liked}
              number={likesCount}
              disabled={disableLike}
              onPress={liked ? () => onUndoLikePress(id) : () => onLikePress(id)}
            />
            <IconButton
              name="dots-horizontal"
              dense
              size={Metrics.icons.small}
              onPress={() => showMenu(id, author)}
              color={Colors.blackSecondary}
              containerStyle={{ marginRight: Metrics.tinySpacing / 2 }}
            />
          </View>
        }
      />
    </View>
    <Text style={styles.subComment}>{text}</Text>
  </View>
)

CommentSubItem.defaultProps = {
  onLikePress: () => { },
  onUndoLikePress: () => { },
  showMenu: () => { },
  disableLike: false,
  ...commentDefaultProps
}

CommentSubItem.propTypes = {
  onLikePress: func,
  onUndoLikePress: func,
  showMenu: func,
  disableLike: bool,
  ...commentPropTypes
}
