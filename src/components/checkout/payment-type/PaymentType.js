import React from 'react'
import { View, Text } from 'react-native'
import Styles from './style'
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
    },
      () => {
        if (this.props.changePaymentType)
          this.props.changePaymentType(this.state.paymentType)
      })
  }

  onChangeCashBack = data => {
    this.setState({
      needCashBack: data.needCashBack,
      cashBack: data.cashBack
    })
  }

  render() {
    return (
      <View style={[
        Styles.container,
        this.props.style.theme.defaultPrimaryColor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Styles.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.textPrimaryColor,
          ]}>
            Способ оплаты
          </Text>
        </View>
        <View style={Styles.content}>
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