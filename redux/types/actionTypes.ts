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

/**
 * Reset password
 */
export const RESET_PASSWORD_LOADING = "RESET_PASSWORD_LOADING"
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE"

interface ResetPasswordLoading {
  type: typeof RESET_PASSWORD_LOADING
}

interface ResetPasswordSuccess {
  type: typeof RESET_PASSWORD_SUCCESS,
  payload: any[]
}

interface ResetPasswordFailure {
  type: typeof RESET_PASSWORD_FAILURE,
  payload: string
}

export type ResetPasswordAction = ResetPasswordLoading | ResetPasswordSuccess | ResetPasswordFailure

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