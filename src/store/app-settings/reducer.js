import Images from '../../images'
import { SERVER_DOMAIN } from '../../api/server-domain'
import { Dimensions } from 'react-native'
import { CHANGE_CATEGORY_VIEW_CONTAINER_TYPE, CHANGE_PRODUCTS_VIEW_CONTAINER_TYPE } from './actions'
import { ViewContainerType } from '../../helpers/view-container-type'
import { CurrencyType } from '../../helpers/currency/currency-type'
import { getCurrencyPrefix, getCurrencyCashbackLabel } from '../../helpers/currency/currency-helper'

const defaultCurrency = CurrencyType.Ruble
export const defaultState = {
  logo: Images.logo,
  serverDomain: SERVER_DOMAIN,
  currencyType: defaultCurrency,
  currencyPrefix: getCurrencyPrefix(defaultCurrency),
  cashbackLabel: getCurrencyCashbackLabel(defaultCurrency),
  appPackageName: 'com.easystartmapp',
  selectedCategoryViewType: ViewContainerType.grid,
  selectedProductsViewType: ViewContainerType.grid
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