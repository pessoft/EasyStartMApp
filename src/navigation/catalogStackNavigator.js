import { createStackNavigator } from 'react-navigation'
import { CATEGORIES } from './pointsNavigate'
import { CategoriesScreen, ProductsScreen, ProductInfoScreen, ProductReviewScreen } from '../screens/catalog'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

const catalogStackNavigator = style => createStackNavigator(
    {
        Categories: CategoriesScreen,
        Products: ProductsScreen,
        ProductInfo: ProductInfoScreen,
        ProductReview: ProductReviewScreen
    },
    {
        ...defaultStyleNavigationStackOptions(style),
        initialRouteName: CATEGORIES
    })

catalogStackNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.index == 3) {
        tabBarVisible = false
    }

    return {
        tabBarVisible,
    }
}

export { catalogStackNavigator }