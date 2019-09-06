import { createStackNavigator } from 'react-navigation'
import { PROFILE } from './pointsNavigate'
import { orderHistoryStackNavigator } from './profile-stack-navigation/orderHistoryStackNavigator'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'
import ProfileScreen from '../screens/personal-account/ProfileScreen'

const profileStackNavigator = createStackNavigator(
    {
        Profile: ProfileScreen,
        OrdersHistoryProfile: orderHistoryStackNavigator
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: PROFILE
    })

export { profileStackNavigator }