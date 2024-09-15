import { ADD_MANUAL_RECIPE_TRACKER_FAILURE, ADD_MANUAL_RECIPE_TRACKER_LOADING, ADD_MANUAL_RECIPE_TRACKER_SUCCESS, FETCH_RECIPE_NUTRIENTS_FAILURE, FETCH_RECIPE_NUTRIENTS_LOADING, FETCH_RECIPE_NUTRIENTS_SUCCESS } from "redux/types/actionTypes";
import { ReduxState } from "redux/types/stateTypes";

const initialState: ReduxState = {
  data: [{
    cacheRecipesNutrients: [{

    }]
  }],
  loading: false,
  error: null
}

export const trackerReducer = (
  state = initialState,
  action: any
): ReduxState => {
  switch ( action.type ) {
    case ADD_MANUAL_RECIPE_TRACKER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ADD_MANUAL_RECIPE_TRACKER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case ADD_MANUAL_RECIPE_TRACKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_RECIPE_NUTRIENTS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RECIPE_NUTRIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          cacheRecipesNutrients: [
            ...state.data[ 0 ].cacheRecipesNutrients, 
            action.payload
          ]
        }]
      }

    case FETCH_RECIPE_NUTRIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
      
    default:
      return state
  }
}
