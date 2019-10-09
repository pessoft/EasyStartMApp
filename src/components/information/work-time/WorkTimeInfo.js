import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import ClockIco from '../../../images/font-awesome-svg/clock.svg'

export class WorkTimeInfo extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor]}>
        <View style={Style.image}>
          <ClockIco
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
                this.props.style.fontSize.h6
              ]}>
              Режим доставки
          </Text>
          </View>
          <View style={Style.content}>
            {
              this.props.data.map((value, index) => {
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