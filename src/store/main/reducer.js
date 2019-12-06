import {
  FETCH_MAIN_DATA_SUCCESS,
  FETCH_MAIN_DATA_REQUEST,
  FETCH_MAIN_DATA_FAILURE,
  FETCH_UPDATE_PRODUCT_RATING_SUCCESS,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_REQUEST,
  FETCH_COUPON_FAILURE
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  categories: [],
  products: {},
  deliverySettings: {},
  organizationSettings: {},
  stocks: [],
  promotionCashbackSetting: {},
  promotionPartnersSetting: {},
  promotionSectionSettings: [],
  coupon: {}
}

export const mainReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_MAIN_DATA_REQUEST:
    case FETCH_COUPON_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_MAIN_DATA_SUCCESS:
    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      }
    case FETCH_MAIN_DATA_FAILURE:
    case FETCH_COUPON_FAILURE:
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