import {
  TOGGLE_PRODUCT_IN_BASKET_SHOP,
  TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP,
  TOGGLE_PRODUCT_WITH_OPTIONS_IN_BASKET_SHOP,
  CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP,
} from './actions'

export const defaultState = {
  totalCountProducts: 0,
  basketProducts: {},
  basketProductsWithOptions: {},
  basketConstructorProducts: {},
}

export const basketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketConstructorProducts: action.payload
      }
    case TOGGLE_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketProducts: action.payload
      }
    case TOGGLE_PRODUCT_WITH_OPTIONS_IN_BASKET_SHOP:
      return {
        ...state,
        basketProductsWithOptions: action.payload
      }
    case CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        totalCountProducts: action.payload
      }
  }

  return state
}