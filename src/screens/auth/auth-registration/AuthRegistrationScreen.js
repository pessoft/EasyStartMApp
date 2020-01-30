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
import { setPhoneNumber, setUserPassword, registrationUser } from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import UserPhotoDefaultIcon from '../../../images/font-awesome-svg/user-circle.svg'
import { getSVGColor } from '../../../helpers/color-helper'
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
      confirmPassword: ''
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {

  }

  onPhoneChange = phoneNumber => this.setState({ phoneNumber })
  onPasswordChange = password => this.setState({ password })
  onConfirmPasswordChange = confirmPassword => this.setState({ confirmPassword })

  registration = () => this.props.registrationUser({
    PhoneNumber: this.state.phoneNumber,
    Password: this.state.password
  })

  isValidData = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.state.phoneNumber.match(regexp)
      && this.state.password
      && this.state.password.length > 3
      && this.state.password == this.state.confirmPassword)
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
                Style.inputSize,
                this.props.style.fontSize.h7,
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
                Style.inputSize,
                this.props.style.fontSize.h7,
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
                <Button
                  title='Зарегистрироваться'
                  onPress={this.registration}
                  disabled={!this.isValidData()}
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
    clientId: state.user.clientId,
    style: state.style
  }
}

const mapDispatchToProps = {
  registrationUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegistrationScreen)

