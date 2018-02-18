import { StackNavigator, initialRouteName } from '../../../navigation/navigator'

const { getStateForAction, getActionForPathAndParams } = StackNavigator.router
console.log(getStateForAction)
console.log(getActionForPathAndParams)
const initialState = getStateForAction(
  getActionForPathAndParams(initialRouteName)
)

export const navigationReducer = (state = initialState, action) => {
  const nextState = getStateForAction(action, state)
  return nextState || state
}

// import { NavigationActions } from 'react-navigation'
// import { StackNavigator } from '../../../navigation/navigator'

// const initialState = StackNavigator.router.getStateForAction(
//   NavigationActions.init()
// )

// console.log(initialState)

// export const navigationReducer = (state = initialState, action) => {
//   const nextState = StackNavigator.router.getStateForAction(action, state)
//   console.log(nextState)
//   return nextState || state
// }
