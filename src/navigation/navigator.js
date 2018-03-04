import React from 'react'
import { StackNavigator as Navigator, TabNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { WelcomeScreen } from '../modules/authentication/containers/WelcomeScreen'
import { SignInScreen } from '../modules/authentication/containers/SignInScreen'
import { SignUpEmailScreen } from '../modules/authentication/containers/SignUpEmailScreen'
import { SignUpPasswordScreen } from '../modules/authentication/containers/SignUpPasswordScreen'
import { SignUpNameScreen } from '../modules/authentication/containers/SignUpNameScreen'
import { SignUpStateScreen } from '../modules/authentication/containers/SignUpStateScreen'
import { SignUpCityScreen } from '../modules/authentication/containers/SignUpCityScreen'
import { FeedScreen } from '../modules/feed/containers/FeedScreen'
import { MapScreen } from '../modules/map/containers/MapScreen'
import { ProfileScreen } from '../modules/profile/containers/ProfileScreen'

import { Colors } from '../constants'


export const initialRouteName = 'MainTab'

const MainStack = Navigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    SignUpEmail: {
      screen: SignUpEmailScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    SignUpPassword: {
      screen: SignUpPasswordScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    SignUpName: {
      screen: SignUpNameScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    SignUpState: {
      screen: SignUpStateScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    SignUpCity: {
      screen: SignUpCityScreen,
      navigationOptions: {
        tabBarVisible: false,
        header: null
      }
    },
    Feed: {
      screen: FeedScreen,
    },
  },
  { initialRouteName: 'Welcome' }
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
