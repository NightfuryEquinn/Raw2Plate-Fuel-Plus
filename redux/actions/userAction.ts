import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "redux/models/User";
import { AppDispatch } from "redux/reducers/store";
import { getTheUserService, updateProfileService, userRegisterService } from "redux/services/userServices";
import { GET_THE_USER_FAILURE, GET_THE_USER_LOADING, GET_THE_USER_SUCCESS, LOGOUT_CLEAR_FAILURE, LOGOUT_CLEAR_LOADING, LOGOUT_CLEAR_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS } from "redux/types/actionTypes";

/**
 * User register
 */
const userRegisterLoading = () => ({
  type: USER_REGISTER_LOADING
})

const userRegisterSuccess = ( data: any[] ) => ({
  type: USER_REGISTER_SUCCESS,
  payload: data
})

const userRegisterFailure = ( error: string ) => ({
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
const logoutClearLoading = () => ({
  type: LOGOUT_CLEAR_LOADING
})

const logoutClearSuccess = ( data: any[] ) => ({
  type: LOGOUT_CLEAR_SUCCESS,
  payload: data
})

const logoutClearFailure = ( error: string ) => ({
  type: LOGOUT_CLEAR_FAILURE,
  payload: error
})

export const logoutClear = () => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( logoutClearLoading() )

    try {
      dispatch( logoutClearSuccess( [] ) )

      const sessionUser = await AsyncStorage.removeItem( "@user_session" )

      console.log( "Done removing session: ", sessionUser )
    } catch ( error: any ) {
      dispatch( logoutClearFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Update profile
 */
const updateProfileLoading = () => ({
  type: UPDATE_PROFILE_LOADING
})

const updateProfileSuccess = ( data: any[] ) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: data
})

const updateProfileFailure = ( error: string ) => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: error
})

export const updateProfile = ( theUser: User ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( updateProfileLoading() )

    try {
      const res = await updateProfileService( theUser )
      dispatch( updateProfileSuccess( res ) )

      try {
        await AsyncStorage.removeItem( "@user_session" )
        const sessionUser = await AsyncStorage.setItem( "@user_session", JSON.stringify( theUser ) )

        console.log( "Done updating session: ", sessionUser )
      } catch ( error: any ) {
        console.log( "Error updating session: ", error )
      }
    } catch ( error: any ) {
      dispatch( updateProfileFailure( error.message ) )

      throw error
    }
  }
}