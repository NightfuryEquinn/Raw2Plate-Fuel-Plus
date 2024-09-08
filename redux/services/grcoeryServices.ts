import { awsInstance } from "config/apisInstance"
import { Cart } from "redux/models/Cart"
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
    console.error( "ERROR - fetchStoreService: ", error )

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
    console.error( "ERROR - fetchOneStoreService: ", error )

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
    console.error( "ERROR - fetchStoreItemService: ", error )

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
    console.error( "ERROR - fetchInCartService: ", error )

    throw error
  }
}

/**
 * Add item to cart
 */
export const addItemCartService = async ( theCart: Cart ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/cart`, theCart )

    console.log( "DONE - addItemCartService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - addItemCartService: ", error )

    throw error
  }
}

/**
 * Update item to cart
 */
export const updateItemCartService = async ( theCart: Cart ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/cart/${ theCart.cartId }`, theCart )

    console.log( "DONE - updateItemCartService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - updateItemCartService: ", error )

    throw error
  }
}

/**
 * Delete item to cart
 */
export const deleteItemCartService = async ( theCartId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.delete( `/cart/${ theCartId }` )

    console.log( "DONE - deleteItemCartService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - deleteItemCartService: ", error )

    throw error
  }
}