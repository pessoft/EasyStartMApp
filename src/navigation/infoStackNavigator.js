import { createStackNavigator } from 'react-navigation'
import { INFO_ORGANIZATION } from './pointsNavigate'
import InformationScreen from '../screens/information/InformationScreen'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

const infoStackNavigator = createStackNavigator(
    {
        InfoOrganization: InformationScreen,
    },
    {
        ...defaultStyleNavigationStackOptions,
        initialRouteName: INFO_ORGANIZATION
    })

export { infoStackNavigator }