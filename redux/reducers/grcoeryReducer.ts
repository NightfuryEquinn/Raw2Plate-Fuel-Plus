import { FETCH_IN_CART_FAILURE, FETCH_IN_CART_LOADING, FETCH_IN_CART_SUCCESS, FETCH_ONE_STORE_FAILURE, FETCH_ONE_STORE_LOADING, FETCH_ONE_STORE_SUCCESS, FETCH_STORE_FAILURE, FETCH_STORE_ITEM_FAILURE, FETCH_STORE_ITEM_LOADING, FETCH_STORE_ITEM_SUCCESS, FETCH_STORE_LOADING, FETCH_STORE_SUCCESS } from "redux/types/actionTypes";
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

    default:
      return state
  }
}