import { ManualMeal } from "redux/models/ManualMeal"
import { AppDispatch } from "redux/reducers/store"
import { addManualRecipesTrackerService, deleteManualService, fetchRecipesNutrientsService, fetchTrackerManualService, fetchTrackerRecipesService } from "redux/services/trackerServices"
import { ADD_MANUAL_RECIPE_TRACKER_FAILURE, ADD_MANUAL_RECIPE_TRACKER_LOADING, ADD_MANUAL_RECIPE_TRACKER_SUCCESS, DELETE_MANUAL_FAILURE, DELETE_MANUAL_LOADING, DELETE_MANUAL_SUCCESS, FETCH_RECIPE_NUTRIENTS_FAILURE, FETCH_RECIPE_NUTRIENTS_LOADING, FETCH_RECIPE_NUTRIENTS_SUCCESS, FETCH_TRACKER_MANUAL_FAILURE, FETCH_TRACKER_MANUAL_LOADING, FETCH_TRACKER_MANUAL_SUCCESS, FETCH_TRACKER_RECIPES_FAILURE, FETCH_TRACKER_RECIPES_LOADING, FETCH_TRACKER_RECIPES_SUCCESS } from "redux/types/actionTypes"

/**
 * Add manual recipes to tracker
 */
const addManualRecipesTrackerLoading = () => ({
  type: ADD_MANUAL_RECIPE_TRACKER_LOADING
})

const addManualRecipesTrackerSuccess = ( data: any[] ) => ({
  type: ADD_MANUAL_RECIPE_TRACKER_SUCCESS,
  payload: data
})

const addManualRecipesTrackerFailure = ( error: string ) => ({
  type: ADD_MANUAL_RECIPE_TRACKER_FAILURE,
  payload: error
})

export const addManualRecipesTracker = ( theUserId: number, theDate: string, theManualMeal: ManualMeal ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( addManualRecipesTrackerLoading() )

    try {
      const res = await addManualRecipesTrackerService( theUserId, theDate, theManualMeal )
      dispatch( addManualRecipesTrackerSuccess( res ) )
    } catch ( error: any ) {
      dispatch( addManualRecipesTrackerFailure( error.message ) )

      return error.response.status
    }
  }
}

/**
 * Get recipes nutrients info
 */
const fetchRecipesNutrientsLoading = () => ({
  type: FETCH_RECIPE_NUTRIENTS_LOADING
})

const fetchRecipesNutrientsSuccess = ( data: any[] ) => ({
  type: FETCH_RECIPE_NUTRIENTS_SUCCESS,
  payload: data
})

const fetchRecipesNutrientsFailure = ( error: string ) => ({
  type: FETCH_RECIPE_NUTRIENTS_FAILURE,
  payload: error
})

export const fetchRecipesNutrients = ( theRecipeId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchRecipesNutrientsLoading() )

    try {
      const res = await fetchRecipesNutrientsService( theRecipeId )
      dispatch( fetchRecipesNutrientsSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchRecipesNutrientsFailure( error.message ) )

      return error.response.status
    }
  }
}

/**
 * Fetch tracker recipes
 */
const fetchTrackerRecipesLoading = () => ({
  type: FETCH_TRACKER_RECIPES_LOADING
})

const fetchTrackerRecipesSuccess = ( data: any[] ) => ({
  type: FETCH_TRACKER_RECIPES_SUCCESS,
  payload: data
})

const fetchTrackerRecipesFailure = ( error: string ) => ({
  type: FETCH_TRACKER_RECIPES_FAILURE,
  payload: error
})

export const fetchTrackerRecipes = ( theUserId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchTrackerRecipesLoading() )

    try {
      const res = await fetchTrackerRecipesService( theUserId )
      dispatch( fetchTrackerRecipesSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchTrackerRecipesFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch tracker manual recipes
 */
const fetchTrackerManualLoading = () => ({
  type: FETCH_TRACKER_MANUAL_LOADING
})

const fetchTrackerManualSuccess = ( data: any[] ) => ({
  type: FETCH_TRACKER_MANUAL_SUCCESS,
  payload: data
})

const fetchTrackerManualFailure = ( error: string ) => ({
  type: FETCH_TRACKER_MANUAL_FAILURE,
  payload: error
})

export const fetchTrackerManual = ( theUserId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchTrackerManualLoading() )

    try {
      const res = await fetchTrackerManualService( theUserId )
      dispatch( fetchTrackerManualSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchTrackerManualFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Delete manual added recipes
 */
const deleteManualLoading = () => ({
  type: DELETE_MANUAL_LOADING
})

const deleteManualSuccess = ( data: any[] ) => ({
  type: DELETE_MANUAL_SUCCESS,
  payload: data
})

const deleteManualFailure = ( error: string ) => ({
  type: DELETE_MANUAL_FAILURE,
  payload: error
})

export const deleteManual = ( theManualId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( deleteManualLoading() )

    try {
      const res = await deleteManualService( theManualId )
      dispatch( deleteManualSuccess( res ) )
    } catch ( error: any ) {
      dispatch( deleteManualFailure( error.message ) )

      throw error
    }
  }
}