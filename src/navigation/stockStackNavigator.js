import { createStackNavigator } from 'react-navigation-stack'
import { STOCKS } from './pointsNavigate'
import StocksScreen from '../screens/stock/stock-screen/StocksScreen'
import StockInfoScreen from '../screens/stock/stock-info-screen/StockInfoScreen'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

const stockStackNavigator = style => createStackNavigator(
    {
        Stocks: StocksScreen,
        StockInfo: StockInfoScreen,
    },
    {
        ...defaultStyleNavigationStackOptions(style),
        initialRouteName: STOCKS
    })

export { stockStackNavigator }