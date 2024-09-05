import { FETCH_RANDOM_FAILURE, FETCH_RANDOM_LOADING, FETCH_RANDOM_SUCCESS } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    randomRecipes: null
  }],
  loading: false,
  error: null
}

export const recipeReducer = (
  state = initialState,
  action: any
): ReduxState => {
  switch ( action.type ) {
    case FETCH_RANDOM_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RANDOM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          randomRecipes: action.payload
        }]
      }

    case FETCH_RANDOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}