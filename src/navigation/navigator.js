import { StackNavigator as Navigator } from 'react-navigation'

import { Tabs } from './navigatorTabs'
import { AuthStack } from './authStack'

export const initialRouteName = 'auth'

export const StackNavigator = Navigator({
  auth: { screen: AuthStack },
  home: { screen: Tabs }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName,
})
