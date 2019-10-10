import { createStackNavigator } from 'react-navigation'
import { PROFILE } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'
import PersonalAccountScreen from '../screens/personal-account/personal-account/PersonalAccountScreen'
import OrdersHistoryScreen from '../screens/personal-account/order-history/ordersHistoryScreen'

const profileStackNavigator = createStackNavigator(
    {
        Profile: PersonalAccountScreen,
        OrdersHistoryProfile: OrdersHistoryScreen
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: PROFILE
    })

export { profileStackNavigator }