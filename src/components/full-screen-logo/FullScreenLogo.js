import React from 'react'
import { View, Image } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'

export class FullScreenLogo extends React.Component {
  render() {
    return (
      <View style={[Style.screen, this.props.theme.secondaryThemeBody]} >
        <View style={Style.logoContainer}>
          <Image style={Style.logo} source={this.props.source} />
        </View>
      </View>
    )
  }
}