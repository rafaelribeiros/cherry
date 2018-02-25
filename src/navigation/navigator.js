import React from 'react'
import { StackNavigator as Navigator, TabNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { FeedScreen } from '../modules/feed/containers/FeedScreen'
import { SignInScreen } from '../modules/authentication/containers/SignInScreen'

import { Colors } from '../constants'

export const initialRouteName = 'MainTab'

const MainStack = Navigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    Feed: {
      screen: FeedScreen,
    },
  },
  { initialRouteName: 'Feed' }
)

const MapStack = Navigator(
  {
    Map: {
      screen: FeedScreen,
    },
  },
  { initialRouteName: 'Map' }
)

const ProfileStack = Navigator(
  {
    Profile: {
      screen: FeedScreen,
    },
  },
  { initialRouteName: 'Profile' }
)

const Tabs = TabNavigator(
  {
    MainTab: {
      screen: MainStack,
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
      screen: MapStack,
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
      screen: ProfileStack,
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
