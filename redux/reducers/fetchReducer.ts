import { FETCH_FAILURE, FETCH_START, FETCH_SUCCESS, FetchActionTypes } from "redux/types/actionTypes";
import { FetchState } from "redux/types/stateTypes";

const initialState: FetchState = {
  data: [],
  loading: false,
  error: null
}

export const fetchReducer = (
  state = initialState,
  action: FetchActionTypes
): FetchState => {
  switch ( action.type ) {
    case FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    
      case FETCH_SUCCESS:
        return {
          ...state,
          loading: false,
          data: [action.payload]
        }
      
      case FETCH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }

      default:
        return state
  }
}