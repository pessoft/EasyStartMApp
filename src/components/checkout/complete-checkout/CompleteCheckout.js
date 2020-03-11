import React from 'react'
import {
  View,
  Text,
  Button,
  Platform
} from 'react-native'
import Style from './style'
import { priceValid } from '../../../helpers/utils'

export class CompleteCheckout extends React.Component {
  getDiscountText = () => {
    const percent = this.props.discountPercent > 0 ? `${this.props.discountPercent}%` : ''
    const ruble = this.props.discountRuble > 0 ? `${priceValid(this.props.discountRuble)} руб.` : ''
    let text = percent && ruble ? `${percent} и ${ruble}` : percent || ruble

    return text
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
      ]}>
        <View style={Style.content}>
          <Text
            style={[
              Style.textPadding,
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8
            ]}>
            Сумма заказа: {`${priceValid(this.props.orderPrice)} ${this.props.currencyPrefix}`}
          </Text>
          {
            this.props.deliveryPrice > 0 &&
            <Text style={[
              Style.textPadding,
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8]}>
              Доставка: {`${priceValid(this.props.deliveryPrice)} ${this.props.currencyPrefix}`}
            </Text>
          }
          {
            (this.props.discountPercent > 0 || this.props.discountRuble > 0) &&
            <Text
              style={[
                Style.textPadding,
                this.props.style.theme.primaryTextColor,
                this.props.style.fontSize.h8]}>
              Скидка: {this.getDiscountText()}
            </Text>
          }
          <Text
            style={[
              Style.textPadding,
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8]}>
            К оплате: {`${priceValid(this.props.toPay)} ${this.props.currencyPrefix}`}
          </Text>
          <View style={Style.buttonComplete}>
            <Button
              title='Оформить заказ'
              onPress={this.props.onCompleteCheckout}
              disabled={this.props.disabled}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.accentOther.backgroundColor} />
          </View>
        </View>
      </View>
    )
  }
}