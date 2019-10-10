import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import CoinsIcon from '../../../images/font-awesome-svg/coins.svg'

export class PaymentTypeInfo extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor]}>
        <View style={Style.image}>
          <CoinsIcon
            width={45}
            height={45}
            color={getSVGColor(this.props.style.theme.accentOther.backgroundColor)}
          />
        </View>
        <View style={Style.info}>
          <View style={Style.header}>
            <Text
              style={[
                this.props.style.theme.primaryTextColor,
                this.props.style.fontSize.h6]}>
              Оплата заказа
          </Text>
          </View>
          <View style={Style.content}>
            {
              this.props.card &&
              <Text style={[
                this.props.style.theme.secondaryTextColor,
                this.props.style.fontSize.h9,
                Style.paddingBottomText
              ]}>
                Банковской картой при получении заказа.
              </Text>
            }
            {
              this.props.cash &&
              <Text style={[
                this.props.style.theme.secondaryTextColor,
                this.props.style.fontSize.h9,
                Style.paddingBottomText
              ]}>
                Оплата наличными курьеру или в кафе при получении заказа.
              </Text>
            }
          </View>
        </View>
      </View>
    )
  }
}