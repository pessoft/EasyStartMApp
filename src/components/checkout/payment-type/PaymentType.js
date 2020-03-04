import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { PaymentRadioGroup } from './PaymentRadioGroup'
import { CheckoutCashback } from '../checkout-cashback/CheckoutCashback'
import { TypePayment } from '../../../helpers/type-payment'
import SwitchSelector from "react-native-switch-selector";

export class PaymentType extends React.Component {
  constructor(props) {
    super(props)

    this.setTypePaymentOptions()

    this.state = {
      paymentType: props.initValue,
      needCashBack: false,
      cashBack: 0
    }
  }

  setTypePaymentOptions() {
    this.typePaymentOptions = []

    if (this.props.hasCash)
      this.typePaymentOptions.push({ label: "Наличыми", value: TypePayment.Cash })
    if (this.props.hasCard)
      this.typePaymentOptions.push({ label: "Картой", value: TypePayment.Card })

    this.initValue = this.typePaymentOptions.findIndex(p => p.value == this.props.initValue)

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
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
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
          <SwitchSelector
            options={this.typePaymentOptions}
            initial={this.initValue}
            hasPadding
            height={34}
            buttonMargin={2}
            fontSize={this.props.style.fontSize.h8.fontSize}
            textColor={this.props.style.theme.primaryTextColor.color}
            selectedColor={this.props.style.theme.textPrimaryColor.color}
            backgroundColor={this.props.style.theme.backdoor.backgroundColor}
            buttonColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
            borderColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
            onPress={this.onChangePaymentType}
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