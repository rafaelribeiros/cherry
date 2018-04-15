import React from 'react'
import { StackNavigator as Navigator, TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { FeedScreen } from '../modules/feed/containers/FeedScreen'
import { MapScreen } from '../modules/map/containers/MapScreen'
import { ProfileScreen } from '../modules/profile/containers/ProfileScreen'
import { ProfileEditScreen } from '../modules/profile/containers/ProfileEditScreen'

import { Colors } from '../constants'

const MainStack = Navigator(
  {
    Feed: {
      screen: FeedScreen,
    },
  },
  { initialRouteName: 'Feed' }
)

const MapStack = Navigator(
  {
    Map: {
      screen: MapScreen,
    },
  },
  { initialRouteName: 'Map' }
)

const ProfileStack = Navigator(
  {
    Profile: {
      screen: ProfileScreen,
    },
    ProfileEdit: {
      screen: ProfileEditScreen,
      navigationOptions: {
        title: 'Editar Perfil',
        headerBackTitle: 'Editar',
        tabBarVisible: false,
      }
    },
  },
  { initialRouteName: 'Profile' }
)

export const Tabs = TabNavigator(
  {
    MainTab: {
      screen: MainStack,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="rss"
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
            name="google-maps"
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
            name="account-circle"
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
