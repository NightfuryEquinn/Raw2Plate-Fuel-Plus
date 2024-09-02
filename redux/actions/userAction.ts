import { USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes";

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