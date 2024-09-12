import { Cart } from "redux/models/Cart"
import { GroceryItem } from "redux/models/GroceryItem"
import { GroceryList } from "redux/models/GroceryList"
import { Order } from "redux/models/Order"
import { OrderItem } from "redux/models/OrderItem"
import { AppDispatch } from "redux/reducers/store"
import { addGroceryListService, addItemCartService, addOrderService, cancelOrderService, checkAddGroceryListService, deleteGroceryListService, deleteItemCartService, fetchFirstActiveOrderService, fetchGroceryListService, fetchInCartService, fetchOneStoreService, fetchOrderHistoryService, fetchOrderItemsService, fetchStoreItemService, fetchStoreService, updateGroceryListService, updateItemCartService } from "redux/services/grcoeryServices"
import { ADD_GROCERY_LIST_FAILURE, ADD_GROCERY_LIST_LOADING, ADD_GROCERY_LIST_SUCCESS, ADD_ITEM_CART_FAILURE, ADD_ITEM_CART_LOADING, ADD_ITEM_CART_SUCCESS, ADD_ORDER_FAILURE, ADD_ORDER_LOADING, ADD_ORDER_SUCCESS, CANCEL_ORDER_FAILURE, CANCEL_ORDER_LOADING, CANCEL_ORDER_SUCCESS, CHECK_ADD_GROCERY_LIST_FAILURE, CHECK_ADD_GROCERY_LIST_LOADING, CHECK_ADD_GROCERY_LIST_SUCCESS, DELETE_GROCERY_LIST_FAILURE, DELETE_GROCERY_LIST_LOADING, DELETE_GROCERY_LIST_SUCCESS, DELETE_ITEM_CART_FAILURE, DELETE_ITEM_CART_LOADING, DELETE_ITEM_CART_SUCCESS, FETCH_FIRST_ACTIVE_ORDER_FAILURE, FETCH_FIRST_ACTIVE_ORDER_LOADING, FETCH_FIRST_ACTIVE_ORDER_SUCCESS, FETCH_GROCERY_LIST_FAILURE, FETCH_GROCERY_LIST_LOADING, FETCH_GROCERY_LIST_SUCCESS, FETCH_IN_CART_FAILURE, FETCH_IN_CART_LOADING, FETCH_IN_CART_SUCCESS, FETCH_ONE_STORE_FAILURE, FETCH_ONE_STORE_LOADING, FETCH_ONE_STORE_SUCCESS, FETCH_ORDER_HISTORY_FAILURE, FETCH_ORDER_HISTORY_LOADING, FETCH_ORDER_HISTORY_SUCCESS, FETCH_ORDER_ITEMS_FAILURE, FETCH_ORDER_ITEMS_LOADING, FETCH_ORDER_ITEMS_SUCCESS, FETCH_STORE_FAILURE, FETCH_STORE_ITEM_FAILURE, FETCH_STORE_ITEM_LOADING, FETCH_STORE_ITEM_SUCCESS, FETCH_STORE_LOADING, FETCH_STORE_SUCCESS, UPDATE_GROCERY_LIST_FAILURE, UPDATE_GROCERY_LIST_LOADING, UPDATE_GROCERY_LIST_SUCCESS, UPDATE_ITEM_CART_FAILURE, UPDATE_ITEM_CART_LOADING, UPDATE_ITEM_CART_SUCCESS } from "redux/types/actionTypes"

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
 * Fetch the order items
 */
const fetchOrderItemsLoading = () => ({
  type: FETCH_ORDER_ITEMS_LOADING
})

const fetchOrderItemsSuccess = ( data: any[] ) => ({
  type: FETCH_ORDER_ITEMS_SUCCESS,
  payload: data
})

const fetchOrderItemsFailure = ( error: string ) => ({
  type: FETCH_ORDER_ITEMS_FAILURE,
  payload: error
})

export const fetchOrderItems = ( theOrderId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchOrderItemsLoading() )

    try {
      const res = await fetchOrderItemsService( theOrderId )
      dispatch( fetchOrderItemsSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchOrderItemsFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Fetch order history
 */
const fetchOrderHistoryLoading = () => ({
  type: FETCH_ORDER_HISTORY_LOADING
})

const fetchOrderHistorySuccess = ( data: any[] ) => ({
  type: FETCH_ORDER_HISTORY_SUCCESS,
  payload: data
})

const fetchOrderHistoryFailure = ( error: string ) => ({
  type: FETCH_ORDER_HISTORY_FAILURE,
  payload: error
})

export const fetchOrderHistory = ( theUserId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchOrderHistoryLoading() )

    try {
      const res = await fetchOrderHistoryService( theUserId )
      dispatch( fetchOrderHistorySuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchOrderHistoryFailure( error.message ) )

      throw error
    }
  }
}

