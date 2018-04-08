import { StackNavigator as Navigator } from 'react-navigation'

import { SignInScreen } from '../modules/authentication/containers/SignInScreen'
import { SignUpEmailScreen } from '../modules/authentication/containers/SignUpEmailScreen'
import { SignUpPasswordScreen } from '../modules/authentication/containers/SignUpPasswordScreen'
import { SignUpNameScreen } from '../modules/authentication/containers/SignUpNameScreen'
import { SignUpStateScreen } from '../modules/authentication/containers/SignUpStateScreen'
import { SignUpCityScreen } from '../modules/authentication/containers/SignUpCityScreen'

export const AuthStack = Navigator({
  Welcome: {
    screen: SignInScreen,
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
}, {
  headerMode: 'none',
  initialRouteName: 'Welcome',
})
