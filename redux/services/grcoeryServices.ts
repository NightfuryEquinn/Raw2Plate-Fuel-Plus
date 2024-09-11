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
          quantity: item.quantity,
          itemId: item.itemId,
          orderId: item.orderId
        }
      )
    )
    
    const updatedOrderItemsResponse = await Promise.all( updatedOrderItemsRequest )
    console.log( "DONE - addAllOrderItems: ", updatedOrderItemsResponse.map( res => res.data ) )

    const deleteCartRequest = updatedOrderItems.map( item => 
      awsInstance.delete( `/cart/${ item.cartId }` )
    )

    const deleteCartResponse = await Promise.all( deleteCartRequest )
    console.log( "DONE - deleteAllCartItems: ", deleteCartResponse.map( res => res.data ) )

    return orderRes.data
  } catch ( error ) {
    console.error( "ERROR - addOrderService: ", error )

    throw error
  }
}

/**
 * Cancel order
 */
export const cancelOrderService = async ( theOrder: Order ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/order/${ theOrder.orderId }`, theOrder )

    console.log( "DONE - cancelOrderService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - cancelOrderService: ", error )

    throw error
  }
}

/**
 * Fetch first active order
 */
export const fetchFirstActiveOrderService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/order/user/${ theUserId }` )

    console.log( "DONE - fetchFirstActiveOrderService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - fetchFirstActiveOrderService: ", error )

    throw error
  }
}

/**
 * Fetch the order items
 */
export const fetchOrderItemsService = async ( theOrderId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/order/user/${ theOrderId }/items` )

    console.log( "DONE - fetchOrderItemsService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - fetchOrderItemsService: ", error )

    throw error
  }
}

/**
 * Fetch order history
 */
export const fetchOrderHistoryService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/order/user/${ theUserId }/past` )

    console.log( "DONE - fetchOrderHistoryService: ", res.data )
    return res.data
  } catch ( error ) {
    console.error( "ERROR - fetchOrderHistoryService: ", error )

    throw error
  }
}