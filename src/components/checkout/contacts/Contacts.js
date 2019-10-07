import React from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Style from './style'

export class Contacts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: props.userName,
      phoneNumber: props.phoneNumber
    }
  }

  onPhoneChange = phoneNumber => this.setState({ phoneNumber }, () => this.onChangeUserContacts())
  onUserNameChange = userName => this.setState({ userName }, () => this.onChangeUserContacts())

  onChangeUserContacts = () => {
    if (this.props.changeContacts)
      this.props.changeContacts({
        userName: this.state.userName,
        phoneNumber: this.state.phoneNumber
      })
  }

  render() {
    return (
      <View style={[
        Style.contacts,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Контактные данные
          </Text>
        </View>
        <View
          style={Style.content}
        >
          <TextInput
            placeholder='Ваше имя'
            value={this.state.userName}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.inputSize,
              this.props.style.fontSize.h8,
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
            value={this.state.phoneNumber}
            style={[
              Style.inputText,
              Style.inputSize,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onPhoneChange}
          />
        </View>
      </View>
    )
  }
}