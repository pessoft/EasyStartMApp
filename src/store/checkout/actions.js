export const TOGGLE_PRODUCT_IN_BASKET_SHOP = 'TOGGLE_PRODUCT_IN_BASKET_SHOP'

export const toggleProductInBasket = basketProduct => {
  return {
    type: TOGGLE_PRODUCT_IN_BASKET_SHOP,
    payload: basketProduct
  }
}