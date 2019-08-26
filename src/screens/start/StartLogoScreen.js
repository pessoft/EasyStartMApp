import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import FullScreenLogo from '../../components/full-screen-logo/FullScreenLogoContainer'
import { checkActualUserData } from '../../store/user/actions'
import { connect } from 'react-redux'

class StartLogoScreen extends React.Component {
  componentDidMount = () => {
    if (!this.props.isLogin)
      this.checkActualUserData()
    else
      this.props.navigation.navigate('Login')
  }

  checkActualUserData = () => {
    const userDate = {
      phoneNumber: this.props.phoneNumber,
      cityId: this.props.cityId,
      clientId: this.props.clientId,
    }

    this.props.checkActualUserData(userDate)
  }

  render() {
    return (
      <FullScreenLogo />
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    phoneNumber: state.user.phoneNumber,
    cityId: state.user.cityId,
    clientId: state.user.clientId,
  }
}

export default connect(mapStateToProps, { checkActualUserData })(StartLogoScreen)

