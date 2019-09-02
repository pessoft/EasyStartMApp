import { createStackNavigator } from 'react-navigation'
import PhoneScreen from '../screens/user-information/phone/PhoneScreen'
import CityScreen from '../screens/user-information/city/CityScreen'
import { SET_PHONE_NUMBER } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

export const userInfoStackNavigator = createStackNavigator(
  {
    PhoneSet: PhoneScreen,
    CitySet: CityScreen
  },
  {
    ...defaultStyleNavigationStackOptions,
    initialRouteName: SET_PHONE_NUMBER
  })