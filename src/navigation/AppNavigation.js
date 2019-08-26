import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import StartLogoScreen from '../screens/start/StartLogoScreen'

const AppNavigation = createSwitchNavigator(
  {
    StartApp: StartLogoScreen,
    // 'UserSetInfo': LoginStack,
    // 'Main': MainBottomTab
  },
  {
    initialRouteName: 'StartApp',
  })

export default createAppContainer(AppNavigation)
