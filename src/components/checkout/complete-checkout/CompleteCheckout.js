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

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.defaultPrimaryColor,
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
            this.props.stock > 0 &&
            <Text
              style={[
                Style.textPadding,
                this.props.style.theme.primaryTextColor,
                this.props.style.fontSize.h8]}>
              Скидка: {this.props.stock}%
          </Text>
          }
          <Text
            style={[
              Style.textPadding,
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8]}>
            К оплате:{`${this.props.toPay} ${this.props.currencyPrefix}`}
          </Text>
          <View style={Style.buttonComplete}>
            <Button
              title='Оформить заказ'
              onPress={this.props.onCompleteCheckout}
              disabled={this.props.disabled}
              color={Platform.OS == 'ios' ? 
              this.props.style.theme.accentOther.backgroundColor:
              this.props.style.theme.darkPrimaryColor.backgroundColor} />
          </View>
        </View>
      </View>
    )
  }
}