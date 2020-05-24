import { createStackNavigator } from 'react-navigation-stack'
import { STOCKS } from './pointsNavigate'
import StocksScreen from '../screens/stock/stock-screen/StocksScreen'
import StockInfoScreen from '../screens/stock/stock-info-screen/StockInfoScreen'
import NewsInfoScreen from '../screens/stock/news-info-screen/NewsInfoScreen'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

const stockStackNavigator = style => createStackNavigator(
    {
        Stocks: StocksScreen,
        StockInfo: StockInfoScreen,
        NewsInfo: NewsInfoScreen
    },
    {
        ...defaultStyleNavigationStackOptions(style),
        initialRouteName: STOCKS
    })

export { stockStackNavigator }