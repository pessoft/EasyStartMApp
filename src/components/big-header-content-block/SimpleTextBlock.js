import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'

export class SimpleTextBlock extends React.Component {

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
            this.props.style.theme.textPrimaryColor,
            this.props.style.fontSize.h0,
          ]}>
          {this.props.mainText}
        </Text>
        <Text
          style={[
            Style.secondText,
            this.props.style.theme.textPrimaryColor,
            this.props.style.fontSize.h9,
          ]}>
          {this.props.secondText}
        </Text>
      </View>
    )
  }
}