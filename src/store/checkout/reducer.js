import {
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
  isFetching: false,
  isError: false,
  errorMessage: '',
  isFetchingCheckOnlinePay: false,
  isErrorCheckOnlinePay: false,
  errorMessageCheckOnlinePay: '',
  lastOrderNumber: 0,
  completeOrderDeliveryType: 0,
  completeOrderApproximateDeliveryTime: null,
  lastOrder: {}
}

export const checkoutReducer = (state = defaultState, action) => {
  switch (action.type) {
    case DROP_FETCH_FLAG:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isFetchingCheckOnlinePay: false,
        isErrorCheckOnlinePay: false
      }
    case RESET_DATA:
      return { ...defaultState }
    case ADD_NEW_ORDER_DATA:
      return {
        ...state,
        lastOrder: action.payload
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
        lastOrderNumber: action.payload.orderNumber,
        completeOrderDeliveryType: action.payload.deliveryType,
        completeOrderApproximateDeliveryTime: action.payload.approximateDeliveryTime
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
        lastOrderNumber: action.payload.orderNumber,
        completeOrderDeliveryType: action.payload.deliveryType,
        completeOrderApproximateDeliveryTime: action.payload.approximateDeliveryTime
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