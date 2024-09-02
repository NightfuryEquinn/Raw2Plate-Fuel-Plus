import { SET_USER_SESSION_FAILURE, SET_USER_SESSION_LOADING, SET_USER_SESSION_SUCCESS, SetUserSessionAction, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    userRegister: null,
    setUserSession: null
  }],
  loading: false,
  error: null
}

export const userReducer = (
  state = initialState,
  action: UserRegisterAction | SetUserSessionAction
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
          userRegister: action.payload
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
    
    default:
      return state
  }
}