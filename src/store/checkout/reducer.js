import {
  TOGGLE_PRODUCT_IN_BASKET_SHOP,
  CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP
} from './actions'

const defaultState = {
  basketProducts: {},
  totalCountProducts: 0
}

export const checkoutReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketProducts: { ...state.basketProducts, ...action.payload }
      }
    case CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        totalCountProducts: action.payload
      }
  }

  return state
}