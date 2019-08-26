import React from 'react'
import FullScreenLogo from '../../components/full-screen-logo/FullScreenLogoContainer'
import { checkActualUserData } from '../../store/user/actions'
import { getMainData } from '../../store/main/actions'
import { getLocation } from '../../store/location/actions'
import { connect } from 'react-redux'
import { USER_SET_INFO, MAIN } from '../../navigation/navigate-point'

class StartLogoScreen extends React.Component {
  componentDidUpdate() {
    if (this.state.isLogin)
      this.userLogin()
    else
      this.userRegister()
  }

  userLogin = () => {
    if (this.props.mainDataLoaded) {
      this.props.navigation.navigate(MAIN)
    } else {
      this.props.getMainData(tihs.props.branchId)
    }
  }

  userRegister = () => {
    if (this.props.locationLoaded) {
      this.props.navigation.navigate(USER_SET_INFO)
    } else {
      this.props.getLocation()
    }
  }

  componentDidMount = () => {
    if (this.props.isLogin)
      this.checkActualUserData()
    else
      this.props.navigation.navigate(USER_SET_INFO)
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
    branchId: state.user.branchId
  }
}

const mapDispathToProps = {
  checkActualUserData,
  getMainData,
  getLocation
}

export default connect(mapStateToProps, mapDispathToProps)(StartLogoScreen)

