import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import Ruble from '../../images/font-awesome-svg/ruble-sign.svg'
import { getSVGColor } from '../../helpers/color-helper'
import { PromotionTransactionType } from '../../logic/promotion/promotion-transaction-type'

export class TransactionItem extends React.Component {

  getColorByTransactionType = () => {
    switch (this.props.transactionType) {
      case PromotionTransactionType.Income:
        return this.props.style.theme.successTextColor.color
      case PromotionTransactionType.Expense:
        return this.props.style.theme.errorTextColor.color
      default:
        return this.props.style.theme.secondaryTextColor.color
    }
  }

  render() {
    return (
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

          <View style={Style.amountMoneyContainer}>
            <Text
              style={[
                { color: this.getColorByTransactionType() },
                this.props.style.fontSize.h7,
                Style.amountMoney
              ]}
            >
              {this.props.money}
              <Ruble
                style={Style.iconMargin}
                key={new Date().getTime().toString()}
                width={this.props.style.fontSize.h9.fontSize}
                height={this.props.style.fontSize.h9.fontSize}
                color={getSVGColor(this.getColorByTransactionType())} />
            </Text>
          </View>

        </View>
      </View>
    )
  }
}