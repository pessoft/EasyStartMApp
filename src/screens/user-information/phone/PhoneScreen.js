import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TextInput, Button, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { SET_CITY } from '../../../navigation/pointsNavigate'
import { setPhoneNumber } from '../../../store/user/actions'
import Styles from './style'

class PhoneScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Введите номер телефона',
  }

  onPhoneChange = phone => {
    this.props.setPhoneNumber(phone)
  }

  onNextPage = () => {
    this.props.navigation.navigate(SET_CITY)
  }

  isValidPhoneNumber = () => {
    const regexp = /\+7[(]\d{3}\)\d{3}-\d{2}-\d{2}$/

    if (this.props.phoneNumber.match(regexp))
      return true

    return false
  }

  render() {
    return (
      <KeyboardAvoidingView style={Styles.screen} behavior='height'>
        <TextInputMask
          keyboardType='phone-pad'
          placeholder='+7(999)999-99-99'
          type={'custom'}
          options={{ mask: '+9(999)999-99-99' }}
          value={this.props.phoneNumber}
          style={[
            Styles.inputPhoneNumber,
            Styles.inputSize,
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor]}
          onChangeText={this.onPhoneChange}
        />
        <View style={Styles.inputSize}>
          <Button
            title='Далее'
            onPress={this.onNextPage}
            disabled={!this.isValidPhoneNumber()}
            color={this.props.style.theme.defaultPrimaryColor.backgroundColor}
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.user.phoneNumber,
    style: state.style
  }
}

export default connect(mapStateToProps, { setPhoneNumber })(PhoneScreen)

