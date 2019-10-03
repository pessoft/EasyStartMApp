import React from 'react'
import { View, Image } from 'react-native'
import Style from './style'

export class FullScreenLogo extends React.Component {
  render() {
    return (
      <View style={[Style.screen, this.props.theme.themeBody]} >
        <Image style={Style.logo} source={this.props.source} />
      </View>
    )
  }
}