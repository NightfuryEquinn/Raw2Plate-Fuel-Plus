import { Bookmark } from "redux/models/Bookmark";
import { Meal } from "redux/models/Meal";
import { AppDispatch } from "redux/reducers/store";
import { addRecipesPlannerService, bookmarkRecipeService, deletePlannerRecipesService, discoverSearchService, fetchPlannerRecipesService, fetchRandomService, fetchRecipeInfoService, fetchRecipeIngreStepsService, fetchRecipePlannerTrackerInfoService } from "redux/services/recipeServices";
import { ADD_RECIPE_PLANNER_FAILURE, ADD_RECIPE_PLANNER_LOADING, ADD_RECIPE_PLANNER_SUCCESS, BOOKMARK_FAILURE, BOOKMARK_LOADING, BOOKMARK_SUCCESS, DELETE_PLANNER_RECIPES_FAILURE, DELETE_PLANNER_RECIPES_LOADING, DELETE_PLANNER_RECIPES_SUCCESS, DISCOVER_SEARCH_FAILURE, DISCOVER_SEARCH_LOADING, DISCOVER_SEARCH_SUCCESS, FETCH_PLANNER_RECIPES_FAILURE, FETCH_PLANNER_RECIPES_LOADING, FETCH_PLANNER_RECIPES_SUCCESS, FETCH_RANDOM_FAILURE, FETCH_RANDOM_LOADING, FETCH_RANDOM_SUCCESS, FETCH_RECIPE_INFO_FAILURE, FETCH_RECIPE_INFO_LOADING, FETCH_RECIPE_INFO_SUCCESS, FETCH_RECIPE_INGRE_STEPS_FAILURE, FETCH_RECIPE_INGRE_STEPS_LOADING, FETCH_RECIPE_INGRE_STEPS_SUCCESS, FETCH_RECIPE_PLANNER_TRACKER_INFO_FAILURE, FETCH_RECIPE_PLANNER_TRACKER_INFO_LOADING, FETCH_RECIPE_PLANNER_TRACKER_INFO_SUCCESS } from "redux/types/actionTypes";

/**
 * Fetch random recipes
 */
const fetchRandomLoading = () => ({
  type: FETCH_RANDOM_LOADING
})

const fetchRandomSuccess = ( data: any[] ) => ({
  type: FETCH_RANDOM_SUCCESS,
  payload: data
})

const fetchRandomFailure = ( error: string ) => ({
  type: FETCH_RANDOM_FAILURE,
  payload: error
})

