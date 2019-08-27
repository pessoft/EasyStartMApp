import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import StartLogoScreen from '../screens/start/StartLogoScreen'
import { userInfoStackNavigator } from './userInfoNavigator';

const appNavigation = createSwitchNavigator(
  {
    StartApp: StartLogoScreen,
    UserSetInfo: userInfoStackNavigator,
    // 'Main': MainBottomTab
  },
  {
    initialRouteName: 'StartApp',
  })

export default createAppContainer(appNavigation)
