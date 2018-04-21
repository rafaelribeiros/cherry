import React from 'react'
import { func, number, shape, bool, string } from 'prop-types'

import { ViewHandlingKeyboard } from '../../shared/components/viewHandlingKeyboard'
import { LoadingOverlay } from '../../shared/components/loadingOverlay'
import { PublishPostForm } from './publishPostForm'

import { styles } from './styles/feed.style'

export const PublishPost = (props) => {
  return (
    <ViewHandlingKeyboard style={styles.container}>
      <PublishPostForm
        remainingSponsoredPosts={props.page.adsRemaining}
        onRequestCreditPress={props.onRequestCreditPress}
        onPublishPress={props.onPublishPress}
        fetchOpenGraph={props.fetchOpenGraph}
        openGraph={props.openGraph}
        onDismissOpenGraphPress={props.onDismissOpenGraphPress}
        loadingOg={props.loadingOg}
      />
      {props.loading && <LoadingOverlay />}
    </ViewHandlingKeyboard>
  )
}

PublishPost.defaultProps = {
  page: { adsRemaining: 0 },
  onRequestCreditPress: () => { },
  onPublishPress: () => { },
  fetchOpenGraph: () => { },
  onDismissOpenGraphPress: () => { },
  openGraph: {
    hasOg: false,
    ogTitle: '',
    ogImage: '',
    ogLink: '',
    ogDescription: ''
  },
  loading: false,
  loadingOg: false,
}

PublishPost.propTypes = {
  page: shape({ adsRemaining: number }),
  onRequestCreditPress: func,
  onPublishPress: func,
  fetchOpenGraph: func,
  onDismissOpenGraphPress: func,
  openGraph: shape({
    hasOg: bool,
    ogTitle: string,
    ogImage: string,
    ogLink: string,
    ogDescription: string
  }),
  loading: bool,
  loadingOg: bool,
}
