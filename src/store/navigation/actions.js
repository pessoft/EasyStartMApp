export const MARK_FROM_BASKET = 'MARK_FROM_BASKET'

export const markFromBasket = fromBasket => {
  return {
    type: MARK_FROM_BASKET,
    payload: fromBasket
  }
}