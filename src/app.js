import React from 'react'
import { Provider } from 'react-redux'
import { Navigator } from './navigation'


export class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Navigator />
      </Provider>
    )
  }
}