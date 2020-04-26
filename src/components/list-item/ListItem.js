import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Style from './style'
import { getSVGColor } from '../../helpers/color-helper'
import AngleRightIcon from '../../images/font-awesome-svg/angle-right.svg'

export class ListItem extends React.Component {

  renderIcon = () => {
    const Icon = this.props.icon

    return <Icon
      key={new Date().getTime().toString()}
      width={22}
      height={22}
      color={getSVGColor(this.props.style.theme.secondaryTextColor.color)} />
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          Style.bodyItem,
        ]}
        onPress={this.props.onPress}
      >
        <View style={[
          Style.container,
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
                  this.props.style.fontSize.h8
                ]}
              >
                {this.props.text}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}