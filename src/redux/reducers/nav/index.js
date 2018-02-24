import { StackNavigator, initialRouteName } from '../../../navigation/navigator'

const initialState = StackNavigator.router.getStateForAction(StackNavigator.router.getActionForPathAndParams(initialRouteName))

export const navigationReducer = (state = initialState, action) => {
  const nextState = StackNavigator.router.getStateForAction(action, state)
  return nextState || state
}
