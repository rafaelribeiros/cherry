import React from 'react'
import { App } from './app'
import { createStore } from './config/redux'

const store = createStore()

export const Cherry = () => {
  return <App store={store} />
}
