import { LOGOUT_CLEAR_FAILURE, LOGOUT_CLEAR_LOADING, LOGOUT_CLEAR_SUCCESS, LogoutClearAction, RESET_PASSWORD_FAILURE, RESET_PASSWORD_LOADING, RESET_PASSWORD_SUCCESS, ResetPasswordAction, SET_USER_SESSION_FAILURE, SET_USER_SESSION_LOADING, SET_USER_SESSION_SUCCESS, SetUserSessionAction, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, UpdateProfileAction, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    setUserSession: null
  }],
  loading: false,
  error: null
}

export const userReducer = (
  state = initialState,
  action: UserRegisterAction | SetUserSessionAction | ResetPasswordAction | LogoutClearAction | UpdateProfileAction
): ReduxState => {
  switch ( action.type ) {
    case USER_REGISTER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case SET_USER_SESSION_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case SET_USER_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          setUserSession: action.payload
        }]
      }

    case SET_USER_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case RESET_PASSWORD_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    case LOGOUT_CLEAR_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case LOGOUT_CLEAR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          setUserSession: action.payload
        }]
      }
    
    case LOGOUT_CLEAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case UPDATE_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }
    
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          setUserSession: action.payload
        }]
      }

    case UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    default:
      return state
  }
}