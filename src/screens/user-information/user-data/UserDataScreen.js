import React from 'react'
import { connect } from 'react-redux'
import {
  KeyboardAvoidingView,
  TextInput,
  Button,
  View,
  Animated,
  Dimensions
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { SET_CITY } from '../../../navigation/pointsNavigate'
import { setPhoneNumber, setUserName } from '../../../store/user/actions'
import Styles from './style'
import { springAnimation } from '../../../animation/springAnimation'

const { width } = Dimensions.get('window')

class UserDataScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Информация о Вас',
  }

  constructor(props) {
    super(props)

    this.state = {
      xValue: new Animated.Value(width - 100)
    }
  }

  componentDidMount() {
    springAnimation(this.state.xValue, 0, 0)
  }

  onPhoneChange = phone => {
    this.props.setPhoneNumber(phone)
  }

  onUserNameChange = userName => {
    this.props.setUserName(userName)
  }

  onNextPage = () => {
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
      <KeyboardAvoidingView style={Styles.screen} behavior='height'>
        <Animated.View style={{ left: this.state.xValue }}>
          <TextInput
            placeholder='Ваше имя'
            value={this.props.userName}
            style={[
              Styles.inputText,
              Styles.inputSize,
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
            keyboardType='phone-pad'
            placeholder='+7(999)999-99-99'
            type={'custom'}
            options={{ mask: '+9(999)999-99-99' }}
            value={this.props.phoneNumber}
            style={[
              Styles.inputText,
              Styles.inputSize,
              this.props.style.fontSize.h7,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onPhoneChange}
          />
          <View style={[
            Styles.inputSize,
            Styles.buttonNext]}>
            <Button
              title='Далее'
              onPress={this.onNextPage}
              disabled={!this.isValidData()}
              color={this.props.style.theme.defaultPrimaryColor.backgroundColor}
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
    style: state.style
  }
}

export default connect(mapStateToProps, { setPhoneNumber, setUserName })(UserDataScreen)

