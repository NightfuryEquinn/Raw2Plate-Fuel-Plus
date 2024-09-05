import { spoonInstance } from "config/apisInstance"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

/**
 * Fetch random recipes
 */
export const fetchRandomService = async ( theNumber: number ) => {
  try {
    // Limit license true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/random?limitLicense=true&number=${ theNumber }` )

    console.log( "DONE - fetchRandomService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchRandomService: ", error )

    throw error
  }
}

/**
 * Fetch recipe information
 */
export const fetchRecipeInfoService = async ( theRecipeId: number ) => {
  try {
    // Include nutrition true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/${ theRecipeId }/information?includeNutrition=true` )

    console.log( "DONE - fetchRecipeInfoService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchRecipeInfoService: ", error )

    throw error
  }
}

/**
 * Fetch recipe ingredients and steps
 */
export const fetchRecipeIngreStepsService = async ( theRecipeId: number ) => {
  try {
    // Step breakdown true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/${ theRecipeId }/analyzedInstructions?stepBreakdown=true` )

    console.log( "DONE - fetchRecipeIngreService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchRecipeIngreService: ", error )

    throw error
  }
}