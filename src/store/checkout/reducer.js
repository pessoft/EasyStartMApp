import {
  TOGGLE_PRODUCT_IN_BASKET_SHOP,
  TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP,
  CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP,
  FETCH_CHECKOUT_COMPLETE_SUCCESS,
  FETCH_CHECKOUT_COMPLETE_REQUEST,
  FETCH_CHECKOUT_COMPLETE_FAILURE,
  ADD_NEW_ORDER_DATA,
  RESET_DATA,
  DROP_FETCH_FLAG,

  FETCH_CHECKOUT_ONLINE_PAY_SUCCESS,
  FETCH_CHECKOUT_ONLINE_PAY_REQUEST,
  FETCH_CHECKOUT_ONLINE_PAY_FAILURE
} from './actions'

const defaultState = {
  basketProducts: {},
  basketConstructorProducts: {},
  totalCountProducts: 0,
  isFetching: false,
  isError: false,
  errorMessage: '',
  isFetchingCheckOnlinePay: false,
  isErrorCheckOnlinePay: false,
  errorMessageCheckOnlinePay: '',
  lastOrderNumber: 0,
  lastOrder: {}
}

export const checkoutReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DROP_FETCH_FLAG: 
    return {
      ...state,
      isFetching: false,
      isError: false,
    }
    case RESET_DATA:
      return { ...defaultState }
    case ADD_NEW_ORDER_DATA:
      return {
        ...state,
        lastOrder: action.payload
      }
    case TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketConstructorProducts: action.payload
      }
    case TOGGLE_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketProducts: action.payload
      }
    case CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        totalCountProducts: action.payload
      }
    case FETCH_CHECKOUT_COMPLETE_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false,
        errorMessage: '',
      }
    case FETCH_CHECKOUT_COMPLETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastOrderNumber: action.payload
      }
    case FETCH_CHECKOUT_COMPLETE_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage: action.payload,
      }
      case FETCH_CHECKOUT_ONLINE_PAY_REQUEST:
        return {
          ...state,
          isFetchingCheckOnlinePay: true,
          isErrorCheckOnlinePay: false,
          errorMessageCheckOnlinePay: '',
        }
      case FETCH_CHECKOUT_ONLINE_PAY_SUCCESS:
        return {
          ...state,
          isFetchingCheckOnlinePay: false,
          lastOrderNumber: action.payload
        }
      case FETCH_CHECKOUT_ONLINE_PAY_FAILURE:
        return {
          ...state,
          isFetchingCheckOnlinePay: false,
          isErrorCheckOnlinePay: true,
          errorMessageCheckOnlinePay: action.payload,
        }
  }

  return state
}