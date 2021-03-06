import React from 'react'
import { KeyboardAvoidingView, TextInput, View, InputAccessoryView, Platform, Keyboard } from 'react-native'
import { SendButton } from '../../components/buttons/Square/SendButton'
import Style from './style'

export class MessageInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  componentDidMount = () => this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.keyboardDidHide())
  componentWillUnmount = () => this.keyboardDidHideListener.remove();

  onChangeText = text => this.setState({ text: text })

  isValidMsg = () => this.state.text.trim().replace(/\r/g, '').replace(/\n/g, '').length > 0

  keyboardDidHide() {
    if (!this.isValidMsg())
      this.setState({ text: '' })
  }

  onPress = () => {
    if (this.props.onPressButton)
      this.props.onPressButton(this.state.text)

    this.setState({ text: '' })
  }

  renderIOS = () => {
    return (
      <InputAccessoryView>
        {this.renderAndroid()}
      </InputAccessoryView>
    )
  }

  renderAndroid = () => {
    return (
      <KeyboardAvoidingView
        behavior={'height'}
        enabled
        style={[
          Style.keywordAvoidReviewInput,
          this.props.style.theme.dividerColor,
          this.props.style.theme.navigationBottom
        ]}>
        <View style={[
          Style.inputReview,
          this.props.style.theme.navigationBottom
        ]}>
          <TextInput
            multiline={true}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              this.props.textSize,
              Style.inputText,
              this.props.style.theme.dividerColor,
              this.props.style.theme.navigationBottom,
              this.props.style.theme.primaryTextColor]}
            onChangeText={this.onChangeText}
            value={this.state.text}
          />
          <SendButton
            disabled={!this.isValidMsg()}
            underlayColor={this.props.style.theme.navigationBottom.backgroundColor}
            onPress={this.onPress}
            size={this.props.buttonSize}
            nonBorder={true}
            color={
              this.isValidMsg() ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.secondaryTextColor.color
            }
          />
        </View>
      </KeyboardAvoidingView>
    )
  }

  render = () => Platform.OS == 'ios' ? this.renderIOS() : this.renderAndroid()
}