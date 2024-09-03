import { LOGOUT_CLEAR_FAILURE, LOGOUT_CLEAR_LOADING, LOGOUT_CLEAR_SUCCESS, LogoutClearAction, RESET_PASSWORD_FAILURE, RESET_PASSWORD_LOADING, RESET_PASSWORD_SUCCESS, ResetPasswordAction, SET_USER_SESSION_FAILURE, SET_USER_SESSION_LOADING, SET_USER_SESSION_SUCCESS, SetUserSessionAction, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, UpdateProfileAction, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes";

/**
 * User register
 */
export const userRegisterLoading = (): UserRegisterAction => ({
  type: USER_REGISTER_LOADING
})

export const userRegisterSuccess = ( data: any[] ): UserRegisterAction => ({
  type: USER_REGISTER_SUCCESS,
  payload: data
})

export const userRegisterFailure = ( error: string ): UserRegisterAction => ({
  type: USER_REGISTER_FAILURE,
  payload: error
})

/**
 * Set user session
 */
export const setUserSessionLoading = (): SetUserSessionAction => ({
  type: SET_USER_SESSION_LOADING
})

export const setUserSessionSuccess = ( data: any[] ): SetUserSessionAction => ({
  type: SET_USER_SESSION_SUCCESS,
  payload: data
})

export const setUserSessionFailure = ( error: string ): SetUserSessionAction => ({
  type: SET_USER_SESSION_FAILURE,
  payload: error
})

/**
 * Reset password
 */
export const resetPasswordLoading = (): ResetPasswordAction => ({
  type: RESET_PASSWORD_LOADING
})

export const resetPasswordSuccess = ( data: any[] ): ResetPasswordAction => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data
})

export const resetPasswordFailure = ( error: string ): ResetPasswordAction => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error
})

/**
 * Logout clear session
 */
export const logoutClearLoading = (): LogoutClearAction => ({
  type: LOGOUT_CLEAR_LOADING
})

export const logoutClearSuccess = ( data: any[] ): LogoutClearAction => ({
  type: LOGOUT_CLEAR_SUCCESS,
  payload: data
})

export const logoutClearFailure = ( error: string ): LogoutClearAction => ({
  type: LOGOUT_CLEAR_FAILURE,
  payload: error
})

/**
 * Update profile
 */
export const updateProfileLoading = (): UpdateProfileAction => ({
  type: UPDATE_PROFILE_LOADING
})

export const updateProfileSuccess = ( data: any[] ): UpdateProfileAction => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data
})

export const updateProfileFailure = ( error: string ): UpdateProfileAction => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error
})