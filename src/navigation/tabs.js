import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'

import { FeedScreen } from '../modules/feed/containers/FeedScreen'
import { WelcomeScreen } from '../modules/authentication/containers/WelcomeScreen'

import { Colors } from '../constants'

const MainTab = StackNavigator(
  {
    Feed: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerBackTitle: 'Ocorrências'
      }
    },
  },
  { initialRouteName: 'Feed' }
)

export const Tabs = TabNavigator(
  {
    MainTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Feed',
      },
    },
    MapTab: {
      screen: MainTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Feed',
      },
    },
  },
  {
    tabBarOptions: {
      upperCaseLabel: false,
      showIcon: true,
      showLabel: false,
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.whiteOpaque,
      style: { backgroundColor: Colors.primary },
      indicatorStyle: { opacity: 0 }
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'MainTab',
  }
)
