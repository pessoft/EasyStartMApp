import React from 'react'
import { View, Text, Linking, TouchableWithoutFeedback } from 'react-native'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'
import { socialType } from '../../../helpers/social'

export class SocialInfo extends React.Component {

  renderIcon = () => {
    const Icon = this.props.social.icon
    return (
      <Icon
        width={45}
        height={45}
        color={getSVGColor(this.props.style.theme.accentOther.backgroundColor)}
      />
    )
  }

  onOpenLink = () => {
    if (this.props.social.type == socialType.email)
      return

    try {
      if (this.props.href.indexOf('http://') == -1 &&
        this.props.href.indexOf('https://') == -1)
        Linking.openURL(`http://${this.props.href}`)
      else
        Linking.openURL(this.props.href)
    } catch{ }

  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onOpenLink}>
        <View style={[
          Style.container,
          this.props.style.theme.backdoor,
          this.props.style.theme.dividerColor]}>
          <View style={Style.image}>
            {this.renderIcon()}
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
              <Text
                style={[
                  this.props.style.theme.secondaryTextColor,
                  this.props.style.fontSize.h9,
                  Style.paddingBottomText
                ]}>
                {this.props.href}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}