/** 
 * Fetch grocery list 
 */
const fetchGroceryListLoading = () => ({
  type: FETCH_GROCERY_LIST_LOADING
})

const fetchGroceryListSuccess = ( data: any[] ) => ({
  type: FETCH_GROCERY_LIST_SUCCESS,
  payload: data
})

const fetchGroceryListFailure = ( error: string ) => ({
  type: FETCH_GROCERY_LIST_FAILURE,
  payload: error
})

export const fetchGroceryList = ( theUserId: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( fetchGroceryListLoading() )

    try {
      const res = await fetchGroceryListService( theUserId )
      dispatch( fetchGroceryListSuccess( res ) )
    } catch ( error: any ) {
      dispatch( fetchGroceryListFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Check and add grocery list
 */
const checkAddGroceryListLoading = () => ({
  type: CHECK_ADD_GROCERY_LIST_LOADING
})

const checkAddGroceryListSuccess = ( data: any[] ) => ({
  type: CHECK_ADD_GROCERY_LIST_SUCCESS,
  payload: data
})

const checkAddGroceryListFailure = ( error: string ) => ({
  type: CHECK_ADD_GROCERY_LIST_FAILURE,
  payload: error
})

export const checkAddGroceryList = ( theGroceryList: GroceryList ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( checkAddGroceryListLoading() )

    try {
      const res = await checkAddGroceryListService( theGroceryList )
      dispatch( checkAddGroceryListSuccess( res ) )
    } catch ( error: any ) {
      dispatch( checkAddGroceryListFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Add grocery list
 */
const addGroceryListLoading = () => ({
  type: ADD_GROCERY_LIST_LOADING
})

const addGroceryListSuccess = ( data: any[] ) => ({
  type: ADD_GROCERY_LIST_SUCCESS,
  payload: data
})

const addGroceryListFailure = ( error: string ) => ({
  type: ADD_GROCERY_LIST_FAILURE,
  payload: error
})

export const addGroceryList = ( theGroceryItem: GroceryItem ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( addGroceryListLoading() )

    try {
      const res = await addGroceryListService( theGroceryItem )
      dispatch( addGroceryListSuccess( res ) )
    } catch ( error: any ) {
      dispatch( addGroceryListFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Update grocery list
 */
const updateGroceryListLoading = () => ({
  type: UPDATE_GROCERY_LIST_LOADING
})

const updateGroceryListSuccess = ( data: any[] ) => ({
  type: UPDATE_GROCERY_LIST_SUCCESS,
  payload: data
})

const updateGroceryListFailure = ( error: string ) => ({
  type: UPDATE_GROCERY_LIST_FAILURE,
  payload: error
})

export const updateGroceryList = ( theGroceryItem: GroceryItem ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( updateGroceryListLoading() )

    try {
      const res = await updateGroceryListService( theGroceryItem )
      dispatch( updateGroceryListSuccess( res ) )
    } catch ( error: any ) {
      dispatch( updateGroceryListFailure( error.message ) )

      throw error
    }
  }
}

/**
 * Delete grocery list
 */
const deleteGroceryListLoading = () => ({
  type: DELETE_GROCERY_LIST_LOADING
})

const deleteGroceryListSuccess = ( data: any[] ) => ({
  type: DELETE_GROCERY_LIST_SUCCESS,
  payload: data
})

const deleteGroceryListFailure = ( error: string ) => ({
  type: DELETE_GROCERY_LIST_FAILURE,
  payload: error
})

export const deleteGroceryList = ( theGroceryItem: number ) => {
  return async ( dispatch: AppDispatch ) => {
    dispatch( deleteGroceryListLoading() )

    try {
      const res = await deleteGroceryListService( theGroceryItem )
      dispatch( deleteGroceryListSuccess( res ) )
    } catch ( error: any ) {
      dispatch( deleteGroceryListFailure( error.message ) )

      throw error
    }
  }
}