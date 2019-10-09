import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import MapMarkerIco from '../../../images/font-awesome-svg/map-marker-alt.svg'

export class AddressInfo extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor]}>
        <View style={Style.image}>
          <MapMarkerIco
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
                this.props.style.fontSize.h6,
              ]}>
              Адрес
          </Text>
          </View>
          <View style={Style.content}>
            <Text style={[
              this.props.style.theme.secondaryTextColor,
              this.props.style.fontSize.h9,
              Style.paddingBottomText
            ]}>
              {`г.${this.props.city}, ул.${this.props.street}, д.${this.props.homeNumber}`}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}