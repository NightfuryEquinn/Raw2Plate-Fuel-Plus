import { awsInstance, spoonInstance } from "config/apisInstance"
import { Bookmark } from "redux/models/Bookmark"
import { Meal } from "redux/models/Meal"
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
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/random?limitLicense=true&number=${ theNumber }&includeNutrition=true` )

    // console.log( "DONE - fetchRandomService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchRandomService: ", error )

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

    // console.log( "DONE - fetchRecipeInfoService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchRecipeInfoService: ", error )

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

    // console.log( "DONE - fetchRecipeIngreService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchRecipeIngreService: ", error )

    throw error
  }
}

/**
 * Discover search with filters
 */
export const discoverSearchService = async ( query: string, theNumber: number, theCuisine: string, include: string, exclude: string, minCal: number, maxCal: number ) => {
  try {
    // Limit license true, Ignore pantry true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/complexSearch?ignorePantry=true&limitLicense=true&query=${ query }&number=${ theNumber }&cuisine=${ theCuisine }&includeIngredients=${ include }&excludeIngredients=${ exclude }&minCalories=${ minCal }&maxCalories=${ maxCal }` )

    // console.log( "DONE - discoverSearchService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - discoverSearchService: ", error )

    throw error
  }
}

/**
 * Bookmark recipes
 */
export const bookmarkRecipeService = async ( theBookmark: Bookmark ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/bookmark`, theBookmark )

    // console.log( "DONE - bookmarkRecipeService: ", res.data )
    return res.data
  } catch ( error: any ) {
    // console.log( "ERROR - bookmarkRecipeService: ", error )

    throw error
  }
}

/**
 * Fetch planner recipes
 */
export const fetchPlannerRecipesService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/meal/planner/${ theUserId }` )

    // console.log( "DONE - fetchPlannerRecipesService: ", res.data )
    return res.data
  } catch ( error: any ) {
    // console.log( "ERROR - fetchPlannerRecipesService: ", error )

    throw error
  }
}

/**
 * Add recipes to planner
 */
export const addRecipesPlannerService = async ( theUserId: number, theDate: string, theMeal: Meal ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/meal/user/${ theUserId }/${ theDate }`, theMeal )

    // console.log( "DONE - addRecipesPlannerService: ", res.data )
    return res.data
  } catch ( error: any ) {
    // console.log( "ERROR - addRecipesPlannerService: ", error )

    throw error
  }
}

/**
 * Fetch planner and tracker recipes info
 */
export const fetchRecipePlannerTrackerInfoService = async ( theRecipeIds: string ) => {
  try {
    // Include nutrition true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/informationBulk?ids=${ theRecipeIds }&includeNutrition=true` )
    
    // console.log( "DONE - fetchRecipePlannerTrackerInfoService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchRecipePlannerTrackerInfoService: ", error )
    
    throw error
  }
}

/**
 * Delete planner recipes
 */
export const deletePlannerRecipesService = async ( theMealId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.delete( `/meal/${ theMealId }` )
    
    // console.log( "DONE - deletePlannerRecipesService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - deletePlannerRecipesService: ", error )
    
    throw error
  }
}

/**
 * Update comment
 */
export const updateCommentService = async ( theMealId: number, theMeal: Meal ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/meal/${ theMealId }`, theMeal )
    
    // console.log( "DONE - updateCommentService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - updateCommentService: ", error )
    
    throw error
  }
}