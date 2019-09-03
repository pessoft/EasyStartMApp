import { createStackNavigator } from 'react-navigation'
import UserDataScreen from '../screens/user-information/user-data/UserDataScreen'
import CityScreen from '../screens/user-information/city/CityScreen'
import { SET_USER_DATA } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

export const userInfoStackNavigator = createStackNavigator(
  {
    UserDataSet: UserDataScreen,
    CitySet: CityScreen
  },
  {
    ...defaultStyleNavigationStackOptions,
    initialRouteName: SET_USER_DATA
  })