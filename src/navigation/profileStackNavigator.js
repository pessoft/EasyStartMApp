import { createStackNavigator } from 'react-navigation-stack'
import { PROFILE } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'
import PersonalAccountScreen from '../screens/personal-account/personal-account/PersonalAccountScreen'
import OrdersHistoryScreen from '../screens/personal-account/order-history/OrdersHistoryScreen'
import OrdersHistoryInfoScreen from '../screens/personal-account/order-history-info/OrderHistoryInfoScreen'
import ColorThemeScreen from '../screens/personal-account/color-theme/ColorThemeScreen'
import PartnersProfileScreen from '../screens/personal-account/partners/PartnersInfoScreen'
import CashbackProfileScreen from '../screens/personal-account/cashback/CashbackInfoScreen'

const profileStackNavigator = style => createStackNavigator(
    {
        Profile: PersonalAccountScreen,
        OrdersHistoryProfile: OrdersHistoryScreen,
        OrdersHistoryInfoProfile: OrdersHistoryInfoScreen,
        ColorThemeProfile: ColorThemeScreen,
        PartnersProfile: PartnersProfileScreen,
        CashbackProfile: CashbackProfileScreen
    },
    {
        ...defaultStyleNavigationStackOptions(style),
        initialRouteName: PROFILE
    })

export { profileStackNavigator }