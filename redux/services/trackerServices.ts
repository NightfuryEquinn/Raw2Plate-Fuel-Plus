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

    console.log( "DONE - addManualRecipesTrackerService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - addManualRecipesTrackerService: ", error )

    throw error
  }
}

/**
 * Get recipes nutrients info
 */
export const fetchRecipesNutrientsService = async ( theRecipeId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/${ theRecipeId }/nutritionWidget.json` )

    const appendRecipeIdData = {
      ...res.data,
      recipeId: theRecipeId
    }

    console.log( "DONE - fetchRecipesNutrientsService: ", appendRecipeIdData )
    return appendRecipeIdData
  } catch ( error ) {
    console.error( "ERROR - fetchRecipesNutrientsService: ", error )

    throw error
  }
}