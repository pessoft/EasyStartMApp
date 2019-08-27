import React from 'react'
import { connect } from 'react-redux'
import FullScreenLogo from '../../components/full-screen-logo/FullScreenLogoContainer'
import { checkActualUserData } from '../../store/user/actions'
import { getMainData } from '../../store/main/actions'
import { getLocation } from '../../store/location/actions'
import { USER_SET_INFO, MAIN } from '../../navigation/navigate-point'

class StartLogoScreen extends React.Component {
  userLogin = () => {
    if (this.props.mainDataLoaded) {
      this.props.navigation.navigate(MAIN)
    } else {
      this.props.getMainData(this.props.branchId)
    }
  }

  userRegister = () => {
    if (this.props.locationLoaded) {
      this.props.navigation.navigate(USER_SET_INFO)
    } else {
      this.props.getLocation()
    }
  }

  checkActualUserData = () => {
    const userDate = {
      phoneNumber: this.props.phoneNumber,
      cityId: this.props.cityId,
      clientId: this.props.clientId,
    }

    this.props.checkActualUserData(userDate)
  }

  componentDidUpdate() {
    if (this.props.isLogin)
      this.userLogin()
    else
      this.userRegister()
  }

  componentDidMount = () => {
    if (this.props.isLogin)
      this.checkActualUserData()
    else
      this.userRegister()
  }

  render() {
    return <FullScreenLogo />
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    phoneNumber: state.user.phoneNumber,
    cityId: state.user.cityId,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    locationLoaded: state.location.dataLoaded,
    mainDataLoaded: state.main.dataLoaded,
  }
}

const mapDispatchToProps = {
  checkActualUserData,
  getMainData,
  getLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(StartLogoScreen)

