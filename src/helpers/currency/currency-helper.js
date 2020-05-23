import {CurrencyType} from './currency-type'
import { Dimensions } from 'react-native'

const min320 = Dimensions.get('window').width <= 320

export const getCurrencyPrefix = currencyType => {
    switch(currencyType) {
        case CurrencyType.Ruble:
            return min320 ? 'р.' : 'руб.';
        case CurrencyType.Lei:
            return 'lei'
    }
}

export const getCurrencyCashbackLabel = currencyType => {
    switch(currencyType) {
        case CurrencyType.Ruble:
            return 'рублей'
        case CurrencyType.Lei:
            return 'lei'
    }
}