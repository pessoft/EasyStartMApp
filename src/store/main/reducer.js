import {
  FETCH_MAIN_DATA_SUCCESS,
  FETCH_MAIN_DATA_REQUEST,
  FETCH_MAIN_DATA_FAILURE,
  FETCH_UPDATE_PRODUCT_RATING_SUCCESS,
  FETCH_COUPON_SUCCESS,
  FETCH_COUPON_REQUEST,
  FETCH_COUPON_FAILURE,
  CLEAN_COUPON,
  RESET_DATA,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_REQUEST,
  FETCH_STOCKS_FAILURE
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  categories: [],
  products: {},
  recommendedProducts: {},
  additionalOptions: {},
  additionalFillings: {},
  productDictionary: {},
  constructorCategories: {},
  ingredients: {},
  deliverySettings: {},
  organizationSettings: {},
  stocks: [],
  news: [],
  promotionCashbackSetting: {},
  promotionPartnersSetting: {},
  promotionSectionSettings: [],
  promotionSetting: {},
  coupon: {},
  isFetchingCoupon: false,
  isFetchErrorCoupon: false,
}

export const mainReducer = (state = defaultState, action) => {

  switch (action.type) {
    case RESET_DATA:
      return { ...defaultState }
    case FETCH_MAIN_DATA_REQUEST:
      return {
        ...state,
        categories: [],
        productDictionary: {},
        constructorCategories: {},
        isFetching: true,
        isFetchError: false
      }
    case FETCH_STOCKS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_MAIN_DATA_SUCCESS:
    case FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      }
    case FETCH_MAIN_DATA_FAILURE:
    case FETCH_STOCKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchError: true
      }
    case FETCH_COUPON_REQUEST:
      return {
        ...state,
        isFetchingCoupon: true,
        isFetchErrorCoupon: false
      }
    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        coupon: action.payload,
        isFetchingCoupon: false
      }
    case FETCH_COUPON_FAILURE:
      return {
        ...state,
        isFetchingCoupon: false,
        isFetchErrorCoupon: true
      }
    case FETCH_UPDATE_PRODUCT_RATING_SUCCESS:
      const newState = { ...state }
      let product = newState.products[action.payload.CategoryId].filter(p => p.Id == action.payload.ProductId)[0]
      product.Rating = action.payload.Rating
      product.VotesSum = action.payload.VotesSum
      product.VotesCount = action.payload.VotesCount

      return newState
    case CLEAN_COUPON:
      return {
        ...state,
        coupon: {},
        isFetchingCoupon: false,
        isFetchErrorCoupon: false
      }
  }

  return state
}