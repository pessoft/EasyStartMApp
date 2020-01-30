import React from 'react'
import { connect } from 'react-redux'
import { FullScreenLogo } from '../../components/full-screen-logo/FullScreenLogo'
import { login, setIsLogin, dropFetchFlag } from '../../store/user/actions'
import { getMainData } from '../../store/main/actions'
import { getLocation } from '../../store/location/actions'
import { USER_INFO, MAIN } from '../../navigation/pointsNavigate'

class StartLogoScreen extends React.Component {
  constructor(props) {
    super(props)

    this.props.dropFetchFlag()
  }

  getParamsForMainData = () => {
    return {
      branchId: this.props.branchId,
      clientId: this.props.clientId
    }
  }

  userLogin = () => {
    if (this.props.categories.length > 0) {
      this.props.navigation.navigate(MAIN)
    } else {
      this.props.getLocation()

      const params = this.getParamsForMainData()
      this.props.getMainData(params)
    }
  }

  userRegister = () => {
    if (Object.keys(this.props.cities).length > 0) {
      this.props.navigation.navigate(USER_INFO)
    } else {
      this.props.getLocation()
    }
  }

  login = () => {
    const userDate = {
      phoneNumber: this.props.phoneNumber,
      password: this.props.password
    }

    this.props.login(userDate)
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      this.userLogin()
    }
    else if (!this.props.isFetching) {
      this.userRegister()
    }
  }

  componentDidMount = () => {
    if (this.props.isLogin) {
      this.props.setIsLogin(false)
      this.login()
    }
    else
      this.userRegister()
  }

  render() {
    return (
      <FullScreenLogo
        source={this.props.logo}
        theme={this.props.style.theme} />
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    logo: state.appSetting.logo,
    phoneNumber: state.user.phoneNumber,
    password: state.user.password,
    cityId: state.user.cityId,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    cities: state.location.cities,
    categories: state.main.categories,
    style: state.style,
    isFetching: state.user.isFetching
  }
}

const mapDispatchToProps = {
  login,
  setIsLogin,
  getMainData,
  getLocation,
  dropFetchFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(StartLogoScreen)

