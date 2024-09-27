import { awsInstance, spoonInstance } from "config/apisInstance"
import { ManualMeal } from "redux/models/ManualMeal"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

/**
 * Add manual recipes to tracker
 */
export const addManualRecipesTrackerService = async ( theUserId: number, theDate: string, theManualMeal: ManualMeal ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/manualmeal/user/${ theUserId }/${ theDate }`, theManualMeal )

    // console.log( "DONE - addManualRecipesTrackerService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - addManualRecipesTrackerService: ", error )

    throw error
  }
}

/**
 * Get recipes nutrients info
 */
export const fetchRecipesNutrientsService = async ( theRecipeId: number ) => {
  try {
    const res: ApiRes<any[]> = await spoonInstance.get( `/recipes/${ theRecipeId }/nutritionWidget.json` )

    const appendRecipeIdData = {
      ...res.data,
      recipeId: theRecipeId
    }

    // console.log( "DONE - fetchRecipesNutrientsService: ", appendRecipeIdData )
    return appendRecipeIdData
  } catch ( error ) {
    // console.log( "ERROR - fetchRecipesNutrientsService: ", error )

    throw error
  }
}

/**
 * Fetch tracker recipes
 */
export const fetchTrackerRecipesService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/meal/tracker/${ theUserId }` )

    if ( !res || res.data.length === 0 ) {
      return []
    }

    const recipesWithNutrients = await Promise.all(
      res.data.map( async ( recipe: any ) => {
        const recipeNutrientsData = await spoonInstance.get( `/recipes/${ recipe.recipeId }/nutritionWidget.json` )
        const recipeInfo = await spoonInstance.get( `/recipes/${ recipe.recipeId }/information` )
        
        return {
          ...recipe,
          recipeNutrients: recipeNutrientsData.data.nutrients,
          recipeInfo: recipeInfo.data
        }
      })
    )

    // console.log( "DONE - fetchTrackerRecipesService: Include nutrition: ", recipesWithNutrients )
    return recipesWithNutrients
  } catch ( error ) {
    // console.log( "ERROR - fetchTrackerRecipesService: ", error )

    throw error
  }
}

/**
 * Fetch tracker manual recipes
 */
export const fetchTrackerManualService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/manualmeal/tracker/${ theUserId }` )

    // console.log( "DONE - fetchTrackerManualService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchTrackerManualService: ", error )

    throw error
  }
}

/**
 * Delete manual added recipes
 */
export const deleteManualService = async ( theManualId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.delete( `/manualmeal/${ theManualId }` )

    // console.log( "DONE - deleteManualService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - deleteManualService: ", error )

    throw error
  }
}