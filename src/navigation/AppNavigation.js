import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import StartLogoScreen from '../screens/start/StartLogoScreen'
import { authStackNavigator } from './authStackNavigator'
import { userInfoStackNavigator } from './userInfoStackNavigator';
import { mainBottomTab } from './mainBottomTabNavigator';
import { START_APP } from './pointsNavigate';
import CheckoutCompleteScreen from '../screens/checkout/checkout-complete/CheckoutCompleteScreen'
import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from "react-native-flash-message"
import { registerAppWithFCM, requestPermission } from '../store/FCM/actions'

export class AppContainer extends React.Component {

  componentDidMount() {
    //TO DO for ios
    // this.props.registerAppWithFCM()
    // this.props.requestPermission()
  }

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

    return (
      <React.Fragment>
        <Container />
        <FlashMessage position='top' duration={4000} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style
  }
}

const mapDispatchToProps = {
  registerAppWithFCM,
  requestPermission
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
