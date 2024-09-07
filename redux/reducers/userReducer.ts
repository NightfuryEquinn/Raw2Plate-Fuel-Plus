import { DELETE_BOOKMARK_FAILURE, DELETE_BOOKMARK_LOADING, DELETE_BOOKMARK_SUCCESS, FETCH_BOOKMARK_FAILURE, FETCH_BOOKMARK_INFO_FAILURE, FETCH_BOOKMARK_INFO_LOADING, FETCH_BOOKMARK_INFO_SUCCESS, FETCH_BOOKMARK_LOADING, FETCH_BOOKMARK_SUCCESS, GET_THE_USER_FAILURE, GET_THE_USER_LOADING, GET_THE_USER_SUCCESS, LOGOUT_CLEAR_FAILURE, LOGOUT_CLEAR_LOADING, LOGOUT_CLEAR_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_LOADING, UPDATE_PROFILE_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    setUserSession: null,
    fetchBookmarks: null,
    bookmarkedRecipes: null
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

    case FETCH_BOOKMARK_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_BOOKMARK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          fetchBookmarks: action.payload
        }]
      }

    case FETCH_BOOKMARK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_BOOKMARK_INFO_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_BOOKMARK_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          bookmarkedRecipes: action.payload
        }]
      }

    case FETCH_BOOKMARK_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case DELETE_BOOKMARK_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case DELETE_BOOKMARK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    default:
      return state
  }
}