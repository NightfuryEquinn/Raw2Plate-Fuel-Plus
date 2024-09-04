import { LOGOUT_CLEAR_FAILURE, LOGOUT_CLEAR_LOADING, LOGOUT_CLEAR_SUCCESS, GET_THE_USER_FAILURE, GET_THE_USER_LOADING, GET_THE_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS } from "redux/types/actionTypes"
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
  action: any
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

    case GET_THE_USER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case GET_THE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          setUserSession: action.payload
        }]
      }

    case GET_THE_USER_FAILURE:
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