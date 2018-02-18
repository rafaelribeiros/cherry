import { StackNavigator as Navigator } from 'react-navigation'

import { Tabs } from './tabs'
import { WelcomeScreen } from '../modules/authentication/containers/WelcomeScreen'

export const initialRouteName = 'authenticationStack'
const stackNavigatorConfig = { initialRouteName, headerMode: 'none' }


const AuthenticationStack = Navigator({
  WelcomeScreen: { screen: WelcomeScreen },
}, {
    headerMode: 'none',
  })

const routeConfigs = {
  authenticationStack: { screen: AuthenticationStack },
  main: { screen: Tabs }
}

export const StackNavigator = Navigator(routeConfigs, stackNavigatorConfig)