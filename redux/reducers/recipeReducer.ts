import { ADD_RECIPE_PLANNER_FAILURE, ADD_RECIPE_PLANNER_LOADING, ADD_RECIPE_PLANNER_SUCCESS, BOOKMARK_FAILURE, BOOKMARK_LOADING, BOOKMARK_SUCCESS, DELETE_PLANNER_RECIPES_FAILURE, DELETE_PLANNER_RECIPES_LOADING, DELETE_PLANNER_RECIPES_SUCCESS, DISCOVER_SEARCH_FAILURE, DISCOVER_SEARCH_LOADING, DISCOVER_SEARCH_SUCCESS, FETCH_PLANNER_RECIPES_FAILURE, FETCH_PLANNER_RECIPES_LOADING, FETCH_PLANNER_RECIPES_SUCCESS, FETCH_RANDOM_FAILURE, FETCH_RANDOM_LOADING, FETCH_RANDOM_SUCCESS, FETCH_RECIPE_INFO_FAILURE, FETCH_RECIPE_INFO_LOADING, FETCH_RECIPE_INFO_SUCCESS, FETCH_RECIPE_INGRE_STEPS_FAILURE, FETCH_RECIPE_INGRE_STEPS_LOADING, FETCH_RECIPE_INGRE_STEPS_SUCCESS, FETCH_RECIPE_PLANNER_TRACKER_INFO_FAILURE, FETCH_RECIPE_PLANNER_TRACKER_INFO_LOADING, FETCH_RECIPE_PLANNER_TRACKER_INFO_SUCCESS } from "redux/types/actionTypes"
import { ReduxState } from "redux/types/stateTypes"

const initialState: ReduxState = {
  data: [{
    randomRecipes: null,
    recipeInfo: null,
    recipeIngreSteps: null,
    cacheIngre: null,
    cacheSteps: null,
    plannerRecipes: null,
    plannerRecipesInfo: null
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

    case BOOKMARK_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case BOOKMARK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case BOOKMARK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_PLANNER_RECIPES_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_PLANNER_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          plannerRecipes: action.payload
        }]
      }

    case FETCH_PLANNER_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ADD_RECIPE_PLANNER_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ADD_RECIPE_PLANNER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case ADD_RECIPE_PLANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_RECIPE_PLANNER_TRACKER_INFO_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_RECIPE_PLANNER_TRACKER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          plannerRecipesInfo: action.payload
        }]
      }

    case FETCH_RECIPE_PLANNER_TRACKER_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case DELETE_PLANNER_RECIPES_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case DELETE_PLANNER_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      }

    case DELETE_PLANNER_RECIPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}