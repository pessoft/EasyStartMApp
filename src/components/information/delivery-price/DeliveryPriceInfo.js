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
        this.props.style.theme.dividerColor,,
        this.props.style.theme.shadowColor,
        ]}>
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
            {
              this.props.areaDeliveriesPrice &&
              this.props.areaDeliveriesPrice.length > 0 &&
              <Text
                style={[
                  this.props.style.theme.secondaryTextColor,
                  this.props.style.fontSize.h9,
                  Style.paddingBottomText
                ]}>
                Стоимость доставки зависит от вашего местонахождения
              </Text>
            }
            {
              this.props.areaDeliveriesPrice &&
              this.props.areaDeliveriesPrice.map((value, index) => {
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

            {
              this.props.areaDeliveries &&
              this.props.areaDeliveries.length > 0 &&
              <Text
                style={[
                  this.props.style.theme.secondaryTextColor,
                  this.props.style.fontSize.h9,
                  Style.paddingBottomText,
                  Style.AreaDeliveryInfo
                ]}>
                Бесплатная доставка осуществляется при заказа на минимальную
                сумму, которая зависит от вашего местонахождения
              </Text>
            }
            {
              this.props.areaDeliveries &&
              this.props.areaDeliveries.map((value, index) => {
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