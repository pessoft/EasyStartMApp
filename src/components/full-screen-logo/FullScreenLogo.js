import React from 'react'
import { View, Image } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'

export class FullScreenLogo extends React.Component {
  render() {
    return (
      <View style={[Style.screen, this.props.theme.themeBody]} >
        <View style={Style.logoContainer}>
          <Image style={Style.logo} source={this.props.source} />
        </View>
        <View style={Style.loaderContainer}>
          <LottieView
            style={Style.loader}
            source={require('../../animation/src/loader-1.json')}
            autoPlay
            resizeMode='cover'
            autoSize={true}
            speed={1.5} />
        </View>
      </View>
    )
  }
}