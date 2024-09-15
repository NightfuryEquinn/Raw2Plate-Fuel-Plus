import { ManualMeal } from "redux/models/ManualMeal"
import { AppDispatch } from "redux/reducers/store"
import { addManualRecipesTrackerService, fetchRecipesNutrientsService } from "redux/services/trackerServices"
import { ADD_MANUAL_RECIPE_TRACKER_FAILURE, ADD_MANUAL_RECIPE_TRACKER_LOADING, ADD_MANUAL_RECIPE_TRACKER_SUCCESS, FETCH_RECIPE_NUTRIENTS_FAILURE, FETCH_RECIPE_NUTRIENTS_LOADING, FETCH_RECIPE_NUTRIENTS_SUCCESS } from "redux/types/actionTypes"

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