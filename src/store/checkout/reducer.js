import {
  TOGGLE_PRODUCT_IN_BASKET_SHOP,
} from './actions'

const defaultState = {
  basketProducts: {},
}

export const checkoutReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_PRODUCT_IN_BASKET_SHOP:
      return {
        ...state,
        basketProducts: { ...state.basketProducts, ...action.payload }
      }
  }

  return state
}