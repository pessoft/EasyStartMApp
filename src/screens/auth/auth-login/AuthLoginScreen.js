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
  Platform
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { SET_CITY } from '../../../navigation/pointsNavigate'
import { setPhoneNumber, setUserPassword, login } from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import UserPhotoDefaultIcon from '../../../images/font-awesome-svg/user-circle.svg'
import { getSVGColor } from '../../../helpers/color-helper'
const { width } = Dimensions.get('window')

class AuthLoginScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Вход в аккаунт',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {

  }

  onPhoneChange = phone => this.props.setPhoneNumber(phone)
  onPasswordChange = password => this.props.setUserPassword(password)

  login = () => this.props.login({
    PhoneNumber: this.props.phoneNumber,
    Password: this.props.password
  })

  isValidData = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.props.phoneNumber.match(regexp)
      && this.props.password)
      return true

    return false
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView style={Style.screen} behavior='height'>

          <Animated.View
            style={[Style.screen,
            {
              opacity: this.state.showScaleAnimation,
              transform: [{ scale: this.state.showScaleAnimation }]
            }]}>
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
              options={{ mask: '+9(999)999-99-99' }}
              value={this.props.phoneNumber}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
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
              value={this.props.password}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onUserNameChange}
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={false}
            />
            <View style={[
              Style.inputSize,
              Style.buttonsContainer]}>
              <View style={Style.buttonMargin}>
                <Button
                  title='Войти'
                  onPress={this.login}
                  disabled={!this.isValidData()}
                  color={Platform.OS == 'ios' ?
                    this.props.style.theme.primaryTextColor.color :
                    this.props.style.theme.defaultPrimaryColor.backgroundColor}
                />
              </View>
              <View style={Style.buttonMargin}>
                <Button
                  title='Зарегистрироваться'
                  // onPress={this.onNextPage}
                  color={Platform.OS == 'ios' ?
                    this.props.style.theme.primaryTextColor.color :
                    this.props.style.theme.defaultPrimaryColor.backgroundColor}
                />
              </View>
              <View style={Style.buttonMargin}>
                <Button
                  title='Восстановить пароль'
                  // onPress={this.onNextPage}
                  color={Platform.OS == 'ios' ?
                    this.props.style.theme.primaryTextColor.color :
                    this.props.style.theme.defaultPrimaryColor.backgroundColor}
                />
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    isFetching: state.user.isFetching,
    phoneNumber: state.user.phoneNumber,
    password: state.user.password,
    style: state.style
  }
}

const mapDispatchToProps = {
  setPhoneNumber,
  setUserPassword,
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginScreen)

