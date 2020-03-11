import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import PhoneIcon from '../../../images/font-awesome-svg/phone.svg'

export class PhoneNumberInfo extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
        ]}>
        <View style={Style.image}>
          <PhoneIcon
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
                this.props.style.fontSize.h6              ]}>
              Наш телефон
          </Text>
          </View>
          <View style={Style.content}>
            <Text style={[
              this.props.style.theme.secondaryTextColor,
              this.props.style.fontSize.h9,
              Style.paddingBottomText
            ]}>
              {this.props.phoneNumberMain}
            </Text>
            {
              this.props.phoneNumberSecond &&
              <Text style={[
                this.props.style.theme.secondaryTextColor,
                this.props.style.fontSize.h9,
                Style.paddingBottomText
              ]}>
                {this.props.phoneNumberSecond}
              </Text>
            }
          </View>
        </View>
      </View>
    )
  }
}