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
import { restoreUserPassword } from '../../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../../animation/timingAnimation'
import UserPhotoDefaultIcon from '../../../../images/font-awesome-svg/user-lock.svg'
import { getSVGColor } from '../../../../helpers/color-helper'
import { AUTH_RESTORE_PASSWORD_SUCCESS } from '../../../../navigation/pointsNavigate'

const { width } = Dimensions.get('window')

class AuthRestorePasswordScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Восстановление пароля',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      email: '',
    }
  }

  componentDidMount() {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate() {
    if (this.props.isNotifyAboutRestorePassword) {
      this.goToRestorePasswordSuccessPage()
    } else if (!this.props.isFetching) {
      timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }
  }

  goToRestorePasswordSuccessPage = () => this.props.navigation.navigate(AUTH_RESTORE_PASSWORD_SUCCESS)
  onEmailChange = email => this.setState({ email })

  restoreUserPassword = () => this.props.restoreUserPassword(this.state.email)

  isValidData = () => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(this.state.email).toLowerCase())
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
            <UserPhotoDefaultIcon
              width={90} height={90}
              style={Style.loginIcon}
              color={getSVGColor(this.props.style.theme.primaryTextColor.color)}
            />
            <TextInput
              placeholder='Введите e-mail'
              value={this.state.email}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSize,
                this.props.style.fontSize.h7,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onEmailChange}
            />
            <View style={[
              Style.inputSize,
              Style.buttonsContainer]}>
              <View style={Style.buttonMargin}>
                <Button
                  title='Восстановить пароль'
                  onPress={this.restoreUserPassword}
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

  render() {
    if (this.props.isFetching) {
      return this.renderLoader()
    } else {
      return this.renderContent()
    }
  }
}

const mapStateToProps = state => {
  return {
    isNotifyAboutRestorePassword: state.user.isNotifyAboutRestorePassword,
    isFetching: state.user.isFetching,
    style: state.style
  }
}

const mapDispatchToProps = {
  restoreUserPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRestorePasswordScreen)

