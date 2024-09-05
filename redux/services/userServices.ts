import { awsInstance } from "config/apisInstance"
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