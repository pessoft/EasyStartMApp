import { createStackNavigator } from 'react-navigation'
import PhoneScreen from '../screens/user-information/PhoneScreen'
import CityScreen from '../screens/user-information/CityScreen'
import { SET_PHONE_NUMBER } from './pointsNavigate'

export const userInfoStackNavigator = createStackNavigator(
  {
    PhoneSet: PhoneScreen,
    CitySet: CityScreen
  },
  {
    initialRouteName: SET_PHONE_NUMBER,
  })
