import { createStackNavigator } from 'react-navigation'
import { CATEGORIES } from './pointsNavigate'
import { CategoriesScreen, ProductsScreen, ProductInfoScreen, ProductReviewScreen } from '../screens/catalog'

export const catalogStackNavigator = createStackNavigator(
    {
        Categories: CategoriesScreen,
        Products: ProductsScreen,
        ProductInfo: ProductInfoScreen,
        ProductReview: ProductReviewScreen
    },
    {
        initialRouteName: CATEGORIES
    })