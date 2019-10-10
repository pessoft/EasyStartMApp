import { createStackNavigator } from 'react-navigation'
import { PROFILE } from './pointsNavigate'
import { orderHistoryStackNavigator } from './profile-stack-navigation/orderHistoryStackNavigator'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'
import PersonalAccountScreen from '../screens/personal-account/personal-account/PersonalAccountScreen'

const profileStackNavigator = createStackNavigator(
    {
        Profile: PersonalAccountScreen,
        OrdersHistoryProfile: orderHistoryStackNavigator
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: PROFILE
    })

export { profileStackNavigator }