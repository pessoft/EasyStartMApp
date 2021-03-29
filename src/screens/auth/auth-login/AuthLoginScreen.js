import React from 'react'
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  View,
  Animated,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { AUTH_REGISTRATION, AUTH_RESTORE_PASSWORD, USER_INFO, MAIN, START_APP } from '../../../navigation/pointsNavigate'
import { login, dropFetchFlag } from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import UserPhotoDefaultIcon from '../../../images/font-awesome-svg/user-circle.svg'
import { getSVGColor } from '../../../helpers/color-helper'
import { getMainData, resetMainData } from '../../../store/main/actions'
import { resetCheckoutData } from '../../../store/checkout/actions'
import { getLocation } from '../../../store/location/actions'
import { showMessage } from 'react-native-flash-message'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { ButtonWithoutFeedback } from '../../../components/buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'

const { width } = Dimensions.get('window')

class AuthLoginScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Вход в аккаунт',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      phoneNumber: '',
      password: '',
    }
  }

  componentDidMount() {
    this.props.resetCheckoutData()
    this.props.resetMainData()
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {
    if (this.props.isLogin) {
      if (!this.isValidUserInfo()) {
        this.updateUserData()
      } else {
        this.userLogin()
      }
    } else if (!this.props.isFetching) {
      timingAnimation(this.state.showScaleAnimation, 1, 300, true)

      if (this.props.isFetchError)
        this.showErrMessage()
    }
  }

  showErrMessage = () => {
    if (!this.props.isFetchError)
      return

    showMessage({
      message: this.props.errorMessage,
      type: 'danger',
    });
    this.props.dropFetchFlag()
  }

  updateUserData = () => {
    if (Object.keys(this.props.cities).length > 0) {
      this.goToSetUserInfoPage()
    } else {
      this.props.getLocation()
    }
  }

  userLogin = () => {
    if (this.props.categories.length > 0) {
      this.goToMainPage()
    } else {
      this.props.getLocation()

      const params = this.getParamsForMainData()
      this.props.getMainData(params)
    }
  }

  getParamsForMainData = () => {
    return {
      branchId: this.props.branchId,
      clientId: this.props.clientId,
      appPackageName: this.props.appPackageName
    }
  }

  isValidUserInfo = () => {
    if (this.props.user.cityId < 1 ||
      !this.props.user.userName ||
      !this.props.user.email)
      return false;

    return true
  }

  onPhoneChange = phoneNumber => this.setState({ phoneNumber: phoneNumber.trim() })
  onPasswordChange = password => this.setState({ password })

  login = () => {
    this.props.login({
      PhoneNumber: this.state.phoneNumber,
      Password: this.state.password
    })
  }

  isValidData = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.state.phoneNumber.match(regexp)
      && this.state.password
      && this.state.password.length > 3)
      return true

    return false
  }

  goToRegistrationPage = () => this.props.navigation.navigate(AUTH_REGISTRATION)
  goToRestorePasswordPage = () => this.props.navigation.navigate(AUTH_RESTORE_PASSWORD)
  goToSetUserInfoPage = () => this.props.navigation.navigate(USER_INFO)
  goToMainPage = () => this.props.navigation.navigate(MAIN)
  goToStartPage = () => this.props.navigation.navigate(START_APP)

  renderLoader = () => {
    return (
      <View style={Style.centerScreen}>
        <ActivityIndicator size='large' color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </View>
    )
  }

  renderContent = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <KeyboardAvoidingView style={Style.screen} behavior='height'>

          <Animated.View
            style={[Style.screen,
            {
              opacity: this.state.showScaleAnimation,
              transform: [{ scale: this.state.showScaleAnimation }]
            }]}>
            <View style={Style.mainContainer}>
              <UserPhotoDefaultIcon
                width={90} height={90}
                style={Style.loginIcon}
                color={getSVGColor(this.props.style.theme.primaryTextColor.color)}
              />
              <TextInputMask
                keyboardType={'phone-pad'}
                placeholder={'Номер телефона: +7...'}
                placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
                type={'custom'}
                options={{ mask: '+7(999)999-99-99' }}
                value={this.state.phoneNumber}
                style={[
                  Style.inputText,
                  Style.firstInput,
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onPhoneChange}
                returnKeyType={'next'}
                onSubmitEditing={() => { this.secondTextInput.focus() }}
                blurOnSubmit={false}
              />
              <TextInput
                ref={(input) => { this.secondTextInput = input; }}
                secureTextEntry={true}
                placeholder='Пароль'
                value={this.state.password}
                placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
                style={[
                  Style.inputText,
                  Style.secondInput,
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onPasswordChange}
                onSubmitEditing={() => Keyboard.dismiss()}
                blurOnSubmit={false}
              />
              <View style={[
                Style.inputSize,
              ]}>
                <ButtonWithoutFeedback
                  text='Войти'
                  style={this.props.style}
                  disabled={!this.isValidData()}
                  borderRadius={5}
                  onPress={this.login}
                />
                <SimpleTextButton
                  text='Зарегистрироваться'
                  onPress={this.goToRegistrationPage}
                  sizeText={this.props.style.fontSize.h9.fontSize}
                  color={this.props.style.theme.primaryTextColor.color}
                  margin={10}
                />
              </View>
            </View>
            <View style={Style.buttonsSecondary}>

              <View style={[
                Style.inputSize,
              ]}>
                <SimpleTextButton
                  text='Восстановить пароль'
                  onPress={this.goToRestorePasswordPage}
                  sizeText={this.props.style.fontSize.h9.fontSize}
                  color={this.props.style.theme.primaryTextColor.color}
                  margin={2}
                />
              </View>

              <View style={[
                Style.inputSize,
              ]}>
                <SimpleTextButton
                  text='Продолжить без входа'
                  onPress={this.goToStartPage}
                  sizeText={this.props.style.fontSize.h9.fontSize}
                  color={this.props.style.theme.primaryTextColor.color}
                  margin={2}
                />
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    if (this.props.isFetching ||
      this.props.isLogin) {
      return this.renderLoader()
    } else {
      return this.renderContent()
    }
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    isLogin: state.user.isLogin,
    isFetching: state.user.isFetching,
    isFetchError: state.user.isFetchError,
    errorMessage: state.user.errorMessage,
    user: state.user,
    cities: state.location.cities,
    categories: state.main.categories,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    appPackageName: state.appSetting.appPackageName,
  }
}

const mapDispatchToProps = {
  login,
  dropFetchFlag,
  getMainData,
  resetMainData,
  getLocation,
  resetCheckoutData
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginScreen)

