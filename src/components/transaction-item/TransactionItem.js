import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Style from './style'

export class TransactionItem extends React.Component {

  onPress = () => this.props.onPress && this.props.onPress(this.props.id)

  render() {
    return (
      <TouchableHighlight
        underlayColor={this.props.style.theme.backdoor.backgroundColor}
        onPress={this.onPress}
      >
        <View style={Style.container}>
          <View
            style={[
              Style.content,
              this.props.style.theme.dividerColor
            ]}>

            <View style={Style.textContainer}>
              <Text
                style={[
                  this.props.style.theme.primaryTextColor,
                  this.props.style.fontSize.h6,

                ]}
              >
                {this.props.headerText}
              </Text>
              <Text
                style={[
                  this.props.style.theme.secondaryTextColor,
                  this.props.style.fontSize.h9,
                  Style.text
                ]}
              >
                {this.props.text}
              </Text>
            </View>

            <View style={Style.arrowContainer}>

            </View>

          </View>

        </View>
      </TouchableHighlight>
    )
  }
}