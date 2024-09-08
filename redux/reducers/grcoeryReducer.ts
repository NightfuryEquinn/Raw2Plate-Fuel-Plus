import { ADD_ITEM_CART_FAILURE, ADD_ITEM_CART_LOADING, ADD_ITEM_CART_SUCCESS, DELETE_ITEM_CART_FAILURE, DELETE_ITEM_CART_LOADING, DELETE_ITEM_CART_SUCCESS, FETCH_IN_CART_FAILURE, FETCH_IN_CART_LOADING, FETCH_IN_CART_SUCCESS, FETCH_ONE_STORE_FAILURE, FETCH_ONE_STORE_LOADING, FETCH_ONE_STORE_SUCCESS, FETCH_STORE_FAILURE, FETCH_STORE_ITEM_FAILURE, FETCH_STORE_ITEM_LOADING, FETCH_STORE_ITEM_SUCCESS, FETCH_STORE_LOADING, FETCH_STORE_SUCCESS, UPDATE_ITEM_CART_FAILURE, UPDATE_ITEM_CART_LOADING, UPDATE_ITEM_CART_SUCCESS } from "redux/types/actionTypes";
import { ReduxState } from "redux/types/stateTypes";

const initialState: ReduxState = {
  data: [{
    stores: null,
    oneStore: null,
    storeItems: null,
    cartItems: null
  }],
  loading: false,
  error: null
}

export const grcoeryReducer = (
  state = initialState,
  action: any
): ReduxState => {
  switch ( action.type ) {
    case FETCH_STORE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          stores: action.payload
        }]
      } 

    case FETCH_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_ONE_STORE_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_ONE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          oneStore: action.payload
        }]
      } 

    case FETCH_ONE_STORE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_STORE_ITEM_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_STORE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          storeItems: action.payload
        }]
      } 

    case FETCH_STORE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case FETCH_IN_CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case FETCH_IN_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
          cartItems: action.payload
        }]
      } 

    case FETCH_IN_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case ADD_ITEM_CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case ADD_ITEM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      } 

    case ADD_ITEM_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case UPDATE_ITEM_CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case UPDATE_ITEM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      } 

    case UPDATE_ITEM_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case DELETE_ITEM_CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      }

    case DELETE_ITEM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [{
          ...state.data[ 0 ],
        }]
      } 

    case DELETE_ITEM_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}