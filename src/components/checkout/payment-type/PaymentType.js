import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { PaymentRadioGroup } from './PaymentRadioGroup'
import { CheckoutCashback } from '../checkout-cashback/CheckoutCashback'
import { TypePayment } from '../../../helpers/type-payment'

export class PaymentType extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentType: props.initValue,
      needCashBack: false,
      cashBack: 0
    }
  }

  onChangePaymentType = paymentType => {
    this.setState({
      paymentType: paymentType,
      needCashBack: false,
      cashBack: 0
    }, () => this.changePaymentData())
  }

  changePaymentData = () => {
    if (this.props.changePaymentData)
      this.props.changePaymentData({
        paymentType: this.state.paymentType,
        needCashBack: this.state.needCashBack,
        cashBack: this.state.cashBack
      })
  }

  onChangeCashBack = data => {
    this.setState({
      needCashBack: data.needCashBack,
      cashBack: data.cashBack
    }, () => this.changePaymentData())
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Способ оплаты
          </Text>
        </View>
        <View style={Style.content}>
          <PaymentRadioGroup
            style={this.props.style}
            initValue={this.state.paymentType}
            changeRadio={this.onChangePaymentType}
          />
          <CheckoutCashback
            style={this.props.style}
            needCashBackInit={this.state.needCashBack}
            animation={true}
            changeCashBack={this.onChangeCashBack}
            disabled={this.state.paymentType == TypePayment.Card}
          />
        </View>
      </View>
    )
  }
}