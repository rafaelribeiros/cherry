import React from 'react'

import { App } from './app'
import { createStore } from './config/redux'

export const Cherry = () => {
  return <App store={createStore()} />
}