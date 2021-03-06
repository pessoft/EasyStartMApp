import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import DeliveryTypeIcon from '../../../images/font-awesome-svg/truck-loading.svg'

export class DeliveryTypeInfo extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
        ]}>
        <View style={Style.image}>
          <DeliveryTypeIcon
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
              Способ доставки
          </Text>
          </View>
          <View style={Style.content}>
            {
              this.props.takeYourSelf &&
              <Text style={[
                this.props.style.theme.secondaryTextColor,
                this.props.style.fontSize.h9,
                Style.paddingBottomText
              ]}>
                Самовывоз из кафе.
              </Text>
            }
            {
              this.props.delivery &&
              <Text style={[
                this.props.style.theme.secondaryTextColor,
                this.props.style.fontSize.h9,
                Style.paddingBottomText
              ]}>
                Доставка курьером.
              </Text>
            }
          </View>
        </View>
      </View>
    )
  }
}