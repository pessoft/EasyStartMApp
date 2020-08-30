export const TOGGLE_PRODUCT_IN_BASKET_SHOP = 'TOGGLE_PRODUCT_IN_BASKET_SHOP'
export const TOGGLE_PRODUCT_WITH_OPTIONS_IN_BASKET_SHOP = 'TOGGLE_PRODUCT_WITH_OPTIONS_IN_BASKET_SHOP'
export const TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP = 'TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP'
export const CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP = 'CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP'

export const toggleConstructorProductInBasket = basketProduct => {
  return {
    type: TOGGLE_CONSTRUCTOR_PRODUCT_IN_BASKET_SHOP,
    payload: basketProduct
  }
}

export const toggleProductInBasket = basketProduct => {
  return {
    type: TOGGLE_PRODUCT_IN_BASKET_SHOP,
    payload: basketProduct
  }
}

export const toggleProductWithOptionsInBasket = basketProduct => {
  return {
    type: TOGGLE_PRODUCT_WITH_OPTIONS_IN_BASKET_SHOP,
    payload: basketProduct
  }
}

export const changeTotalCountProductInBasket = count => {
  return {
    type: CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP,
    payload: count
  }
}