import { awsInstance } from "data/apisInstance"
import { User } from "redux/models/User"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

export const getTheUser = async ( theEmail: string, thePassword: string ): Promise<ReduxState[]> => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/user/email/${ theEmail }/password/${ thePassword }` )

    console.log( "getTheUser: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "Get the user: ", error )

    throw error
  }
}

export const postUser = async ( theUser: User ): Promise<ReduxState[]> => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( "/user", theUser )

    console.log( "postUser: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "Post user: ", error )

    throw error
  }
}