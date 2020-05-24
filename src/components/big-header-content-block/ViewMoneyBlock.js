import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import CurrencyIcon from '../currency-icon/CurrencyIconConnect'

export class ViewMoneyBlock extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.navigationHeader,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor
      ]}>
        <View style={Style.mainTextContainer}>
          <View style={Style.priceRow}>
            <Text
              style={[
                this.props.style.theme.textPrimaryColor,
                this.props.style.fontSize.h0,
              ]}>
              {this.props.mainText}
            </Text>
            <CurrencyIcon
              style={Style.iconMargin}
              key={new Date().getTime().toString()}
              width={this.props.style.fontSize.h3.fontSize}
              height={this.props.style.fontSize.h3.fontSize}
              color={this.props.style.theme.textPrimaryColor.color} />
          </View>
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