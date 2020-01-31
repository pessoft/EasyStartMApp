import { createStackNavigator } from 'react-navigation-stack'
import AuthLoginScreen from '../screens/auth/auth-login/AuthLoginScreen'
import AuthRegistrationScreen from '../screens/auth/auth-registration/AuthRegistrationScreen'
import AuthRestorePasswordScreen from '../screens/auth/auth-restore-password/restore-password/AuthRestorePasswordScreen'
import AuthRestorePasswordSuccessScreen from '../screens/auth/auth-restore-password/restore-password-success/AuthRestorePasswordSuccessScreen'
import { AUTH_LOGIN } from './pointsNavigate'
import { defaultStyleNavigationStackOptions } from './defaultStyleStackNavOption'

export const authStackNavigator = style => createStackNavigator(
  {
    AuthLogin: AuthLoginScreen,
    AuthRegistration: AuthRegistrationScreen,
    AuthRestorePassword: AuthRestorePasswordScreen,
    AuthRestorePasswordSuccess: AuthRestorePasswordSuccessScreen
  },
  {
    ...defaultStyleNavigationStackOptions(style),
    initialRouteName: AUTH_LOGIN
  })