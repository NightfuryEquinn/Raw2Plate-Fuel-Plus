import { spoonInstance } from "config/apisInstance"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

/**
 * Fetch 35 recipes
 */
export const fetchRandomService = async () => {
  try {
    // Limit license true, include nutrition true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( "/recipes/random?includeNutrition=true&limitLicense=true&number=35" )

    console.log( "DONE - fetchRandomService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchRandomService: ", error )

    throw error
  }
}