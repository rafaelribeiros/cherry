import React from 'react'
import { StatusBar } from 'react-native'

import { Colors } from '../../../constants'

export const StatusBarStandard = () => (
  <StatusBar barStyle={'light-content'} translucent backgroundColor={Colors.androidStatusBar} />
)
