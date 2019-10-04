import React from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Style from './style'

export class OrderComment extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commentText: '',
    }
  }

  onCommentTextChange = commentText => this.setState({ commentText }, () => this.onChangeCommentText())

  onChangeCommentText = () => {
    if (this.props.changeCommentText)
      this.props.changeCommentText(this.state)
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.defaultPrimaryColor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.textPrimaryColor,
          ]}>
            Комментарий к заказу
          </Text>
        </View>
        <View
          style={Style.content}
        >
          <TextInput
            placeholder='Комментарий ...'
            value={this.state.commentText}
            multiline={true}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.inputSize,
              this.props.style.fontSize.h8,
              this.props.style.theme.textPrimaryColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onCommentTextChange}
          />
        </View>
      </View>
    )
  }
}