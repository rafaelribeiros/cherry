import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, bool, } from 'prop-types'

import { PublishPost } from '../components/publishPost'
import { getLoadingPost } from '../../../redux/reducers/feed/selectors'
import { publishPostAction } from '../../../redux/actions/async/feedAsyncActions'
import { Values } from '../../../constants'

class PublishPostContainer extends Component {
  static navigationOptions = () => ({
    ...Values.navbarStyles.primary,
  })

  static defaultProps = {
    navigation: {},
    loading: false,
  }

  static propTypes = {
    navigation: object,
    loading: bool,
  }

  navigateBack = () => this.props.navigation.goBack()

  onPublishPress = async (formData) => {
    console.log(formData)
    //  await this.props.publishPost(formData, this.props.navigation)
  }

  render() {
    return (
      <PublishPost
        goBack={this.navigateBack}
        onPublishPress={this.onPublishPress}
        loading={this.props.loading}
      />
    )
  }
}

const mapStateToProps = state => ({
  loading: getLoadingPost(state),
})

const mapDispatchToProps = dispatch => ({
  publishPost: (formData, navigation) => dispatch(publishPostAction(formData, navigation)),
})

export const PublishPostScreen = connect(mapStateToProps, mapDispatchToProps)(PublishPostContainer)

