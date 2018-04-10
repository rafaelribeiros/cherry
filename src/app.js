import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from './navigation'
import { setUpConfigs } from './config'

export class App extends React.Component {

  state = { loaded: false, isLogged: false }

  componentDidMount = () => {
    const user = { }
    setUpConfigs()
    this.setState({ isLogged: typeof user.id !== 'undefined', loaded: true })
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
