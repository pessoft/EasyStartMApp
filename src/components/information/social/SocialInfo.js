import React from 'react'
import { View, Text } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'

export class SocialInfo extends React.Component {

  renderIco = () => {
    const Ico = this.props.social.ico
    return (
      <Ico
        width={45}
        height={45}
        color={getSVGColor(this.props.style.theme.accentOther.backgroundColor)}
      />
    )
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor]}>
        <View style={Style.image}>
          {this.renderIco()}
        </View>
        <View style={Style.info}>
          <View style={Style.header}>
            <Text
              style={[
                this.props.style.theme.primaryTextColor,
                this.props.style.fontSize.h6]}>
              {this.props.social.name}
          </Text>
          </View>
          <View style={Style.content}>
            <Text style={[
              this.props.style.theme.secondaryTextColor,
              this.props.style.fontSize.h9,
              Style.paddingBottomText
            ]}>
              {this.props.href}
              </Text>
          </View>
        </View>
      </View>
    )
  }
}