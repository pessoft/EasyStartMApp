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
import { USER_INFO } from '../../../navigation/pointsNavigate'
import { dropFetchFlag, registrationUser } from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import UserPhotoDefaultIcon from '../../../images/font-awesome-svg/user-plus.svg'
import { getSVGColor } from '../../../helpers/color-helper'
import { getMainData } from '../../../store/main/actions'
import { getLocation } from '../../../store/location/actions'
import { showMessage } from "react-native-flash-message"
import { ButtonWithoutFeedback } from '../../../components/buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'
import { Confirm } from '../../../components/raw-bottom-sheets/confirm/Confirm'

const { width } = Dimensions.get('window')

class AuthRegistrationScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Регистрация',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      toggleConfirm: false
    }
  }

  componentDidMount() {
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
      this.showErrMessage()
    }
  }

  showErrMessage = () => {
    if (!this.props.isFetchError)
      return

    showMessage({
      message: this.props.errorMessage,
      type: "danger",
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
    } else if (!this.props.isFetchingMainData) {
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
  onConfirmPasswordChange = confirmPassword => this.setState({ confirmPassword })
  goToSetUserInfoPage = () => this.props.navigation.navigate(USER_INFO)

  registration = () => this.props.registrationUser({
    PhoneNumber: this.state.phoneNumber,
    Password: this.state.password
  })

  confirmPhoneNumber = () => this.setState({ toggleConfirm: true })
  confirmCancel = () => this.setState({ toggleConfirm: false })
  confirmSuccess = () => {
    this.setState({ toggleConfirm: false })
    this.registration()
  }

  isValidData = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.state.phoneNumber.match(regexp)
      && this.state.password
      && this.state.password.length > 3
      && this.state.password == this.state.confirmPassword)
      return true

    return false
  }

  getMessageForConfirm = () => {
    const message = `Номер телефона ${this.state.phoneNumber} указан верно?`

    return message
  }

  renderLoader = () => {
    return (
      <View style={Style.centerScreen}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </View>
    )
  }

  renderContent = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                  Style.phoneNumber,
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onPhoneChange}
                returnKeyType={'next'}
                onSubmitEditing={() => { this.passwordTextInput.focus() }}
                blurOnSubmit={false}
              />
              <TextInput
                ref={(input) => { this.passwordTextInput = input; }}
                secureTextEntry={true}
                placeholder='Пароль'
                value={this.state.password}
                placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
                style={[
                  Style.inputText,
                  Style.password,
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onPasswordChange}
                returnKeyType={'next'}
                onSubmitEditing={() => { this.confirmPasswordTextInput.focus() }}
                blurOnSubmit={false}
              />
              <TextInput
                ref={(input) => { this.confirmPasswordTextInput = input; }}
                secureTextEntry={true}
                placeholder='Повторите пароль'
                value={this.state.confirmPassword}
                placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
                style={[
                  Style.inputText,
                  Style.passwordRepeat,
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onConfirmPasswordChange}
                onSubmitEditing={() => Keyboard.dismiss()}
                blurOnSubmit={false}
              />
              <View style={[
                Style.inputSize,
                Style.buttonsContainer]}>
                <View style={Style.buttonMargin}>
                  <ButtonWithoutFeedback
                    text='Зарегистрироваться'
                    style={this.props.style}
                    disabled={!this.isValidData()}
                    borderRadius={5}
                    onPress={this.confirmPhoneNumber}
                  />
                </View>
              </View>
            </View>
            <Confirm
              title={'Подтвердите номер телефона'}
              message={this.getMessageForConfirm()}
              style={this.props.style}
              toggle={this.state.toggleConfirm}
              confirm={this.confirmSuccess}
              cancel={this.confirmCancel}
            />
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
    isLogin: state.user.isLogin,
    isFetching: state.user.isFetching,
    isFetchError: state.user.isFetchError,
    errorMessage: state.user.errorMessage,
    user: state.user,
    cities: state.location.cities,
    isFetchingMainData: state.main.isFetching,
    categories: state.main.categories,
    style: state.style,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    appPackageName: state.appSetting.appPackageName,
  }
}

const mapDispatchToProps = {
  registrationUser,
  dropFetchFlag,
  getMainData,
  getLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegistrationScreen)

