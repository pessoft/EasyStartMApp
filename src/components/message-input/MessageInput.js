import React from 'react'
import { KeyboardAvoidingView, TextInput, View } from 'react-native'
import { SendButton } from '../../components/buttons/Square/SendButton'
import Styles from './style'

export class MessageInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }
  }

  onChangeText = text => {
    this.setState({ text: text })
  }

  onPress = () => {
    if (this.props.onPressButton)
      this.props.onPressButton(this.state.text)

    this.setState({ text: '' })
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={'height'}
        style={[
          Styles.keywordAvoidReviewInput,
          this.props.style.theme.dividerColor,
          this.props.style.theme.themeBody
        ]}>
        <View style={[
          Styles.inputReview,
          this.props.style.theme.themeBody
        ]}>
          <TextInput
            multiline={true}
            placeholder={this.props.placeholder}
            style={[
              this.props.textSize,
              Styles.inputText,
              this.props.style.theme.dividerColor,
              this.props.style.theme.themeBody,
              this.props.style.theme.primaryTextColor]}
            onChangeText={this.onChangeText}
            value={this.state.text}
          />
          <SendButton
            underlayColor={this.props.style.theme.themeBody.backgroundColor}
            onPress={this.onPress}
            size={this.props.buttonSize}
            nonBorder={true}
            color={
              this.state.text.trim().replace(/\r/g, '').replace(/\n/g, '').length > 0 ?
                this.props.style.theme.accentColor.backgroundColor :
                this.props.style.theme.secondaryTextColor.color
            }
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}