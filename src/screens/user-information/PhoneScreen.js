import React from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TextInput, Button, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { SET_CITY } from '../../navigation/pointsNavigate'
import { setPhoneNumber } from '../../store/user/actions'
import Styles from './phoneScreenStyle'

class PhoneScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Введите номер телефона',
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  }

  onPhoneChange = phone => {
    this.props.setPhoneNumber(phone)
  }

  onNextPage = () => {
    this.props.navigation.navigate(SET_CITY)
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
          style={Styles.inputNormalSize, Styles.textCenter, Styles.mb_10}
          onChangeText={this.onPhoneChange}
        />
        <View style={Styles.inputNormalSize}>
          <Button title='Далее' onPress={this.onNextPage} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => {
  return {
    phoneNumber: state.user.phoneNumber,
  }
}

export default connect(mapStateToProps, { setPhoneNumber })(PhoneScreen)

