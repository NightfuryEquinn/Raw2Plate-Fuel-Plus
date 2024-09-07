import { awsInstance, spoonInstance } from "config/apisInstance"
import { User } from "redux/models/User"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

/**
 * User register
 */
export const userRegisterService = async ( theUser: User ): Promise<ReduxState[]> => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( "/user", theUser )

    console.log( "DONE - userRegisterService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - userRegisterService: ", error )

    throw error
  }
}

/**
 * Set user session
 */
export const getTheUserService = async ( theEmail: string, thePassword: string ): Promise<ReduxState[]> => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/user/email/${ theEmail }/password/${ thePassword }` )

    console.log( "DONE - getTheUserService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - getTheUserService: ", error )

    throw error
  }
}

/**
 * Update profile
 */
export const updateProfileService = async ( theUser: User ): Promise<ReduxState[]> => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/user/${ theUser.userId }`, theUser )

    console.log( "DONE - updateProfileService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - updateProfileService: ", error )

    throw error
  }
}

/**
 * Fetch bookmarks
 */
export const fetchBookmarkService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/bookmark/userId/${ theUserId }` )
    
    console.log( "DONE - fetchBookmarkService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchBookmarkService: ", error )

    throw error
  }
}

/**
 * Fetch bookmark recipes information
 */
export const fetchBookmarkInfoService = async ( theRecipeIds: string ) => {
  try {
    // Include nutrition true
    const res: ApiRes<ReduxState[]> = await spoonInstance.get( `/recipes/informationBulk?ids=${ theRecipeIds }&includeNutrition=true` )
    
    console.log( "DONE - fetchBookmarkInfoService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchBookmarkInfoService: ", error )
    
    throw error
  }
}

/**
 * Delete bookmark recipes
 */
export const deleteBookmarkService = async ( theUserId: number, theRecipeId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.delete( `/bookmark/${ theUserId }/${ theRecipeId }` )

    console.log( "DONE - deleteBookmarkService: ", res.data )
    return res.data
  } catch ( error: any ) {
    console.log( "ERROR - deleteBookmarkService: ", error )

    throw error
  }
}