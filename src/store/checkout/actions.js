export const TOGGLE_PRODUCT_IN_BASKET_SHOP = 'TOGGLE_PRODUCT_IN_BASKET_SHOP'
export const CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP = 'CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP'

export const toggleProductInBasket = basketProduct => {
  return {
    type: TOGGLE_PRODUCT_IN_BASKET_SHOP,
    payload: basketProduct
  }
}

export const changeTotalCountProductInBasket = count => {
  return {
    type: CHANGE_TOTAL_COUNT_PRODUCT_IN_BASKET_SHOP,
    payload: count
  }
}