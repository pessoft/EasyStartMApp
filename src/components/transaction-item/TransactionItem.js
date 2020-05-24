import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { PromotionTransactionType } from '../../logic/promotion/promotion-transaction-type'
import CurrencyIcon from '../currency-icon/CurrencyIconConnect'

export class TransactionItem extends React.Component {

  constructor(props) {
    super(props)

    this.HEADER_MAX_LENGTH = 25
  }

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

  formatStringMoneyByTransactionType = money => {
    switch (this.props.transactionType) {
      case PromotionTransactionType.Income:
        return `+${money}`
      default:
        return `${money}`
    }
  }

  getHeaderFontSize = () => {
    if (this.props.headerText
      && this.props.headerText.length > this.HEADER_MAX_LENGTH) {
      return this.props.style.fontSize.h9.fontSize
    }

    return this.props.style.fontSize.h7.fontSize
  }



  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.shadowColor,
        ]}>
        <View
          style={[
            Style.content,
            this.props.style.theme.dividerColor
          ]}>

          <View style={Style.textContainer}>
            <Text
              style={[
                this.props.style.theme.primaryTextColor,
                { fontSize: this.getHeaderFontSize() }
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
            <View style={Style.priceRow}>
              <Text
                style={[
                  { color: this.getColorByTransactionType() },
                  this.props.style.fontSize.h8
                ]}
              >
                {this.formatStringMoneyByTransactionType(this.props.money)}
              </Text>
              <CurrencyIcon
                style={Style.iconMargin}
                key={new Date().getTime().toString()}
                width={this.props.style.fontSize.h9.fontSize}
                height={this.props.style.fontSize.h9.fontSize}
                color={this.getColorByTransactionType()} />
            </View>
          </View>
        </View>
      </View>
    )
  }
}