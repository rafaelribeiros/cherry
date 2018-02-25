import React from 'react'
import { StackNavigator as Navigator, TabNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { FeedScreen } from '../modules/feed/containers/FeedScreen'
import { WelcomeScreen } from '../modules/authentication/containers/WelcomeScreen'

import { Colors } from '../constants'

export const initialRouteName = 'MainTab'

const Main = Navigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        tabBarVisible: false,
      }
    },
    Feed: {
      screen: FeedScreen,
      navigationOptions: {
        headerBackTitle: 'Ocorrências'
      }
    },
  },
  { initialRouteName: 'Feed' }
)

const Tabs = TabNavigator(
  {
    MainTab: {
      screen: Main,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'rss'}
            size={24}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    MapTab: {
      screen: Main,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'google-maps'}
            size={24}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    ProfileTab: {
      screen: Main,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name={'account-circle'}
            size={24}
            style={{ color: tintColor }}
          />
        ),
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

export const StackNavigator = Tabs
// import { Tabs } from './tabs'

// export const initialRouteName = 'Feed'

// export const Navigator = Tabs