export const fetchRandom = ( theNumber: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchRandomLoading() )
  
    try {
      const res = await fetchRandomService( theNumber )
      dispatch( fetchRandomSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchRandomFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch recipe information
 */
const fetchRecipeInfoLoading = () => ({
  type: FETCH_RECIPE_INFO_LOADING
})

const fetchRecipeInfoSuccess = ( data: any[] ) => ({
  type: FETCH_RECIPE_INFO_SUCCESS,
  payload: data
})

const fetchRecipeInfoFailure = ( error: string ) => ({
  type: FETCH_RECIPE_INFO_FAILURE,
  payload: error
})

export const fetchRecipeInfo = ( theRecipeId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchRecipeInfoLoading() )
  
    try {
      const res = await fetchRecipeInfoService( theRecipeId )
      dispatch( fetchRecipeInfoSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchRecipeInfoFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch recipe ingredients and steps
 */
const fetchRecipeIngreStepsLoading = () => ({
  type: FETCH_RECIPE_INGRE_STEPS_LOADING
})

const fetchRecipeIngreStepsSuccess = ( data: any[] ) => ({
  type: FETCH_RECIPE_INGRE_STEPS_SUCCESS,
  payload: data
})

const fetchRecipeIngreStepsFailure = ( error: string ) => ({
  type: FETCH_RECIPE_INGRE_STEPS_FAILURE,
  payload: error
})

export const fetchRecipeIngreSteps = ( theRecipeId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchRecipeIngreStepsLoading() )
  
    try {
      const res = await fetchRecipeIngreStepsService( theRecipeId )
      dispatch( fetchRecipeIngreStepsSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchRecipeIngreStepsFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Discover search with filters
 */
const discoverSearchLoading = () => ({
  type: DISCOVER_SEARCH_LOADING
})

const discoverSearchSuccess = ( data: any[] ) => ({
  type: DISCOVER_SEARCH_SUCCESS,
  payload: data
})

const discoverSearchFailure = ( error: string ) => ({
  type: DISCOVER_SEARCH_FAILURE,
  payload: error
})

export const discoverSearch = ( query: string, theNumber: number, theCuisine: string, include: string, exclude: string, minCal: number, maxCal: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( discoverSearchLoading() )
  
    try {
      const res = await discoverSearchService( query, theNumber, theCuisine, include, exclude, minCal, maxCal )
      dispatch( discoverSearchSuccess( res ) )
    } catch ( error: any ) {
      dispatch( discoverSearchFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Bookmark recipes
 */
const bookmarkRecipeLoading = () => ({
  type: BOOKMARK_LOADING
})

const bookmarkRecipeSuccess = ( data: any[] ) => ({
  type: BOOKMARK_SUCCESS,
  payload: data
})

const bookmarkRecipeFailure = ( error: string ) => ({
  type: BOOKMARK_FAILURE,
  payload: error
})

export const bookmarkRecipe = ( theBookmark: Bookmark ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( bookmarkRecipeLoading() )

    try {
      const res = await bookmarkRecipeService( theBookmark )
      dispatch( bookmarkRecipeSuccess( res ) )
    } catch ( error: any ) {
      dispatch( bookmarkRecipeFailure( error.message ) )

      return error.response.status
    }
  }
}

/**
 * Fetch planner recipes
 */
const fetchPlannerRecipesLoading = () => ({
  type: FETCH_PLANNER_RECIPES_LOADING
})

const fetchPlannerRecipesSuccess = ( data: any[] ) => ({
  type: FETCH_PLANNER_RECIPES_SUCCESS,
  payload: data
})

const fetchPlannerRecipesFailure = ( error: string ) => ({
  type: FETCH_PLANNER_RECIPES_FAILURE,
  payload: error
})

export const fetchPlannerRecipes = ( theUserId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchPlannerRecipesLoading() )

    try {
      const res = await fetchPlannerRecipesService( theUserId )
      dispatch( fetchPlannerRecipesSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchPlannerRecipesFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Add recipes to planner
 */
const addRecipesPlannerLoading = () => ({
  type: ADD_RECIPE_PLANNER_LOADING
})

const addRecipesPlannerSuccess = ( data: any[] ) => ({
  type: ADD_RECIPE_PLANNER_SUCCESS,
  payload: data
})

const addRecipesPlannerFailure = ( error: string ) => ({
  type: ADD_RECIPE_PLANNER_FAILURE,
  payload: error
})

export const addRecipesPlanner = ( theUserId: number, theDate: string, theMeal: Meal ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( addRecipesPlannerLoading() )

    try {
      const res = await addRecipesPlannerService( theUserId, theDate, theMeal )
      dispatch( addRecipesPlannerSuccess( res ) )
    } catch ( error: any ) {
      dispatch( addRecipesPlannerFailure( error.message ) )

      return error.response.status
    }
  }
}

/**
 * Fetch planner and tracker recipes info
 */
const fetchRecipePlannerTrackerInfoLoading = () => ({
  type: FETCH_RECIPE_PLANNER_TRACKER_INFO_LOADING
})

const fetchRecipePlannerTrackerInfoSuccess = ( data: any[] ) => ({
  type: FETCH_RECIPE_PLANNER_TRACKER_INFO_SUCCESS,
  payload: data
})

const fetchRecipePlannerTrackerInfoFailure = ( error: string ) => ({
  type: FETCH_RECIPE_PLANNER_TRACKER_INFO_FAILURE,
  payload: error
})

export const fetchRecipePlannerTrackerInfo = ( theRecipeIds: string ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchRecipePlannerTrackerInfoLoading() )

    try {
      const res = await fetchRecipePlannerTrackerInfoService( theRecipeIds )
      dispatch( fetchRecipePlannerTrackerInfoSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchRecipePlannerTrackerInfoFailure( error.message ) )

      return error.response.status
    }
  }
}

/**
 * Delete planner recipes
 */
const deletePlannerRecipesLoading = () => ({
  type: DELETE_PLANNER_RECIPES_LOADING
})

const deletePlannerRecipesSuccess = ( data: any[] ) => ({
  type: DELETE_PLANNER_RECIPES_SUCCESS,
  payload: data
})

const deletePlannerRecipesFailure = ( error: string ) => ({
  type: DELETE_PLANNER_RECIPES_FAILURE,
  payload: error
})

export const deletePlannerRecipes = ( theNumber: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( deletePlannerRecipesLoading() )

    try {
      const res = await deletePlannerRecipesService( theNumber )
      dispatch( deletePlannerRecipesSuccess( res ) )
    } catch ( error: any ) {
      dispatch( deletePlannerRecipesFailure( error.message ) )

      return error.response.status
    }
  }
}

/**
 * Add recipes to tracker
 */