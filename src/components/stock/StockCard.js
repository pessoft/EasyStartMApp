import React from 'react'
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import Image from 'react-native-scalable-image'
import Styles from './style'

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
          Styles.card,
          this.props.style.theme.defaultPrimaryColor]}>
          <Image
            width={Dimensions.get('screen').width}
            source={this.props.imageSource}
            resizeMode='contain' />
          <Text style={[
            this.props.style.fontSize.h9,
            this.props.style.theme.textPrimaryColor,
            Styles.cardName]}
          >
            {this.props.stockName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}