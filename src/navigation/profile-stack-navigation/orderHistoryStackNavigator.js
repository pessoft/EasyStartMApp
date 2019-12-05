import { createStackNavigator } from 'react-navigation-stack'
import { ORDERS_HISTORY } from '../pointsNavigate'
import { defaultStyleNavigationStackOptions } from '../defaultStyleStackNavOption'
import OrdersHistoryScreen from '../../screens/personal-account/order-history/ordersHistoryScreen'

const orderHistoryStackNavigator = createStackNavigator(
    {
        OrdersHistory: OrdersHistoryScreen,
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: ORDERS_HISTORY
    })

export { orderHistoryStackNavigator }