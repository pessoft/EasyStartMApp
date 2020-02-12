import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import AppNavigation from '../navigation/AppNavigation'
import FCMManagerComponent from '../fcm/components/fcm-manager/fcm-manger-component'

export class MainContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <FlashMessage position='top' duration={4000} />
        <FCMManagerComponent />
        <AppNavigation />
      </React.Fragment>
    )
  }
}

export default connect()(MainContainer)