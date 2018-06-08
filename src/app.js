import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from './navigation'
import { setUpConfigs } from './config'
import { getUser, getUserLocation } from './config/utils'
import { saveUser } from './redux/actions/sync/authenticationSyncActions'
import { setLocation } from './redux/actions/sync/feedSyncActions'

export class App extends React.Component {

  state = { loaded: false, isLogged: false }

  componentDidMount = () => {
    setUpConfigs()
    getUser().then((user) => {
      this.props.store.dispatch(saveUser(user))
      this.setState({ isLogged: typeof user.id !== 'undefined', loaded: true })
    })
    getUserLocation().then((loc) => {
      this.props.store.dispatch(setLocation(loc))
    })
  }
  render() {
    return (
      this.state.loaded &&
      <Provider store={this.props.store}>
        <Navigator isLogged={this.state.isLogged} />
      </Provider>
    )
  }
}
