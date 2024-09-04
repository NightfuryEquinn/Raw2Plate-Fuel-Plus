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
 * Get the user
 */
export const GET_THE_USER_LOADING = "GET_THE_USER_LOADING"
export const GET_THE_USER_SUCCESS = "GET_THE_USER_SUCCESS"
export const GET_THE_USER_FAILURE = "GET_THE_USER_FAILURE"

/**
 * Logout clear session
 */
export const LOGOUT_CLEAR_LOADING = "LOGOUT_CLEAR_LOADING"
export const LOGOUT_CLEAR_SUCCESS = "LOGOUT_CLEAR_SUCCESS"
export const LOGOUT_CLEAR_FAILURE = "LOGOUT_CLEAR_FAILURE"

interface LogoutClearLoading {
  type: typeof LOGOUT_CLEAR_LOADING
}

interface LogoutClearSuccess {
  type: typeof LOGOUT_CLEAR_SUCCESS,
  payload: any[]
}

interface LogoutClearFailure {
  type: typeof LOGOUT_CLEAR_FAILURE,
  payload: string
}

export type LogoutClearAction = LogoutClearLoading | LogoutClearSuccess | LogoutClearFailure

/**
 * Update profile
 */
export const UPDATE_PROFILE_LOADING = "UPDATE_PROFILE_LOADING"
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS"
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE"

interface UpdateProfileLoading {
  type: typeof UPDATE_PROFILE_LOADING
}

interface UpdateProfileSuccess {
  type: typeof UPDATE_PROFILE_SUCCESS,
  payload: any[]
}

interface UpdateProfileFailure {
  type: typeof UPDATE_PROFILE_FAILURE,
  payload: string
}

export type UpdateProfileAction = UpdateProfileLoading | UpdateProfileSuccess | UpdateProfileFailure