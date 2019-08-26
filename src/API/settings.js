import { checkActualUserDataQuery, getAllowedCityQuery, getCityBranchesQuery } from './queryAPI'
import { getFetchOption } from './helperAPI'

export const checkActualUserDataFetch = async (userData) => {
  const options = getFetchOption(userData)
  const result = await getData(checkActualUserDataQuery, options)
  const isActual = result && result.Success && result.Data

  return isActual
}

export const getAllowedCityFetch = async () => {
  return await getData(getAllowedCityQuery)
}

export const getCityBranchesFetch = async () => {
  return await getData(getCityBranchesQuery)
}

const getData = async (query, options) => {
  const response = await fetch(query, options)

  if (response.ok) {
    return await response.json()
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}