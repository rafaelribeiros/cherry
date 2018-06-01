
export function getLoading(state) {
  return state.auth.isLoading
}

export function getAlert(state) {
  return state.auth.alert
}

export function getRegData(state) {
  return state.auth.regData
}

export function getUser(state) {
  return state.auth.user
}
