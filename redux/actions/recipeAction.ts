import { Bookmark } from "redux/models/Bookmark";
import { AppDispatch } from "redux/reducers/store";
import { bookmarkRecipeService, discoverSearchService, fetchRandomService, fetchRecipeInfoService, fetchRecipeIngreStepsService } from "redux/services/recipeServices";
import { BOOKMARK_FAILURE, BOOKMARK_LOADING, BOOKMARK_SUCCESS, DISCOVER_SEARCH_FAILURE, DISCOVER_SEARCH_LOADING, DISCOVER_SEARCH_SUCCESS, FETCH_RANDOM_FAILURE, FETCH_RANDOM_LOADING, FETCH_RANDOM_SUCCESS, FETCH_RECIPE_INFO_FAILURE, FETCH_RECIPE_INFO_LOADING, FETCH_RECIPE_INFO_SUCCESS, FETCH_RECIPE_INGRE_STEPS_FAILURE, FETCH_RECIPE_INGRE_STEPS_LOADING, FETCH_RECIPE_INGRE_STEPS_SUCCESS } from "redux/types/actionTypes";

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

/**
 * Add recipes to planner
 */


/**
 * Add recipes to tracker
 */