import { sendNewOrderFetch, checkOnlinePayNewOrderFetch } from '../../api/requests'

export const TOGGLE_PRODUCT_IN_BASKET_SHOP = 'TOGGLE_PRODUCT_IN_BASKET_SHOP'
export const TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP = 'TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP'
export const CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP = 'CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP'
export const FETCH_CHECKOUT_COMPLETE_SUCCESS = 'FETCH_CHECKOUT_COMPLETE_SUCCESS'
export const FETCH_CHECKOUT_COMPLETE_REQUEST = 'FETCH_CHECKOUT_COMPLETE_REQUEST'
export const FETCH_CHECKOUT_COMPLETE_FAILURE = 'FETCH_CHECKOUT_COMPLETE_FAILURE'
export const ADD_NEW_ORDER_DATA = 'ADD_NEW_ORDER_DATA'
export const RESET_DATA = 'RESET_DATA'
export const DROP_FETCH_FLAG = 'DROP_FETCH_FLAG'

export const FETCH_CHECKOUT_ONLINE_PAY_SUCCESS = 'FETCH_CHECKOUT_ONLINE_PAY_SUCCESS'
export const FETCH_CHECKOUT_ONLINE_PAY_REQUEST = 'FETCH_CHECKOUT_ONLINE_PAY_REQUEST'
export const FETCH_CHECKOUT_ONLINE_PAY_FAILURE = 'FETCH_CHECKOUT_ONLINE_PAY_FAILURE'

export const resetCheckoutData = () => {
  return {
    type: RESET_DATA,
  }
}

export const dropFetchFlag = () => {
  return {
    type: DROP_FETCH_FLAG,
  }
}

export const addNewOrderData = newOrder => {
  return {
    type: ADD_NEW_ORDER_DATA,
    payload: newOrder
  }
}

export const toggleConstructorProductInBasket = basketProduct => {
  return {
    type: TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP,
    payload: basketProduct
  }
}

export const toggleProductInBasket = basketProduct => {
  return {
    type: TOGGLE_PRODUCT_IN_BASKET_SHOP,
    payload: basketProduct
  }
}

export const changeTotalCountProductInBasket = count => {
  return {
    type: CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP,
    payload: count
  }
}

export const sendNewOrder = newOrder => async (dispatch) => {
  dispatch(requestPosts())

  try {
    const requestData = await sendNewOrderFetch(newOrder)
    dispatch(successPosts(requestData))
  } catch(err){
    dispatch(failurePosts(err.message))
  }
}

export const checkOnlinePayNewOrder = orderId => async (dispatch) => {
  dispatch(requestCheckOnlinePayPosts())

  try {
    const requestData = await checkOnlinePayNewOrderFetch(orderId)
    dispatch(successCheckOnlinePayPosts(requestData))
  } catch(err){
    dispatch(failureCheckOnlinePayPosts(err.message))
  }
}

const requestPosts = () => {
  return {
    type: FETCH_CHECKOUT_COMPLETE_REQUEST
  }
}

const successPosts = orderNumber => {
  return {
    type: FETCH_CHECKOUT_COMPLETE_SUCCESS,
    payload: orderNumber
  }
}

const failurePosts = errMessage => {
  return {
    type: FETCH_CHECKOUT_COMPLETE_FAILURE,
    payload: errMessage
  }
}

const requestCheckOnlinePayPosts = () => {
  return {
    type: FETCH_CHECKOUT_ONLINE_PAY_REQUEST
  }
}

const successCheckOnlinePayPosts = orderNumber => {
  return {
    type: FETCH_CHECKOUT_ONLINE_PAY_SUCCESS,
    payload: orderNumber
  }
}

const failureCheckOnlinePayPosts = errMessage => {
  return {
    type: FETCH_CHECKOUT_ONLINE_PAY_FAILURE,
    payload: errMessage
  }
}

