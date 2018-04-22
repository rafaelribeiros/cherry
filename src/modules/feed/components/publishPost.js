import React from 'react'
import { func, bool } from 'prop-types'

import { ViewHandlingKeyboard } from '../../shared/components/viewHandlingKeyboard'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'
import { PublishPostForm } from './publishPostForm'

import { styles } from './styles/feed.style'

export const PublishPost = (props) => {
  return (
    <ViewHandlingKeyboard style={styles.container}>
      <PublishPostForm
        onPublishPress={props.onPublishPress}
      />
      {props.loading && <LoadingOverlay />}
    </ViewHandlingKeyboard>
  )
}

PublishPost.defaultProps = {
  onPublishPress: () => { },
  loading: false,
}

PublishPost.propTypes = {
  onPublishPress: func,
  loading: bool,
}
