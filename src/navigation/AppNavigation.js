import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import StartLogoScreen from '../screens/start/StartLogoScreen'
import { authStackNavigator } from './authStackNavigator'
import { userInfoStackNavigator } from './userInfoStackNavigator';
import { mainBottomTab } from './mainBottomTabNavigator';
import { START_APP } from './pointsNavigate';
import CheckoutCompleteScreen from '../screens/checkout/checkout-complete/CheckoutCompleteScreen'
import React from 'react'
import { connect } from 'react-redux'

class AppNavigation extends React.Component {

  render() {
    const appNavigation = createSwitchNavigator(
      {
        StartApp: StartLogoScreen,
        Auth: authStackNavigator(this.props.style),
        UserSetInfo: userInfoStackNavigator(this.props.style),
        MainBottomTab: mainBottomTab(this.props.style),
        CheckoutComplete: CheckoutCompleteScreen
      },
      {
        initialRouteName: START_APP
      })

    const Container = createAppContainer(appNavigation)

    return <Container />
  }
}

const mapStateToProps = state => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(AppNavigation)
