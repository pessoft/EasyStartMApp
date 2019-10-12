import { createStackNavigator } from 'react-navigation'
import UserDataScreen from '../screens/user-information/user-data/UserDataScreen'
import CityScreen from '../screens/user-information/city/CityScreen'
import { SET_USER_DATA } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

export const userInfoStackNavigator = style => createStackNavigator(
  {
    UserDataSet: UserDataScreen,
    CitySet: CityScreen
  },
  {
    ...defaultStyleNavigationStackOptions(style),
    initialRouteName: SET_USER_DATA
  })