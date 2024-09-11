import { Cart } from "redux/models/Cart"
import { Order } from "redux/models/Order"
import { OrderItem } from "redux/models/OrderItem"
import { AppDispatch } from "redux/reducers/store"
import { addItemCartService, addOrderService, cancelOrderService, deleteItemCartService, fetchActiveOrderItemsService, fetchFirstActiveOrderService, fetchInCartService, fetchOneStoreService, fetchStoreItemService, fetchStoreService, updateItemCartService } from "redux/services/grcoeryServices"
import { ADD_ITEM_CART_FAILURE, ADD_ITEM_CART_LOADING, ADD_ITEM_CART_SUCCESS, ADD_ORDER_FAILURE, ADD_ORDER_LOADING, ADD_ORDER_SUCCESS, CANCEL_ORDER_FAILURE, CANCEL_ORDER_LOADING, CANCEL_ORDER_SUCCESS, DELETE_ITEM_CART_FAILURE, DELETE_ITEM_CART_LOADING, DELETE_ITEM_CART_SUCCESS, FETCH_ACTIVE_ORDER_ITEMS_FAILURE, FETCH_ACTIVE_ORDER_ITEMS_LOADING, FETCH_ACTIVE_ORDER_ITEMS_SUCCESS, FETCH_FIRST_ACTIVE_ORDER_FAILURE, FETCH_FIRST_ACTIVE_ORDER_LOADING, FETCH_FIRST_ACTIVE_ORDER_SUCCESS, FETCH_IN_CART_FAILURE, FETCH_IN_CART_LOADING, FETCH_IN_CART_SUCCESS, FETCH_ONE_STORE_FAILURE, FETCH_ONE_STORE_LOADING, FETCH_ONE_STORE_SUCCESS, FETCH_STORE_FAILURE, FETCH_STORE_ITEM_FAILURE, FETCH_STORE_ITEM_LOADING, FETCH_STORE_ITEM_SUCCESS, FETCH_STORE_LOADING, FETCH_STORE_SUCCESS, UPDATE_ITEM_CART_FAILURE, UPDATE_ITEM_CART_LOADING, UPDATE_ITEM_CART_SUCCESS } from "redux/types/actionTypes"

/**
 * Fetch stores
 */
const fetchStoreLoading = () => ({
  type: FETCH_STORE_LOADING
})

const fetchStoreSuccess = ( data: any[] ) => ({
  type: FETCH_STORE_SUCCESS,
  payload: data
})

const fetchStoreFailure = ( error: string ) => ({
  type: FETCH_STORE_FAILURE,
  payload: error
})

