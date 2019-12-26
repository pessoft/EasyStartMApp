import React from 'react'
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  TextInput,
  Button,
  View,
  Animated,
  Dimensions,
  Platform
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { SET_CITY } from '../../../navigation/pointsNavigate'
import { setPhoneNumber, setUserName, setParentReferralCode, resetClientId } from '../../../store/user/actions'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'

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
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  onPhoneChange = phone => this.props.setPhoneNumber(phone)
  onUserNameChange = userName => this.props.setUserName(userName)
  onParentReferralCodeChange = referralCode => this.props.setParentReferralCode(referralCode)

  onNextPage = () => {
    this.props.resetClientId()
    this.props.navigation.navigate(SET_CITY)
  }

  isValidData = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.props.phoneNumber.match(regexp)
      && this.props.userName)
      return true

    return false
  }

  render() {
    return (
      <KeyboardAvoidingView style={Style.screen} behavior='height'>
        <Animated.View style={{
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
          <TextInputMask
            refInput={(input) => { this.secondTextInput = input; }}
            keyboardType={'phone-pad'}
            placeholder={'+7(999)999-99-99'}
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
              onPress={this.onNextPage}
              disabled={!this.isValidData()}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.primaryTextColor.color :
                this.props.style.theme.defaultPrimaryColor.backgroundColor}
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.user.phoneNumber,
    userName: state.user.userName,
    parentReferralClientId: state.user.parentReferralClientId,
    parentReferralCode: state.user.parentReferralCode,
    style: state.style
  }
}

const mapDispathToProps = {
  setPhoneNumber,
  setUserName,
  setParentReferralCode,
  resetClientId
}

export default connect(mapStateToProps, mapDispathToProps)(UserDataScreen)

