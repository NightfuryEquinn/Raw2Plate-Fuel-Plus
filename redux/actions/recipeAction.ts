import { AppDispatch } from "redux/reducers/store";
import { fetchRandomService } from "redux/services/recipeServices";
import { FETCH_RANDOM_FAILURE, FETCH_RANDOM_LOADING, FETCH_RANDOM_SUCCESS } from "redux/types/actionTypes";

/**
 * Fetch 35 recipes
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

export const fetchRandom = () => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchRandomLoading() )
  
    try {
      const res = await fetchRandomService()
      dispatch( fetchRandomSuccess( res ))
    } catch ( error: any ) {
      dispatch( fetchRandomFailure( error.message ) )

      throw error
    }
  }
}