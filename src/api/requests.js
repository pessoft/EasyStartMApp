import {
  checkActualUserDataQuery,
  getLocationQuery,
  getMainDataQuery,
  getProductReviewsQuery,
  setProductReviewsQuery,
  addOrUpdateUserQuery,
  sendNewOrderQuery,
  getHistoryOrderQuery,
  getProductsHistoryOrderQuery,
  updateProductRatingQuery,
  getCouponQuery,
  getPartnersTransactionQuery,
  getCashbackTransactionQuery
} from './request-strings'
import { fetchAPI } from './helper-api'

export const addOrUpdateUserFetch = async (userData) => await fetchAPI(addOrUpdateUserQuery, userData)

export const checkActualUserDataFetch = async (userData) => await fetchAPI(checkActualUserDataQuery, userData)

export const getLocationFetch = async () => await fetchAPI(getLocationQuery)
export const getMainDataFetch = async (params) => fetchAPI(getMainDataQuery, params)

export const getProductReviewsFetch = async (productId) => fetchAPI(getProductReviewsQuery, productId)
export const setProductReviewsFetch = async (review) => fetchAPI(setProductReviewsQuery, review)

export const sendNewOrderFetch = async (newOrder) => fetchAPI(sendNewOrderQuery, newOrder)

export const getHistoryOrderFetch = async (dataForHistory) => await fetchAPI(getHistoryOrderQuery, dataForHistory)
export const getProductsHistoryOrderFetch = async (orderId) => await fetchAPI(getProductsHistoryOrderQuery, orderId)

export const updateProductRatingFetch = async (rating) => await fetchAPI(updateProductRatingQuery, rating)

export const getCouponFetch = async (params) => fetchAPI(getCouponQuery, params)

export const getPartnersTransactionFetch = async (clientId) => fetchAPI(getPartnersTransactionQuery, clientId)
export const getCashbackTransactionFetch = async (clientId) => fetchAPI(getCashbackTransactionQuery, clientId)

