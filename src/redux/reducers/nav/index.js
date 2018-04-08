import { NavigationActions } from 'react-navigation'
import { StackNavigator, initialRouteName } from '../../../navigation/navigator'

const initialState = StackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: initialRouteName }))

export const navigationReducer = (state = initialState, action) => {
  const nextState = StackNavigator.router.getStateForAction(action, state)
  return nextState || state
}
