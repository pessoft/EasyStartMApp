import { createStackNavigator } from 'react-navigation'
import { PROFILE } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'
import PersonalAccountScreen from '../screens/personal-account/personal-account/PersonalAccountScreen'
import OrdersHistoryScreen from '../screens/personal-account/order-history/ordersHistoryScreen'
import OrdersHistoryInfoScreen from '../screens/personal-account/order-history-info/OrderHistoryInfoScreen'

const profileStackNavigator = style => createStackNavigator(
    {
        Profile: PersonalAccountScreen,
        OrdersHistoryProfile: OrdersHistoryScreen,
        OrdersHistoryInfoProfile: OrdersHistoryInfoScreen
    },
    {
        ...defaultStyleNavigationStackOptions(style),
        initialRouteName: PROFILE
    })

export { profileStackNavigator }