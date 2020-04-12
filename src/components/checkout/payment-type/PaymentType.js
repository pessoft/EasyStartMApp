import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import Style from './style'
import { PaymentRadioGroup } from './PaymentRadioGroup'
import { CheckoutCashback } from '../checkout-cashback/CheckoutCashback'
import { TypePayment } from '../../../helpers/type-payment'
import SwitchSelector from "react-native-switch-selector";
const min320 = Dimensions.get('window').width <= 320

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
    this.typePaymentOptions = [
      { label: "Наличыми", value: TypePayment.Cash },
      { label: "Картой", value: TypePayment.Card },
    ]

    if (this.props.hasOnlinePay) {
      this.typePaymentOptions.push({ label: "Онлайн", value: TypePayment.OnlinePay })
    }

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

  isAllAllowTypes = () => this.props.hasCash && this.props.hasCard

  getFontSize = () => {
    if (this.props.hasCard &&
      this.props.hasCash &&
      this.hasOnlinePay) {
        if (min320)
          return this.props.style.fontSize.h10.fontSize
        else
          return this.props.style.fontSize.h9.fontSize
    } else
      return this.props.style.fontSize.h8.fontSize
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
            disabled={!this.isAllAllowTypes()}
            options={this.typePaymentOptions}
            initial={this.initValue}
            height={34}
            borderRadius={3}
            fontSize={this.getFontSize()}
            textColor={this.isAllAllowTypes() ? this.props.style.theme.primaryTextColor.color : this.props.style.theme.secondaryTextColor.color}
            selectedColor={this.props.style.theme.textPrimaryColor.color}
            backgroundColor={this.props.style.theme.backdoor.backgroundColor}
            buttonColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
            style={{ marginBottom: 5, borderWidth: 1, borderRadius: 4, borderColor: this.props.style.theme.darkPrimaryColor.backgroundColor }}
            onPress={this.onChangePaymentType}
          />
          <CheckoutCashback
            style={this.props.style}
            needCashBackInit={this.state.needCashBack}
            animation={true}
            changeCashBack={this.onChangeCashBack}
            disabled={this.state.paymentType != TypePayment.Cash}
          />
        </View>
      </View>
    )
  }
}