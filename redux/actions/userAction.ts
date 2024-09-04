import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "redux/models/User";
import { AppDispatch } from "redux/reducers/store";
import { getTheUserService, userRegisterService } from "redux/services/userServices";
import { LOGOUT_CLEAR_FAILURE, LOGOUT_CLEAR_LOADING, LOGOUT_CLEAR_SUCCESS, LogoutClearAction, GET_THE_USER_FAILURE, GET_THE_USER_LOADING, GET_THE_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, UpdateProfileAction, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes";

/**
 * User register
 */
const userRegisterLoading = (): UserRegisterAction => ({
  type: USER_REGISTER_LOADING
})

const userRegisterSuccess = ( data: any[] ): UserRegisterAction => ({
  type: USER_REGISTER_SUCCESS,
  payload: data
})

const userRegisterFailure = ( error: string ): UserRegisterAction => ({
  type: USER_REGISTER_FAILURE,
  payload: error
})

export const userRegister = ( theUser: User ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( userRegisterLoading() )

    try {
      const res = await userRegisterService( theUser )
      dispatch( userRegisterSuccess( res ) )
    } catch ( error: any ) {
      dispatch( userRegisterFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Set user session
 */
const getTheUserLoading = () => ({
  type: GET_THE_USER_LOADING
})

const getTheUserSuccess = ( data: any[] ) => ({
  type: GET_THE_USER_SUCCESS,
  payload: data
})

const getTheUserFailure = ( error: string ) => ({
  type: GET_THE_USER_FAILURE,
  payload: error
})

export const getTheUser = ( theEmail: string, thePassword: string ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( getTheUserLoading() )

    try {
      const res = await getTheUserService( theEmail, thePassword )
      dispatch( getTheUserSuccess( res ) ) 

      // Create async session
      try {
        await AsyncStorage.setItem( "@user_session", JSON.stringify( res ) )
        console.log( "Done creating session: ", res )
      } catch ( error: any ) {
        console.log( "Error creating session: ", error )
      }
    } catch ( error: any ) {
      dispatch( getTheUserFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Logout clear session
 */
const logoutClearLoading = (): LogoutClearAction => ({
  type: LOGOUT_CLEAR_LOADING
})

const logoutClearSuccess = ( data: any[] ): LogoutClearAction => ({
  type: LOGOUT_CLEAR_SUCCESS,
  payload: data
})

const logoutClearFailure = ( error: string ): LogoutClearAction => ({
  type: LOGOUT_CLEAR_FAILURE,
  payload: error
})

export const logoutClear = () => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( logoutClearLoading() )

    try {
      await AsyncStorage.removeItem( "@user_session" )
      dispatch( logoutClearSuccess( [] ) )
    } catch ( error: any ) {
      dispatch( logoutClearFailure( error.message ) )

      throw error
    }
  }
}

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