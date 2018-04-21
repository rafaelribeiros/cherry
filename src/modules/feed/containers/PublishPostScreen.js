import React, { Component } from 'react'
import { connect } from 'react-redux'
import { func, shape, object, array, bool, string } from 'prop-types'

import { PublishPost } from '../components/publishPost'
import { getUser } from '../../../redux/reducers/authentication/selectors'
import { Values } from '../../../constants'
// import { getLoadingPost, getOg, getOgUrlsFound, getOgUrlsDismissed, getLoadingOg } from '../../../redux/reducers/feed/selectors'
// import { publishPostAction, fetchOpenGraphAction, dismissOpenGraphAction } from '../../../redux/actions/async/feedAsyncActions'
// import { getUserProfileAction } from '../../../redux/actions/async/profileAsyncActions'
// import { clearNewPostState } from '../../../redux/actions/sync/feedSyncActions'

class PublishPostContainer extends Component {
  static navigationOptions = () => ({
    ...Values.navbarStyles.primary,
  })

  static defaultProps = {
    publishPost: () => { },
    fetchOpenGraph: () => { },
    dismissOpenGraph: () => { },
    clearNewPost: () => { },
    getProfile: () => { },
    navigation: {},
    og: {
      hasOg: false,
      ogTitle: '',
      ogImage: '',
      ogLink: '',
      ogDescription: ''
    },
    ogUrlsFound: [],
    ogUrlsDismissed: [],
    loadingOg: false,
    loading: false,
    user: { pageAdmin: {} },
  }

  static propTypes = {
    publishPost: func,
    fetchOpenGraph: func,
    dismissOpenGraph: func,
    clearNewPost: func,
    getProfile: func,
    navigation: object,
    og: shape({
      hasOg: bool,
      ogTitle: string,
      ogImage: string,
      ogLink: string,
      ogDescription: string
    }),
    ogUrlsFound: array,
    ogUrlsDismissed: array,
    loadingOg: bool,
    loading: bool,
    user: shape({ pageAdmin: shape({ name: string, id: string }) })
  }

  componentDidMount = () => this.props.getProfile()

  componentWillUnmount = () => this.props.clearNewPost()

  navigateBack = () => this.props.navigation.goBack()

  onPublishPress = async (formData, og) => {
    await this.props.publishPost(formData, og, this.props.navigation)
  }

  onSearchOpenGraph = (url) => {
    const {
      fetchOpenGraph,
      og,
      ogUrlsFound,
      ogUrlsDismissed
    } = this.props
    fetchOpenGraph(url, og, ogUrlsFound, ogUrlsDismissed)
  }

  onDismissOpenGraph = og => this.props.dismissOpenGraph(og, this.props.ogUrlsDismissed)

  render() {
    return (
      <PublishPost
        goBack={this.navigateBack}
        onPublishPress={this.onPublishPress}
        loading={this.props.loading}
        fetchOpenGraph={this.onSearchOpenGraph}
        openGraph={this.props.og}
        loadingOg={this.props.loadingOg}
        onDismissOpenGraphPress={this.onDismissOpenGraph}
        page={this.props.user.pageAdmin}
      />
    )
  }
}

const mapStateToProps = state => ({
  //   loading: getLoadingPost(state),
  //   og: getOg(state),
  //   ogUrlsFound: getOgUrlsFound(state),
  //   ogUrlsDismissed: getOgUrlsDismissed(state),
  //   loadingOg: getLoadingOg(state),
  //  user: getUser(state),
})

const mapDispatchToProps = dispatch => ({
  //   publishPost: (formData, og, navigation) => dispatch(publishPostAction(formData, og, navigation)),
  //   fetchOpenGraph: (url, og, ogUrlsFound, ogUrlsDismissed) => dispatch(fetchOpenGraphAction(url, og, ogUrlsFound, ogUrlsDismissed)),
  //   dismissOpenGraph: (og, ogUrlsDismissed) => dispatch(dismissOpenGraphAction(og, ogUrlsDismissed)),
  //   clearNewPost: () => dispatch(clearNewPostState()),
  //   getProfile: () => dispatch(getUserProfileAction()),
})

export const PublishPostScreen = connect(mapStateToProps, mapDispatchToProps)(PublishPostContainer)

