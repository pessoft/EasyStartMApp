import React from 'react'
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import Image from 'react-native-scalable-image'
import Style from './style'

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
          this.props.style.theme.backdoor]}>
          <Image
            style={Style.image}
            width={Dimensions.get('screen').width - 24}
            source={this.props.imageSource}
            resizeMode='contain' />
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