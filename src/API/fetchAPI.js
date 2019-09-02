import {
  checkActualUserDataQuery,
  getLocationQuery,
  getMainDataQuery,
  getProductReviewsQuery
} from './queryAPI'
import { getFetchOption } from './helperAPI'

export const checkActualUserDataFetch = async (userData) => {
  const options = getFetchOption(userData)
  const result = await getData(checkActualUserDataQuery, options)

  if (result && result.Success && result.Data)
    return true

  return false
}

export const getLocationFetch = async () => {
  const result = await getData(getLocationQuery)

  return getDataFromJsonResult(result)
}

export const getMainDataFetch = async (branchId) => {
  const options = getFetchOption(branchId)
  const result = await getData(getMainDataQuery, options)

  return getDataFromJsonResult(result)
}

export const getProductReviewsFetch = async (productId) => {
  const options = getFetchOption(productId)
  const result = await getData(getProductReviewsQuery, options)

  return getDataFromJsonResult(result)
}

const getDataFromJsonResult = result => {
  if (result.Success)
    return {
      ...result.Data,
      dataLoaded: true,
    }

  return {}
}

const getData = async (query, options) => {
  const response = await fetch(query, options)

  if (response.ok) {
    return await response.json()
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}