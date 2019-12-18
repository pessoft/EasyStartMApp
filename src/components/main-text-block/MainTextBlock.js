import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'


export class MainTextBlock extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.navigationHeader,
        this.props.style.theme.dividerColor
        ]}>
        <Text
          style={[
            Style.mainText,
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h0,
          ]}>
          3b4a27
       </Text>
        <Text
          style={[
            Style.secoderText,
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h9,
          ]}>
          Ваш реферальный код
       </Text>
      </View>
    )
  }
}