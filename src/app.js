import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from './navigation'

export class App extends React.Component {

  state = { loaded: false }

  componentDidMount = () => {
    const user = { }
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
