import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import StackDollarIcon from '../../../images/font-awesome-svg/sack-dollar.svg'

export class DeliveryPriceInfo extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor]}>
        <View style={Style.image}>
          <StackDollarIcon
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
              Доставка
          </Text>
          </View>
          <View style={Style.content}>
            <Text style={[
              this.props.style.theme.secondaryTextColor,
              this.props.style.fontSize.h9,
              Style.paddingBottomText
            ]}>
              {`Стоимость доставки ${this.props.startFreeDeliveryPrice} ${this.props.currencyPrefix}`}
            </Text>
            {
              this.props.areaDelievries &&
              this.props.areaDelievries.length > 0 &&
              <Text
                style={[
                  this.props.style.theme.secondaryTextColor,
                  this.props.style.fontSize.h9,
                  Style.paddingBottomText
                ]}>
                Бесплатная доставка осуществляется при заказа на минимальную
                сумму, которая зависит от вашего местонахождения
              </Text>
            }
            {
              this.props.areaDelievries &&
              this.props.areaDelievries.map((value, index) => {
                return (
                  <Text
                    key={index}
                    style={[
                      this.props.style.theme.secondaryTextColor,
                      this.props.style.fontSize.h9,
                      Style.paddingBottomText
                    ]}>
                    {value}
                  </Text>)
              })
            }
          </View>
        </View>
      </View>
    )
  }
}