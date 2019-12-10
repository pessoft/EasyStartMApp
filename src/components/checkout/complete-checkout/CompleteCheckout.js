import React from 'react'
import {
  View,
  Text,
  Button,
  Platform
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Style from './style'

export class CompleteCheckout extends React.Component {
  getDiscountText = () => {
    const percent = this.props.discountPercent > 0 ? `${this.props.discountPercent}%` : ''
    const ruble = this.props.discountRuble > 0 ? `${this.props.discountRuble} руб.` : ''
    let text = percent && ruble ? `${percent} и ${ruble}` : percent || ruble

    return text
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Style.content}>
          <Text
            style={[
              Style.textPadding,
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8
            ]}>
            Сумма заказа: {`${this.props.orderPrice} ${this.props.currencyPrefix}`}
          </Text>
          {
            this.props.deliveryPrice > 0 &&
            <Text style={[
              Style.textPadding,
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8]}>
              Доставка: {`${this.props.deliveryPrice} ${this.props.currencyPrefix}`}
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
            К оплате: {`${this.props.toPay} ${this.props.currencyPrefix}`}
          </Text>
          <View style={Style.buttonComplete}>
            <Button
              title='Оформить заказ'
              onPress={this.props.onCompleteCheckout}
              disabled={this.props.disabled}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.darkPrimaryColor.backgroundColor} />
          </View>
        </View>
      </View>
    )
  }
}