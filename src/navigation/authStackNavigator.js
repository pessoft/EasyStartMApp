import { createStackNavigator } from 'react-navigation-stack'
import AuthLoginScreen from '../screens/auth/auth-login/AuthLoginScreen'
import AuthRegistrationScreen from '../screens/auth/auth-registration/AuthRegistrationScreen'
import { AUTH_LOGIN } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

export const authStackNavigator = style => createStackNavigator(
  {
    AuthLogin: AuthLoginScreen,
    AuthRegistration: AuthRegistrationScreen
  },
  {
    ...defaultStyleNavigationStackOptions(style),
    initialRouteName: AUTH_LOGIN
  })