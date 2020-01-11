import React from 'react'
import Style from './style'
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native'
import { priceValid } from '../../../../helpers/utils'
export class ShortIngredient extends React.Component {
  getAdditionalIngo() {
    const additionalInfo = this.props.ingredient.AdditionalInfo
    const price = `${priceValid(this.props.ingredient.Price)} ${this.props.currencyPrefix}`
    return `${additionalInfo} / ${price}`
  }

  render() {
    return (
      <TouchableWithoutFeedback>
        <View
          style={[
            Style.container,
            this.props.style.theme.dividerColor
          ]}>
          <View style={Style.imageContainer}>
            <Image
              resizeMode={"contain"}
              style={Style.image}
              source={this.props.ingredient.Image} />
          </View>
          <View style={Style.descriptionContainer}>
            <Text
              style={[
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                Style.textAlignCenter
              ]}>
              {this.props.ingredient.Name}
            </Text>
            <Text
              style={[
                this.props.style.fontSize.h9,
                this.props.style.theme.primaryTextColor,
                Style.additionalInfo,
                Style.textAlignCenter
              ]}>
              {this.getAdditionalIngo()}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}