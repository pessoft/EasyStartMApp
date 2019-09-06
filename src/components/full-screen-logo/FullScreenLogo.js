import React from 'react'
import { View, Image } from 'react-native'
import Styles from './style'

export class FullScreenLogo extends React.Component {
  render() {
    return (
      <View style={[Styles.screen, this.props.theme.themeBody]} >
        <Image style={Styles.logo} source={this.props.source} />
      </View>
    )
  }
}