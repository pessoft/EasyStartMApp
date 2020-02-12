import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from 'react-native-flash-message'
import AppNavigation from '../navigation/AppNavigation'

export class MainContainer extends React.Component {

  render() {
    return (
      <React.Fragment>
        <FlashMessage position='top' duration={4000} />
        <AppNavigation />
      </React.Fragment>
    )
  }
}

export default connect()(MainContainer)