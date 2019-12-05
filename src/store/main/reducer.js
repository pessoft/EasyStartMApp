import {
  FETCH_MAIN_DATA_SUCCESS,
  FETCH_MAIN_DATA_REQUEST,
  FETCH_MAIN_DATA_FAILURE,
  FETCH_UPDATE_PRODUCT_RATING_SUCCESS,
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  categories: [],
  products: {},
  deliverySettings: {},
  organizationSettings: {},
  stocks: [],
  promotionCashBackSetting: {},
  promotionPartnersSetting: {},
  promotionSectionSettings: []
}

export const mainReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_MAIN_DATA_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
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
        isFetching: false,
        isFetchError: true
      }
    case FETCH_UPDATE_PRODUCT_RATING_SUCCESS:
      const newState = { ...state }
      let product = newState.products[action.payload.CategoryId].filter(p => p.Id == action.payload.ProductId)[0]
      product.Rating = action.payload.Rating
      product.VotesSum = action.payload.VotesSum
      product.VotesCount = action.payload.VotesCount

      return newState
  }

  return state
}