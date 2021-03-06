import {
  loginQuery,
  getLocationQuery,
  getMainDataQuery,
  getProductReviewsQuery,
  setProductReviewsQuery,
  updateUserQuery,
  registrationClientQuery,
  restorePasswordClientQuery,
  sendNewOrderQuery,
  getHistoryOrdersQuery,
  getProductsHistoryOrderQuery,
  updateProductRatingQuery,
  getCouponQuery,
  getPartnersTransactionQuery,
  getCashbackTransactionQuery,
  registerDeviceQuery,
  updatePerentReferralQuery,
  getStocksQuery,
  checkOnlinePayNewOrderQuery
} from './request-strings'
import { fetchAPI } from './helper-api'

export const updateUserFetch = async (userData) => await fetchAPI(updateUserQuery, userData)

export const updatePerentReferralFetch = async (data) => await fetchAPI(updatePerentReferralQuery, data)

export const loginFetch = async (userData) => fetchAPI(loginQuery, userData)
export const registrationClientFetch = async (userData) => await fetchAPI(registrationClientQuery, userData)
export const restorePasswordClientFetch = async (email) => await fetchAPI(restorePasswordClientQuery, email)

export const getLocationFetch = async () => await fetchAPI(getLocationQuery)
export const getMainDataFetch = async (params) => fetchAPI(getMainDataQuery, params)
export const getStocksFetch = async (params) => fetchAPI(getStocksQuery, params)

export const getProductReviewsFetch = async (productId) => fetchAPI(getProductReviewsQuery, productId)
export const setProductReviewsFetch = async (review) => fetchAPI(setProductReviewsQuery, review)

export const sendNewOrderFetch = async (newOrder) => fetchAPI(sendNewOrderQuery, newOrder)
export const checkOnlinePayNewOrderFetch = async (orderId) => fetchAPI(checkOnlinePayNewOrderQuery, orderId)

export const getHistoryOrdersFetch = async (dataForHistory) => await fetchAPI(getHistoryOrdersQuery, dataForHistory)
export const getProductsHistoryOrderFetch = async (orderId) => await fetchAPI(getProductsHistoryOrderQuery, orderId)

export const updateProductRatingFetch = async (rating) => await fetchAPI(updateProductRatingQuery, rating)

export const getCouponFetch = async (params) => fetchAPI(getCouponQuery, params)

export const getPartnersTransactionFetch = async (clientId) => fetchAPI(getPartnersTransactionQuery, clientId)
export const getCashbackTransactionFetch = async (clientId) => fetchAPI(getCashbackTransactionQuery, clientId)

export const registerDeviceFetch = async (device) => fetchAPI(registerDeviceQuery, device)

