import { USER_REGISTER_FAILURE, USER_REGISTER_LOADING, USER_REGISTER_SUCCESS, UserRegisterAction } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    
  }],
  loading: false,
  error: null
}

export const userReducer = (
  state = initialState,
  action: UserRegisterAction
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
        data: [ action.payload ]
      }

    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    
    default:
      return state
  }
}