import React from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Style from './style'

export class NumberAppliances extends React.Component {
  constructor(props) {
    super(props)
  }

  onChangeNumberAppliances = value => {
    if (this.props.changeNumberAppliances) {
      this.props.changeNumberAppliances(value)
    }
  }

  render() {
    return (
      <View style={[
        Style.contacts,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Количество приборов
          </Text>
        </View>
        <View
          style={Style.content}
        >
          <TextInput
            placeholder='Укажите количество *'
            value={this.props.numberAppliances.toString()}
            keyboardType={"numeric"}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.inputSize,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onChangeNumberAppliances}
          />
        </View>
      </View>
    )
  }
}