export const CHANGE_CATEGORY_VIEW_CONTAINER_TYPE = 'CHANGE_CATEGORY_VIEW_CONTAINER_TYPE'
export const CHANGE_PRODUCTS_VIEW_CONTAINER_TYPE = 'CHANGE_PRODUCTS_VIEW_CONTAINER_TYPE'

export const changeCategoryViewContainerType = type => {
  return {
    type: CHANGE_CATEGORY_VIEW_CONTAINER_TYPE,
    payload: type
  }
}

export const changeProductsViewContainerType = type => {
  return {
    type: CHANGE_PRODUCTS_VIEW_CONTAINER_TYPE,
    payload: type
  }
}