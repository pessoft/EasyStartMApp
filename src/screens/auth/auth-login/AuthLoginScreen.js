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
import { AUTH_REGISTRATION } from '../../../navigation/pointsNavigate'
import { login } from '../../../store/user/actions'
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
      showScaleAnimation: new Animated.Value(0),
      phoneNumber: '',
      password: '',
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {

  }

  onPhoneChange = phoneNumber => this.setState({ phoneNumber })
  onPasswordChange = password => this.setState({ password })

  login = () => this.props.login({
    PhoneNumber: this.state.phoneNumber,
    Password: this.state.password
  })

  isValidData = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.state.phoneNumber.match(regexp)
      && this.state.password
      && this.state.password.length > 3)
      return true

    return false
  }

  goToRegistrationPage = () => this.props.navigation.navigate(AUTH_REGISTRATION)

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
              options={{ mask: '+7(999)999-99-99' }}
              value={this.state.phoneNumber}
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
              value={this.state.password}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onPasswordChange}
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
                  title='Регистрация'
                  onPress={this.goToRegistrationPage}
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
    style: state.style
  }
}

const mapDispatchToProps = {
  login
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginScreen)
