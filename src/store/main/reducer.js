import { FETCH_MAIN_DATA_SUCCESS, FETCH_MAIN_DATA_REQUEST, FETCH_MAIN_DATA_FAILURE } from './actions'

const defaultState = {
  isFetching: false,
  dataLoaded: false,
  categories: [],
  products: {},
  deliverySettings: {},
  organizationSettings: {},
  stocks: [],
  reviewsCount: {}
}

export const mainReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_MAIN_DATA_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_MAIN_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      }
    case FETCH_MAIN_DATA_FAILURE:
      return {
        ...state,
        isFetching: false
      }
  }

  return state
}