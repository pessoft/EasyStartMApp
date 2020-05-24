import React from 'react'
import {
  View,
  Text,
  Button,
  Platform
} from 'react-native'
import Style from './style'
import { priceValid } from '../../../helpers/utils'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'

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

    return value
  }

  onApplyAmountPayCashBack = () => {
    const payCashback = this.getValuePayCashback()

    this.setState({ paymentValue: payCashback })
    this.changeAmountPayCashBack(payCashback)
  }

  onCancelAmountPayCashBack = () => {
    this.setState({ paymentValue: 0 }, () => this.changeAmountPayCashBack(0))
  }

  changeAmountPayCashBack = value => {
    if (this.props.onChangeAmountPayCashBack)
      this.props.onChangeAmountPayCashBack(value)
  }

  componentDidUpdate(prevProps) {
    if (this.state.paymentValue > 0 && prevProps.toPay != this.props.toPay) {
      this.onApplyAmountPayCashBack()
    }
  }

  renderPay = () => {
    return (
      <View style={Style.row}>
        <Text style={[
          this.props.style.fontSize.h8,
          this.props.style.theme.primaryTextColor,
          Style.text
        ]}>
          {`${priceValid(this.getValuePayCashback())}  ${this.props.currencyPrefix}`}
        </Text>
        <View style={{ flex: 0.5 }}>
          <SimpleTextButton
            text='Оплатить'
            onPress={this.onApplyAmountPayCashBack}
            sizeText={this.props.style.fontSize.h7.fontSize}
            color={this.props.style.theme.accentOther.backgroundColor}
          />
        </View>
      </View>
    )
  }

  renderCancel = () => {
    return (
      <View style={Style.row}>
        <Text style={[
          this.props.style.fontSize.h8,
          this.props.style.theme.primaryTextColor,
          Style.text
        ]}>
          {`- ${priceValid(this.state.paymentValue)} ${this.props.currencyPrefix}`}
        </Text>
        <View style={{ flex: 0.5 }}>
          <SimpleTextButton
            text='Отменить'
            onPress={this.onCancelAmountPayCashBack}
            sizeText={this.props.style.fontSize.h7.fontSize}
            color={this.props.style.theme.accentOther.backgroundColor}
          />
        </View>
      </View>
    )
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
            Оплата бонусами
          </Text>
        </View>
        <View style={Style.content}>
          {
            this.state.paymentValue == 0 &&
            this.renderPay()
          }
          {
            this.state.paymentValue > 0 &&
            this.renderCancel()
          }
        </View>
      </View>
    )
  }
}