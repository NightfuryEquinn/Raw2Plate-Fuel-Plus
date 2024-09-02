import { SET_USER_SESSION_FAILURE, SET_USER_SESSION_LOADING, SET_USER_SESSION_SUCCESS, SetUserSessionAction, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes";

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

export const setUserSessionFailure = ( error: string ) => ({
  type: SET_USER_SESSION_FAILURE,
  payload: error
})