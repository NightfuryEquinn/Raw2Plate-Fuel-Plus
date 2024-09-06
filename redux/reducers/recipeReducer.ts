import { DISCOVER_SEARCH_FAILURE, DISCOVER_SEARCH_LOADING, DISCOVER_SEARCH_SUCCESS, FETCH_RANDOM_FAILURE, FETCH_RANDOM_LOADING, FETCH_RANDOM_SUCCESS, FETCH_RECIPE_INFO_FAILURE, FETCH_RECIPE_INFO_LOADING, FETCH_RECIPE_INFO_SUCCESS, FETCH_RECIPE_INGRE_STEPS_FAILURE, FETCH_RECIPE_INGRE_STEPS_LOADING, FETCH_RECIPE_INGRE_STEPS_SUCCESS } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    randomRecipes: null,
    recipeInfo: null,
    recipeIngreSteps: null,
    cacheIngre: null,
    cacheSteps: null
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

    case FETCH_RECIPE_INFO_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RECIPE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          recipeInfo: action.payload
        }]
      }

    case FETCH_RECIPE_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_RECIPE_INGRE_STEPS_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RECIPE_INGRE_STEPS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          recipeIngreSteps: action.payload
        }]
      }

    case FETCH_RECIPE_INGRE_STEPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case DISCOVER_SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case DISCOVER_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          randomRecipes: action.payload
        }]
      }

    case DISCOVER_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}