import { createStackNavigator } from 'react-navigation-stack'
import { ORGANIZATION_REVIEWS } from './pointsNavigate'
import OrganizationReviewsScreen from '../screens/organization-reviews/OrganizationReviewsScreen'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

const organizationReviewsStackNavigator = createStackNavigator(
    {
        OrganizationReviews: OrganizationReviewsScreen,
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: ORGANIZATION_REVIEWS
    })

export { organizationReviewsStackNavigator }