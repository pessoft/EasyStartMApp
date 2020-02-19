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
import { SET_CITY } from '../../../navigation/pointsNavigate'
import { setUserEmail, setUserName, setParentReferralCode, dropSuccessClientUpdateDataFlag, updateUser, dropFetchFlag } from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { showMessage } from "react-native-flash-message"

const { width } = Dimensions.get('window')

class UserDataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Информация о Вас',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.props.dropSuccessClientUpdateDataFlag()
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {
    if (this.props.isFetchUserError) {
      this.showErrMessage()
      timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    } else if (this.props.isSuccessClientUpdateData) {
      this.onNextPage()
    }
  }

  showErrMessage = () => {
    if (!this.props.isFetchUserError)
      return

    showMessage({
      message: this.props.errorMessage,
      type: "danger",
    });
    this.props.dropFetchFlag()
  }

  onUserNameChange = userName => this.props.setUserName(userName)
  onParentReferralCodeChange = referralCode => this.props.setParentReferralCode(referralCode)
  onEmailChange = email => this.props.setUserEmail(email)

  onNextPage = () => this.props.navigation.navigate(SET_CITY)

  onUpdateUserData = () => {
    const userData = {
      id: this.props.clientId,
      phoneNumber: this.props.user.phoneNumber,
      password: this.props.user.password,
      cityId: this.props.user.cityId,
      branchId: this.props.user.branchId,
      email: this.props.user.email,
      userName: this.props.user.userName,
      parentReferralClientId: this.props.user.parentReferralClientId,
      parentReferralCode: this.props.user.parentReferralCode,
    }

    this.props.updateUser(userData)
  }

  isEmailValid = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(this.props.email).toLowerCase())
  }

  isValidData = () => {
    if (this.isEmailValid()
      && this.props.userName)
      return true

    return false
  }

  renderLoader() {
    return (
      <View style={Style.centerScreen}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </View>
    )
  }

  renderScreen = () => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={Style.screen} behavior='height'>

          <Animated.View
            style={{
              opacity: this.state.showScaleAnimation,
              transform: [{ scale: this.state.showScaleAnimation }]
            }}>
            <TextInput
              placeholder='Ваше имя'
              value={this.props.userName}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onUserNameChange}
              returnKeyType={'next'}
              onSubmitEditing={() => { this.secondTextInput.focus() }}
              blurOnSubmit={false}
            />
            <TextInput
              ref={(input) => { this.secondTextInput = input; }}
              placeholder='Введите e-mail'
              value={this.props.email}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onEmailChange}
              onSubmitEditing={() => { this.referralCodeInput.focus() }}
              blurOnSubmit={false}
            />
            <TextInput
              ref={(input) => { this.referralCodeInput = input; }}
              placeholder='Реферальный код'
              value={this.props.parentReferralCode}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onParentReferralCodeChange}
            />
            <View style={[
              Style.inputSize,
              Style.buttonNext]}>
              <Button
                title='Далее'
                onPress={this.onUpdateUserData}
                disabled={!this.isValidData()}
                color={Platform.OS == 'ios' ?
                  this.props.style.theme.primaryTextColor.color :
                  this.props.style.theme.defaultPrimaryColor.backgroundColor}
              />
            </View>
          </Animated.View>

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    if (this.props.isFetchingUser)
      return this.renderLoader()
    else
      return this.renderScreen()
  }
}

const mapStateToProps = state => {
  return {
    email: state.user.email,
    userName: state.user.userName,
    user: state.user,
    parentReferralClientId: state.user.parentReferralClientId,
    parentReferralCode: state.user.parentReferralCode,
    style: state.style,
    isFetchingUser: state.user.isFetching,
    isFetchUserError: state.user.isFetchError,
    errorMessage: state.user.errorMessage,
    isSuccessClientUpdateData: state.user.isSuccessClientUpdateData,
  }
}

const mapDispatchToProps = {
  setUserEmail,
  setUserName,
  setParentReferralCode,
  dropSuccessClientUpdateDataFlag,
  updateUser,
  dropFetchFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDataScreen)

