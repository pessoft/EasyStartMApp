import React from 'react'
import {
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import Style from './style'
import FastImage from 'react-native-fast-image'

export class StockCard extends React.Component {

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.id)
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[
          Style.card,
          this.props.style.theme.backdoor,
          this.props.style.theme.shadowColor,
        ]}>
          <FastImage
            style={Style.image}
            source={this.props.imageSource}
          />
          <Text style={[
            this.props.style.fontSize.h9,
            this.props.style.theme.primaryTextColor,
            Style.cardName]}
          >
            {this.props.stockName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}