import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import Ruble from '../../images/font-awesome-svg/ruble-sign.svg'
import { getSVGColor } from '../../helpers/color-helper'

export class ViewMoneyBlock extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.navigationHeader,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Style.mainTextContainer}>
          <Text
            style={[
              Style.textBottom,
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h0,
            ]}>
            {this.props.mainText}
            <Ruble
              style={Style.iconMargin}
              key={new Date().getTime().toString()}
              width={this.props.style.fontSize.h2.fontSize}
              height={this.props.style.fontSize.h2.fontSize}
              color={getSVGColor(this.props.style.theme.textPrimaryColor.color)} />
          </Text>
        </View>
        <View style={Style.secondTextContainer}>
          <Text
            style={[
              Style.textBottom,
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h9,
            ]}>
            {this.props.secondText}
          </Text>
        </View>
      </View>
    )
  }
}