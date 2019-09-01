import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import StartLogoScreen from '../screens/start/StartLogoScreen'
import userInfoStackNavigator from './userInfoStackNavigator';
import { mainBottomTab } from './mainBottomTabNavigator';
import { START_APP } from './pointsNavigate';

const appNavigation = createSwitchNavigator(
  {
    StartApp: StartLogoScreen,
    UserSetInfo: userInfoStackNavigator,
    MainBottomTab: mainBottomTab
  },
  {
    initialRouteName: START_APP
  })

export default createAppContainer(appNavigation)
