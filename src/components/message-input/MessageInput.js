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
          this.props.style.theme.navigationBottom
        ]}>
        <View style={[
          Styles.inputReview,
          this.props.style.theme.navigationBottom
        ]}>
          <TextInput
            multiline={true}
            placeholder={this.props.placeholder}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              this.props.textSize,
              Styles.inputText,
              this.props.style.theme.dividerColor,
              this.props.style.theme.navigationBottom,
              this.props.style.theme.primaryTextColor]}
            onChangeText={this.onChangeText}
            value={this.state.text}
          />
          <SendButton
            underlayColor={this.props.style.theme.navigationBottom.backgroundColor}
            onPress={this.onPress}
            size={this.props.buttonSize}
            nonBorder={true}
            color={
              this.state.text.trim().replace(/\r/g, '').replace(/\n/g, '').length > 0 ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.secondaryTextColor.color
            }
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}