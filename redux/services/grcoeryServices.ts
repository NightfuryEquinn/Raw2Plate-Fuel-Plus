import { awsInstance } from "config/apisInstance"
import { ReduxState } from "redux/types/stateTypes"

interface ApiRes<T> {
  data: T,
  status: number,
  statusText: string
}

/**
 * Fetch stores
 */
export const fetchStoreService = async () => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( "/store" )

    console.log( "DONE - fetchStoreService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchStoreService: ", error )

    throw error
  }
}

/**
 * Fetch one store
 */
export const fetchOneStoreService = async ( theStoreId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/store/${ theStoreId }` )

    console.log( "DONE - fetchOneStoreService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchOneStoreService: ", error )

    throw error
  }
}

/**
 * Fetch store items
 */
export const fetchStoreItemService = async ( theStoreId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/item/store/${ theStoreId }` )

    console.log( "DONE - fetchStoreItemService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchStoreItemService: ", error )

    throw error
  }
}

/**
 * Fetch in cart items
 */
export const fetchInCartService = async ( theUserId: number, theStoreId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/cart/user/${ theUserId }/store/${ theStoreId }` )

    console.log( "DONE - fetchInCartService: ", res.data )
    return res.data
  } catch ( error ) {
    console.log( "ERROR - fetchInCartService: ", error )

    throw error
  }
}