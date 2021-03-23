import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Style from './style'
import { getSVGColor } from '../../helpers/color-helper'
import AngleRightIcon from '../../images/font-awesome-svg/angle-right.svg'

export class MenuItemTwoTextImage extends React.Component {

  onPress = () => this.props.onPress && this.props.onPress(this.props.id)

  renderIcon = () => {
    const Icon = this.props.icon

    return <Icon
      key={new Date().getTime().toString()}
      width={25}
      height={25}
      color={getSVGColor(this.props.iconColor)} />
  }

  render() {
    return (
      <TouchableHighlight
        style={Style.bodyItem}
        underlayColor={this.props.style.theme.backdoor.backgroundColor}
        onPress={this.onPress}
      >
        <View style={[
          Style.container,
          this.props.style.theme.backdoor,
          this.props.style.theme.shadowColor,
        ]}>

          <View style={Style.image}>
            {this.renderIcon()}
          </View>

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
              <AngleRightIcon
                key={new Date().getTime().toString()}
                width={28}
                height={28}
                color={getSVGColor(this.props.style.theme.secondaryTextColor.color)} />
            </View>

          </View>

        </View>
      </TouchableHighlight>
    )
  }
}