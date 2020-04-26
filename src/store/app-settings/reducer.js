import Images from '../../images'
import { SERVER_DOMAIN } from '../../api/server-domain'
import { Dimensions } from 'react-native'
import { CHANGE_CATEGORY_VIEW_CONTAINER_TYPE, CHANGE_PRODUCTS_VIEW_CONTAINER_TYPE } from './actions'
import { ViewContainerType } from '../../helpers/view-container-type'
const min320 = Dimensions.get('window').width <= 320

export const defaultState = {
  logo: Images.logo,
  serverDomain: SERVER_DOMAIN,
  currencyPrefix: min320 ? 'р.' : 'руб.',
  appPackageName: '',
  selectedCategoryViewType: ViewContainerType.grid,
  selectedProductsViewType: ViewContainerType.grid,
  appTitle: 'Рис Лосось'
}

export const appSettingReducer = (state = defaultState, action) => {

  switch (action.type) {
    case CHANGE_CATEGORY_VIEW_CONTAINER_TYPE:
      return {
        ...state,
        selectedCategoryViewType: action.payload
      }
    case CHANGE_PRODUCTS_VIEW_CONTAINER_TYPE:
      return {
        ...state,
        selectedProductsViewType: action.payload
      }
  }

  return state
}