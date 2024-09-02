import { awsInstance } from "data/apisInstance"
import { User } from "redux/models/User"
import { UserRegisterState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

export const postUser = async( theUser: User ): Promise<UserRegisterState[]> => {
  try {
    const res: ApiRes<UserRegisterState[]> = await awsInstance.post( "/user", theUser )

    return res.data
  } catch ( error ) {
    console.log( "Post user: ", error )

    throw error
  }
}