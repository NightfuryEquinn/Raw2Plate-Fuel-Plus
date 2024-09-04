import { awsInstance } from "data/apisInstance"
import { User } from "redux/models/User"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

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

export const updateProfileService = async ( theUser: User ): Promise<ReduxState[]> => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/user/${ theUser.UserId }`, theUser )

    console.log( "DONE - updateProfileService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - updateProfileService: ", error )

    throw error
  }
}