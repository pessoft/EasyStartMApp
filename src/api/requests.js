import {
  checkActualUserDataQuery,
  getLocationQuery,
  getMainDataQuery,
  getProductReviewsQuery,
  setProductReviewsQuery
} from './request-strings'
import { fetchAPI } from './helper-api'

export const checkActualUserDataFetch = async (userData) => await fetchAPI(checkActualUserDataQuery, userData)

export const getLocationFetch = async () => await fetchAPI(getLocationQuery)
export const getMainDataFetch = async (branchId) => fetchAPI(getMainDataQuery, branchId)

export const getProductReviewsFetch = async (productId) => fetchAPI(getProductReviewsQuery, productId)
export const setProductReviewsFetch = async (review) => fetchAPI(setProductReviewsQuery, review)