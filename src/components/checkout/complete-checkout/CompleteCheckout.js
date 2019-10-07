import React from 'react'
import {
  View,
  Text,
  Button,
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
          <Text>Сумма заказа: {`${this.props.orderPrice} ${this.props.currencyPrefix}`}</Text>
          {this.props.deliveryPrice > 0 && <Text>Доставка: {`${this.props.deliveryPrice} ${this.props.currencyPrefix}`}</Text>}
          {this.props.stock > 0 && <Text>Скидка: {this.props.stock}%</Text>}
          <Text>К оплате:{`${this.props.toPay} ${this.props.currencyPrefix}`}</Text>
        </View>
        <View style={Style.buttonSize}>
          <Button
            title='Оформить заказ'
            onPress={this.props.onCompleteCheckout}
            disabled={this.props.disabled}
            color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
        </View>
      </View>
    )
  }
}