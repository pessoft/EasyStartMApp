import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Style from './style'
import { getSVGColor } from '../../helpers/color-helper'
import AngleRightIcon from '../../images/font-awesome-svg/angle-right.svg'

export class MenuItem extends React.Component {

  renderIcon = () => {
    const Icon = this.props.icon

    return <Icon
      key={new Date().getTime().toString()}
      width={25}
      height={25}
      color={getSVGColor(this.props.style.theme.accentOther.backgroundColor)} />
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={this.props.style.theme.backdoor.backgroundColor}
        onPress={this.props.onPress}
      >
        <View style={Style.container}>
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
                  this.props.style.fontSize.h7
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