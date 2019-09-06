import { createStackNavigator } from 'react-navigation'
import { SHOPPING_BASKET } from './pointsNavigate'
import ShoppingBasketScreen from '../screens/checkout/basket/ShoppingBasketScreen'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

const checkoutStackNavigator = createStackNavigator(
    {
        ShoppingBasketScreen: ShoppingBasketScreen,
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: SHOPPING_BASKET
    })

export { checkoutStackNavigator }