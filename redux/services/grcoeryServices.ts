import { awsInstance } from "config/apisInstance"
import { Cart } from "redux/models/Cart"
import { GroceryItem } from "redux/models/GroceryItem"
import { GroceryList } from "redux/models/GroceryList"
import { Order } from "redux/models/Order"
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

    // console.log( "DONE - fetchStoreService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchStoreService: ", error )

    throw error
  }
}

/**
 * Fetch one store
 */
export const fetchOneStoreService = async ( theStoreId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/store/${ theStoreId }` )

    // console.log( "DONE - fetchOneStoreService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchOneStoreService: ", error )

    throw error
  }
}

/**
 * Fetch store items
 */
export const fetchStoreItemService = async ( theStoreId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/item/store/${ theStoreId }` )

    // console.log( "DONE - fetchStoreItemService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchStoreItemService: ", error )

    throw error
  }
}

/**
 * Fetch in cart items
 */
export const fetchInCartService = async ( theUserId: number, theStoreId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/cart/user/${ theUserId }/store/${ theStoreId }` )

    // console.log( "DONE - fetchInCartService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchInCartService: ", error )

    throw error
  }
}

/**
 * Add item to cart
 */
export const addItemCartService = async ( theCart: Cart ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/cart`, theCart )

    // console.log( "DONE - addItemCartService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - addItemCartService: ", error )

    throw error
  }
}

/**
 * Update item to cart
 */
export const updateItemCartService = async ( theCart: Cart ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/cart/${ theCart.cartId }`, theCart )

    // console.log( "DONE - updateItemCartService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - updateItemCartService: ", error )

    throw error
  }
}

/**
 * Delete item to cart
 */
export const deleteItemCartService = async ( theCartId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.delete( `/cart/${ theCartId }` )

    // console.log( "DONE - deleteItemCartService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - deleteItemCartService: ", error )

    throw error
  }
}

/**
 * Add order
 */
export const addOrderService = async ( theOrder: Order, theOrderItems: any[] ) => {
  try {
    const orderRes: ApiRes<any> = await awsInstance.post( "/order", theOrder )

    // console.log( "DONE - addOrderService: ", orderRes.data )

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
    // console.log( "DONE - addAllOrderItems: ", updatedOrderItemsResponse.map( res => res.data ) )

    const deleteCartRequest = updatedOrderItems.map( item => 
      awsInstance.delete( `/cart/${ item.cartId }` )
    )

    const deleteCartResponse = await Promise.all( deleteCartRequest )
    // console.log( "DONE - deleteAllCartItems: ", deleteCartResponse.map( res => res.data ) )

    return orderRes.data
  } catch ( error ) {
    // console.log( "ERROR - addOrderService: ", error )

    throw error
  }
}

/**
 * Cancel order
 */
export const cancelOrderService = async ( theOrder: Order ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/order/${ theOrder.orderId }`, theOrder )

    // console.log( "DONE - cancelOrderService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - cancelOrderService: ", error )

    throw error
  }
}

/**
 * Fetch first active order
 */
export const fetchFirstActiveOrderService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/order/user/${ theUserId }` )

    // console.log( "DONE - fetchFirstActiveOrderService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchFirstActiveOrderService: ", error )

    throw error
  }
}

/**
 * Fetch the order items
 */
export const fetchOrderItemsService = async ( theOrderId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/order/user/${ theOrderId }/items` )

    // console.log( "DONE - fetchOrderItemsService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchOrderItemsService: ", error )

    throw error
  }
}

/**
 * Fetch order history
 */
export const fetchOrderHistoryService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/order/user/${ theUserId }/past` )

    // console.log( "DONE - fetchOrderHistoryService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchOrderHistoryService: ", error )

    throw error
  }
}

/** 
 * Fetch grocery list 
 */
export const fetchGroceryListService = async ( theUserId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.get( `/grocerylist/user/${ theUserId }` )

    // console.log( "DONE - fetchGroceryListService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - fetchGroceryListService: ", error )

    throw error
  }
}

/**
 * Check and add grocery list
 */
export const checkAddGroceryListService = async ( theGroceryList: GroceryList ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/grocerylist`, theGroceryList )

    // console.log( "DONE - checkAddGroceryListService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - checkAddGroceryListService: ", error )

    throw error
  }
}

/**
 * Add grocery list
 */
export const addGroceryListService = async ( theGroceryItem: GroceryItem ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.post( `/groceryitem`, theGroceryItem )

    // console.log( "DONE - addGroceryListService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - addGroceryListService: ", error )

    throw error
  }
}

/**
 * Update grocery list
 */
export const updateGroceryListService = async ( theGroceryItem: GroceryItem ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.put( `/groceryitem/${ theGroceryItem.groceryItemId }`, theGroceryItem )

    // console.log( "DONE - updateGroceryListService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - updateGroceryListService: ", error )

    throw error
  }
}

/**
 * Delete grocery list
 */
export const deleteGroceryListService = async ( theGroceryItemId: number ) => {
  try {
    const res: ApiRes<ReduxState[]> = await awsInstance.delete( `/groceryitem/${ theGroceryItemId }` )

    // console.log( "DONE - deleteGroceryListService: ", res.data )
    return res.data
  } catch ( error ) {
    // console.log( "ERROR - deleteGroceryListService: ", error )

    throw error
  }
}