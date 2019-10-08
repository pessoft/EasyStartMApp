import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import StartLogoScreen from '../screens/start/StartLogoScreen'
import { userInfoStackNavigator } from './userInfoStackNavigator';
import { mainBottomTab } from './mainBottomTabNavigator';
import { START_APP } from './pointsNavigate';
import CheckoutCompleteScreen from '../screens/checkout/checkout-complete/CheckoutCompleteScreen'
const appNavigation = createSwitchNavigator(
  {
    StartApp: StartLogoScreen,
    UserSetInfo: userInfoStackNavigator,
    MainBottomTab: mainBottomTab,
    CheckoutComplete: CheckoutCompleteScreen
  },
  {
    initialRouteName: START_APP
  })

export default createAppContainer(appNavigation)