export const fetchStore = () => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchStoreLoading() )

    try {
      const res = await fetchStoreService()
      dispatch( fetchStoreSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchStoreFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch one store
 */
const fetchOneStoreLoading = () => ({
  type: FETCH_ONE_STORE_LOADING
})

const fetchOneStoreSuccess = ( data: any[] ) => ({
  type: FETCH_ONE_STORE_SUCCESS,
  payload: data
})

const fetchOneStoreFailure = ( error: string ) => ({
  type: FETCH_ONE_STORE_FAILURE,
  payload: error
})

export const fetchOneStore = ( theStoreId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchOneStoreLoading() )

    try {
      const res = await fetchOneStoreService( theStoreId )
      dispatch( fetchOneStoreSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchOneStoreFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch store items
 */
const fetchStoreItemLoading = () => ({
  type: FETCH_STORE_ITEM_LOADING
})

const fetchStoreItemSuccess = ( data: any[] ) => ({
  type: FETCH_STORE_ITEM_SUCCESS,
  payload: data
})

const fetchStoreItemFailure = ( error: string ) => ({
  type: FETCH_STORE_ITEM_FAILURE,
  payload: error
})

export const fetchStoreItem = ( theStoreId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchStoreItemLoading() )

    try {
      const res = await fetchStoreItemService( theStoreId )
      dispatch( fetchStoreItemSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchStoreItemFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch in cart items
 */
const fetchInCartLoading = () => ({
  type: FETCH_IN_CART_LOADING
})

const fetchInCartSuccess = ( data: any[] ) => ({
  type: FETCH_IN_CART_SUCCESS,
  payload: data
})

const fetchInCartFailure = ( error: string ) => ({
  type: FETCH_IN_CART_FAILURE,
  payload: error
})

export const fetchInCart = ( theUserId: number, theStoreId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchInCartLoading() )

    try {
      const res = await fetchInCartService( theUserId, theStoreId )
      dispatch( fetchInCartSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchInCartFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Add item to cart
 */
const addItemCartLoading = () => ({
  type: ADD_ITEM_CART_LOADING
})

const addItemCartSuccess = ( data: any[] ) => ({
  type: ADD_ITEM_CART_SUCCESS,
  payload: data
})

const addItemCartFailure = ( error: string ) => ({
  type: ADD_ITEM_CART_FAILURE,
  payload: error
})

export const addItemCart = ( theCart: Cart ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( addItemCartLoading() )

    try {
      const res = await addItemCartService( theCart )
      dispatch( addItemCartSuccess( res ) )
    } catch ( error: any ) {
      dispatch( addItemCartFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Update item to cart
 */
const updateItemCartLoading = () => ({
  type: UPDATE_ITEM_CART_LOADING
})

const updateItemCartSuccess = ( data: any[] ) => ({
  type: UPDATE_ITEM_CART_SUCCESS,
  payload: data
})

const updateItemCartFailure = ( error: string ) => ({
  type: UPDATE_ITEM_CART_FAILURE,
  payload: error
})

export const updateItemCart = ( theCart: Cart ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( updateItemCartLoading() )

    try {
      const res = await updateItemCartService( theCart )
      dispatch( updateItemCartSuccess( res ) )
    } catch ( error: any ) {
      dispatch( updateItemCartFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Delete item to cart
 */
const deleteItemCartLoading = () => ({
  type: DELETE_ITEM_CART_LOADING
})

const deleteItemCartSuccess = ( data: any[] ) => ({
  type: DELETE_ITEM_CART_SUCCESS,
  payload: data
})

const deleteItemCartFailure = ( error: string ) => ({
  type: DELETE_ITEM_CART_FAILURE,
  payload: error
})

export const deleteItemCart = ( theCartId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( deleteItemCartLoading() )

    try {
      const res = await deleteItemCartService( theCartId )
      dispatch( deleteItemCartSuccess( res ) )
    } catch ( error: any ) {
      dispatch( deleteItemCartFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Add order
 */
const addOrderLoading = () => ({
  type: ADD_ORDER_LOADING
})

const addOrderSuccess = ( data: any[] ) => ({
  type: ADD_ORDER_SUCCESS,
  payload: data
})

const addOrderFailure = ( error: string ) => ({
  type: ADD_ORDER_FAILURE,
  payload: error
})

export const addOrder = ( theOrder: Order, theOrderItems: OrderItem[] ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( addOrderLoading() )

    try {
      const res = await addOrderService( theOrder, theOrderItems )
      dispatch( addOrderSuccess( res ) )
    } catch ( error: any ) {
      dispatch( addOrderFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Cancel order
 */
const cancelOrderLoading = () => ({
  type: CANCEL_ORDER_LOADING
})

const cancelOrderSuccess = ( data: any[] ) => ({
  type: CANCEL_ORDER_SUCCESS,
  payload: data
})

const cancelOrderFailure = ( error: string ) => ({
  type: CANCEL_ORDER_FAILURE,
  payload: error
})

export const cancelOrder = ( theOrder: Order ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( cancelOrderLoading() )

    try {
      const res = await cancelOrderService( theOrder )
      dispatch( cancelOrderSuccess( res ) )
    } catch ( error: any ) {
      dispatch( cancelOrderFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch first active order
 */
const fetchFirstActiveOrderLoading = () => ({
  type: FETCH_FIRST_ACTIVE_ORDER_LOADING
})

const fetchFirstActiveOrderSuccess = ( data: any[] ) => ({
  type: FETCH_FIRST_ACTIVE_ORDER_SUCCESS,
  payload: data
})

const fetchFirstActiveOrderFailure = ( error: string ) => ({
  type: FETCH_FIRST_ACTIVE_ORDER_FAILURE,
  payload: error
})

export const fetchFirstActiveOrder = ( theUserId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchFirstActiveOrderLoading() )

    try {
      const res = await fetchFirstActiveOrderService( theUserId )
      dispatch( fetchFirstActiveOrderSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchFirstActiveOrderFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch the active order items
 */
const fetchActiveOrderItemsLoading = () => ({
  type: FETCH_ACTIVE_ORDER_ITEMS_LOADING
})

const fetchActiveOrderItemsSuccess = ( data: any[] ) => ({
  type: FETCH_ACTIVE_ORDER_ITEMS_SUCCESS,
  payload: data
})

const fetchActiveOrderItemsFailure = ( error: string ) => ({
  type: FETCH_ACTIVE_ORDER_ITEMS_FAILURE,
  payload: error
})

export const fetchActiveOrderItems = ( theOrderId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchActiveOrderItemsLoading() )

    try {
      const res = await fetchActiveOrderItemsService( theOrderId )
      dispatch( fetchActiveOrderItemsSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchActiveOrderItemsFailure( error.message ) )

      throw error
    }
  }
}