import { createStackNavigator } from 'react-navigation-stack'
import { SHOPPING_BASKET } from './pointsNavigate'
import ShoppingBasketScreen from '../screens/checkout/basket/ShoppingBasketScreen'
import CheckoutScreen from '../screens/checkout/checkout/CheckoutScreen'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'
import { ProductInfoScreen, ProductReviewScreen } from '../screens/catalog'


const checkoutStackNavigator = style => {
    let navigator = createStackNavigator(
        {
            ShoppingBasketScreen: ShoppingBasketScreen,
            ProductInfoFomBasket: ProductInfoScreen,
            ProductReviewFromBasket: ProductReviewScreen,
            CheckoutScreen: CheckoutScreen
        },
        {
            ...defaultStyleNavigationStackOptions(style),
            initialRouteName: SHOPPING_BASKET
        })

    navigator.navigationOptions = ({ navigation }) => {
        let tabBarVisible = true
        if (navigation.state.index == 2) {
            tabBarVisible = false
        }

        return {
            tabBarVisible,
        }
    }

    return navigator
}

export { checkoutStackNavigator }