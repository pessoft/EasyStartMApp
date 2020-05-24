import React from 'react'
import { connect } from 'react-redux'
import { FullScreenLogo } from '../../components/full-screen-logo/FullScreenLogo'
import { login, setIsLogin, dropFetchFlag, logout } from '../../store/user/actions'
import { getMainData, resetMainData } from '../../store/main/actions'
import { getLocation } from '../../store/location/actions'
import { AUTH, USER_INFO, MAIN } from '../../navigation/pointsNavigate'


class StartLogoScreen extends React.Component {
  constructor(props) {
    super(props)

    this.isRequestData = false
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
      this.goToMainPage()
      this.isRequestData = false
    } else if(!this.isRequestData) {
      this.props.getLocation()
      
      const params = this.getParamsForMainData()
      this.props.getMainData(params)

      this.isRequestData = true
    }
  }

  updateUserData = () => {
    if (Object.keys(this.props.cities).length > 0) {
      this.goToSetUserInfoPage()
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

  nextPage = () => {
    if (!this.isValidUserInfo()) {
      this.updateUserData()
    } else {
      this.userLogin()
    }
  }

  isValidUserInfo = () => {
    if (this.props.cityId < 1 ||
      !this.props.userName ||
      !this.props.email)
      return false;

    return true
  }

  goToAuthPage = () => this.props.navigation.navigate(AUTH)
  goToSetUserInfoPage = () => this.props.navigation.navigate(USER_INFO)
  goToMainPage = () => this.props.navigation.navigate(MAIN)

  componentDidUpdate(prevProps) {
    if (this.props.isLogin) {
      this.nextPage()
    }
    else if (!this.props.isFetching && prevProps.isFetching) {
      this.accessNoLogin()
    } else if (!this.props.isFetching && !this.props.dataIsFetching) {
      this.userLogin()
    }
  }

  componentDidMount = () => {
    if (this.isValidAuthData()) {
      this.props.setIsLogin(false)
      this.login()
    }
    else {
      this.accessNoLogin()
    }
  }

  accessNoLogin = () => {
    this.props.logout()
    this.props.resetMainData()
    this.props.dropFetchFlag()
    this.userLogin()
  }

  isValidAuthData = () => !!(this.props.phoneNumber && this.props.password)

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
    userName: state.user.userName,
    email: state.user.email,
    password: state.user.password,
    cityId: state.user.cityId,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    cities: state.location.cities,
    categories: state.main.categories,
    dataIsFetching: state.main.isFetching,
    style: state.style,
    isFetching: state.user.isFetching
  }
}

const mapDispatchToProps = {
  login,
  logout,
  setIsLogin,
  getMainData,
  resetMainData,
  getLocation,
  dropFetchFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(StartLogoScreen)

