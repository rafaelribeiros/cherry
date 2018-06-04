export const NOT_LOGGED_IN = {
  id: null,
  name: undefined,
  email: null,
  pageAdmin: {},
  isAdmin: false,
  isAuthenticated: false,
}

export const NO_REGISTERED = {
  name: undefined,
  email: undefined,
  password: undefined,
  city: undefined,
  state: undefined,
}
export const NO_ALERTS = { showAlert: false, message: '' }

export const AUTH_INITIAL_STATE = {
  user: NOT_LOGGED_IN,
  isLoading: false,
  alert: NO_ALERTS,
  device: { pushToken: undefined, userId: undefined },
  regData: NO_REGISTERED,
}
