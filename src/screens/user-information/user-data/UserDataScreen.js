import React from 'react'
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  View,
  Animated,
  ActivityIndicator,
  Text
} from 'react-native'
import { SET_CITY } from '../../../navigation/pointsNavigate'
import {
  setUserEmail,
  setUserName,
  dropSuccessClientUpdateDataFlag,
  updateUser,
  dropFetchFlag,
  setDateBirth
} from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { showMessage } from "react-native-flash-message"
import { ButtonWithoutFeedback } from '../../../components/buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'
import { toStringDate } from '../../../helpers/work-time'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { DatePickerBirthday } from '../../../components/raw-bottom-sheets/date-picker-birthday/DatePickerBirthday'

class UserDataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Информация о Вас',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      toggleDatepicker: false
    }
  }

  componentDidMount() {
    this.props.dropSuccessClientUpdateDataFlag()
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {
    if (this.props.isFetchUserError) {
      this.showErrMessage()
    } else if (this.props.isSuccessClientUpdateData) {
      this.onNextPage()
    }

    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
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
  onEmailChange = email => this.props.setUserEmail(email.trim())

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
      dateBirth: this.props.user.dateBirth
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

  closeDatepicker = () => this.setState({ toggleDatepicker: false })
  setDateBirth = dateBirth => {
    if (dateBirth) {
      this.closeDatepicker()
      this.props.setDateBirth(dateBirth)
    }
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
            <View style={Style.mainContainer}>
              <TextInput
                placeholder='Ваше имя'
                value={this.props.userName}
                placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
                style={[
                  Style.inputText,
                  Style.mr_bt_0,
                  Style.b_bt_w_0,
                  Style.b_bt_l_r_0,
                  Style.b_bt_r_r_0,
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onUserNameChange}
                returnKeyType={'next'}
                onSubmitEditing={() => { this.secondTextInput.focus() }}
                blurOnSubmit={false}
              />

              {
                this.props.dateBirth &&
                <View style={[
                  Style.dateBirth,
                  this.props.style.fontSize.h8,
                  Style.inputSize,
                  Style.inputText,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor,
                  Style.b_bt_w_0,
                  Style.b_r_0,
                  Style.mr_bt_0,
                ]}>
                  <SimpleTextButton
                    text={toStringDate(this.props.dateBirth)}
                    onPress={() => this.setState({ toggleDatepicker: true })}
                    sizeText={this.props.style.fontSize.h9.fontSize}
                    color={this.props.style.theme.primaryTextColor.color}
                    margin={10}
                  />
                </View>
              }

              <TextInput
                ref={(input) => { this.secondTextInput = input; }}
                placeholder='Введите e-mail'
                value={this.props.email}
                placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
                style={[
                  Style.inputText,
                  Style.mr_tp_0,
                  Style.b_tp_l_r_0,
                  Style.b_tp_r_r_0,
                  this.props.dateBirth ? {} : {},
                  Style.inputSize,
                  this.props.style.fontSize.h8,
                  this.props.style.theme.primaryTextColor,
                  this.props.style.theme.dividerColor]}
                onChangeText={this.onEmailChange}
                onSubmitEditing={() => { this.referralCodeInput.focus() }}
                blurOnSubmit={false}
              />
              <View style={[
                Style.inputSize,
                Style.buttonNext]}>
                <ButtonWithoutFeedback
                  text='Далее'
                  onPress={this.onUpdateUserData}
                  disabled={!this.isValidData()}
                  style={this.props.style}
                  borderRadius={5}
                />
              </View>
            </View>
            <View style={Style.secondaryContainer}>
              {
                !this.props.dateBirth &&
                <SimpleTextButton
                  text='Добавить дату рождения'
                  onPress={() => this.setState({ toggleDatepicker: true })}
                  sizeText={this.props.style.fontSize.h9.fontSize}
                  color={this.props.style.theme.primaryTextColor.color}
                  margin={10}
                />
              }
            </View>
            <DatePickerBirthday
              style={this.props.style}
              toggle={this.state.toggleDatepicker}
              date={this.props.dateBirth}
              onClose={this.closeDatepicker}
              onDone={this.setDateBirth}
            />
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
    dateBirth: state.user.dateBirth,
    user: state.user,
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
  dropSuccessClientUpdateDataFlag,
  updateUser,
  dropFetchFlag,
  setDateBirth
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDataScreen)

