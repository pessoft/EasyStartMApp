import React from 'react'
import { Text, Switch, View, Platform } from 'react-native'
import Style from './style'

export class ToggleSwitch extends React.Component {
  onToggleSwitch = value => {
    if (this.props.onToggle)
      this.props.onToggle(this.props.id, value)
  }

  render() {
    return (
      <View style={[
        Style.switch
      ]}>
        <Text
          style={[
            this.props.style.fontSize.h9,
            this.props.style.theme.primaryTextColor
          ]}>
          {this.props.label}
        </Text>
        <Switch
          backgroundColor={this.props.style.theme.backdoor.backgroundColor}
          onValueChange={this.onToggleSwitch}
          value={this.props.value}
          trackColor={{
            true: Platform.OS == 'ios' ?
              this.props.style.theme.applyPrimaryColor.color :
              this.props.style.theme.applySecondaryColor.color,
            false: this.props.style.theme.themeBody.backgroundColor
          }}
          thumbColor={[
            (this.props.value ?
              Platform.OS == 'android' ?
                this.props.style.theme.applyPrimaryColor.color :
                this.props.style.theme.textPrimaryColor.color :
              this.props.style.theme.secondaryTextColor.color)]}
          ios_backgroundColor={this.props.value ?
            this.props.style.theme.applyPrimaryColor.color :
            this.props.style.theme.themeBody.backgroundColor}
          style={[
            { borderWidth: 0.5 },
            this.props.style.theme.dividerColor]}
        />
      </View>
    )
  }
}