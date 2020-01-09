import {
  getHistoryOrderFetch,
  getProductsHistoryOrderFetch
} from '../../api/requests'

import { getImageSource } from '../../helpers/utils'

export const FETCH_HISTORY_ORDER_SUCCESS = 'FETCH_HISTORY_ORDER_SUCCESS'
export const FETCH_HISTORY_ORDER_REQUEST = 'FETCH_HISTORY_ORDER_REQUEST'
export const FETCH_HISTORY_ORDER_FAILURE = 'FETCH_HISTORY_ORDER_FAILURE'

export const FETCH_PRODUCTS_HISTORY_ORDER_SUCCESS = 'FETCH_PRODUCTS_HISTORY_ORDER_SUCCESS'
export const FETCH_PRODUCTS_HISTORY_ORDER_REQUEST = 'FETCH_PRODUCTS_HISTORY_ORDER_REQUEST'
export const FETCH_PRODUCTS_HISTORY_ORDER_FAILURE = 'FETCH_PRODUCTS_HISTORY_ORDER_FAILURE'

export const SET_SELECT_ORDER_ID = 'SET_SELECT_ORDER_ID'

export const setSelectOrder = order => {
  return {
    type: SET_SELECT_ORDER_ID,
    payload: order
  }
}

export const getHistoryOrder = dataForHistory => async (dispatch) => {
  dispatch(requestPosts())

  try {
    const history = await getHistoryOrderFetch(dataForHistory)
    dispatch(successPosts(history))
  } catch {
    dispatch(failurePosts())
  }
}

export const getProductsHistoryOrder = orderId => async (dispatch) => {
  dispatch(requestProductsHistoryPosts())

  try {
    const products = await getProductsHistoryOrderFetch(orderId)
    dispatch(successProductsHistoryPosts(products))
  } catch {
    dispatch(failureProductsHistoryPosts())
  }
}

const requestPosts = () => {
  return {
    type: FETCH_HISTORY_ORDER_REQUEST
  }
}

const successPosts = history => {
  return {
    type: FETCH_HISTORY_ORDER_SUCCESS,
    payload: history
  }
}

const failurePosts = () => {
  return {
    type: FETCH_HISTORY_ORDER_FAILURE,
    payload: true
  }
}

const requestProductsHistoryPosts = () => {
  return {
    type: FETCH_PRODUCTS_HISTORY_ORDER_REQUEST
  }
}

const successProductsHistoryPosts = products => {
  processingProductsData(products)

  return {
    type: FETCH_PRODUCTS_HISTORY_ORDER_SUCCESS,
    payload: products
  }
}

const failureProductsHistoryPosts = () => {
  return {
    type: FETCH_PRODUCTS_HISTORY_ORDER_FAILURE,
    payload: true
  }
}

const processingProductsData = data => {
  if (data) {
    const imgProcessing = items => {
      for (item of items) {
        item.Image = getImageSource(item.Image)
      }
    }

    if (data.productsHistory) {
      imgProcessing(data.productsHistory)
    }

    if (data.constructorProductsHistory) {
      imgProcessing(data.constructorProductsHistory)
    }
  }
}