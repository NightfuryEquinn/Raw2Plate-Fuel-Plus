import { awsInstance } from "config/apisInstance"
import { Cart } from "redux/models/Cart"
import { Order } from "redux/models/Order"
import { OrderItem } from "redux/models/OrderItem"
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

/**
 * Add order
 */
export const addOrderService = async ( theOrder: Order, theOrderItems: any[] ) => {
  try {
    const orderRes: ApiRes<any> = await awsInstance.post( "/order", theOrder )

    console.log( "DONE - addOrderService: ", orderRes.data )

    const theOrderId = orderRes.data.orderId
    const updatedOrderItems = theOrderItems.map( item => ({
      ...item,
      orderId: theOrderId
    }))

    const updatedOrderItemsRequest = updatedOrderItems.map( item =>
      awsInstance.post( "/orderItem", 
        {
          orderItemId: 0,
          itemId: item.itemId,
          orderId: item.orderId
        }
      )
    )
    
    try {
      const orderItemRes = await Promise.all( updatedOrderItemsRequest )
      console.log( "DONE - addAllOrderItems: ", orderItemRes.map( res => res.data ) )
    } catch ( error ) {
      console.error( "ERROR - addAllOrderItems: ", error )
      
      throw error
    }

    const deleteCartRequest = updatedOrderItems.map( item => 
      awsInstance.delete( `/cart/${ item.cartId }` )
    )

    try {
      const orderItemRes = await Promise.all( deleteCartRequest )
      console.log( "DONE - deleteAllCartItems: ", orderItemRes.map( res => res.data ) )
    } catch ( error ) {
      console.error( "ERROR - deleteAllCartItems: ", error )

      throw error
    }

    return orderRes.data
  } catch ( error ) {
    console.error( "ERROR - addOrderService: ", error )

    throw error
  }
}