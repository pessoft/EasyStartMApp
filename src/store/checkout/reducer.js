import {
  TOGGLE_PRODUCT_IN_BASKET_SHOP,
  CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP,
  FETCH_CHECKOUT_COMPLITE_SUCCESS,
  FETCH_CHECKOUT_COMPLITE_REQUEST,
  FETCH_CHECKOUT_COMPLITE_FAILURE,
  ADD_NEW_ORDER_DATA
} from './actions'

const defaultState = {
  basketProducts: {},
  totalCountProducts: 0,
  isFetching: false,
  isError: false,
  lastOrderNuber: 0,
  lastOrder: {}
}

export const checkoutReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER_DATA:
      return {
        ...state,
        lastOrder: action.payload
      }
    case TOGGLE_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketProducts: { ...state.basketProducts, ...action.payload }
      }
    case CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        totalCountProducts: action.payload
      }
    case FETCH_CHECKOUT_COMPLITE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false
      }
    case FETCH_CHECKOUT_COMPLITE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastOrderNuber: action.payload
      }
    case FETCH_CHECKOUT_COMPLITE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true
      }
  }

  return state
}