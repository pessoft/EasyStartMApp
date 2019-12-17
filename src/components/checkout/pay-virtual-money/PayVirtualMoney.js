import React from 'react'
import {
  View,
  Text,
  Button,
  Platform
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Style from './style'

export class PayVirtualMoney extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentValue: 0
    }
  }

  getValuePayCashback = () => {
    let value = 0

    if (this.props.availableVirtualMoney > 0
      && this.props.setting.IsUseCashback) {
      let paymentValue = this.props.toPay * this.props.setting.PaymentValue / 100

      if (paymentValue <= this.props.availableVirtualMoney)
        value = paymentValue
      else
        value = this.props.availableVirtualMoney
    }

    this.setState({ paymentValue: value })

    return value
  }

  onApplyAmountPayCashBack = () => {
    const payCashback = this.getValuePayCashback()

    this.changeAmountPayCashBack(payCashback)
  }

  onCancelAmountPayCashBack = () => {
    this.setState({ paymentValue: 0 }, () => this.changeAmountPayCashBack(0))
  }

  changeAmountPayCashBack = value => {
    if (this.props.onChangeAmountPayCashBack)
      this.props.onChangeAmountPayCashBack(value)
  }

  renderCancel = () => {
    return (
      <React.Fragment>
        <Text style={[
          this.props.style.fontSize.h8,
          this.props.style.theme.primaryTextColor,
        ]}>
          {`-${this.state.paymentValue}`}
        </Text>
        <Button
          title='Отменить'
          onPress={this.onCancelAmountPayCashBack}
          color={Platform.OS == 'ios' ?
            this.props.style.theme.accentOther.backgroundColor :
            this.props.style.theme.darkPrimaryColor.backgroundColor} />
      </React.Fragment>
    )
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
            Оплата бонусами
          </Text>
        </View>
        <View style={Style.content}>
          {/* {
            this.state.paymentValue == 0 &&
            <Button
              title='Оплатить'
              onPress={this.onApplyAmountPayCashBack}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.darkPrimaryColor.backgroundColor} />
          } */}
          {
            this.state.paymentValue == 0 &&
            this.renderCancel()
          }
        </View>
      </View>
    )
  }
}