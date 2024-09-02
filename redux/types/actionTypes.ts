/**
 * User register
 */
export const USER_REGISTER_LOADING = "USER_REGISTER_LOADING"
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS"
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE"

interface UserRegisterLoading {
  type: typeof USER_REGISTER_LOADING
}

interface UserRegisterSuccess {
  type: typeof USER_REGISTER_SUCCESS,
  payload: any[]
}

interface UserRegisterFailure {
  type: typeof USER_REGISTER_FAILURE,
  payload: string
}

export type UserRegisterAction = UserRegisterLoading | UserRegisterSuccess | UserRegisterFailure

/**
 * Set user session
 */
export const SET_USER_SESSION_LOADING = "SET_USER_SESSION_LOADING"
export const SET_USER_SESSION_SUCCESS = "SET_USER_SESSION_SUCCESS"
export const SET_USER_SESSION_FAILURE = "SET_USER_SESSION_FAILURE"

interface SetUserSessionLoading {
  type: typeof SET_USER_SESSION_LOADING
}

interface SetUserSessionSuccess {
  type: typeof SET_USER_SESSION_SUCCESS,
  payload: any[]
}

interface SetUserSessionFailure {
  type: typeof SET_USER_SESSION_FAILURE,
  payload: string
}

export type SetUserSessionAction = SetUserSessionLoading | SetUserSessionSuccess | SetUserSessionFailure