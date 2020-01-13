import React from 'react'
import Style from './style'
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native'
import { priceValid } from '../../../../helpers/utils'
import { IngredientCounter } from '../ingredient-counter/IngredientCounter'

export class ShortIngredient extends React.Component {
  constructor(props) {
    super(props)
  }

  getAdditionalIngo() {
    const additionalInfo = this.props.ingredient.AdditionalInfo
    const price = `${priceValid(this.props.ingredient.Price)} ${this.props.currencyPrefix}`
    return `${additionalInfo} / ${price}`
  }

  addIngredient = () => {
    if (this.props.ingredient.MaxAddCount != 0 && this.props.count + 1 > this.props.ingredient.MaxAddCount) {
      this.changeIngredientCount(0)
    } else if (this.props.onAllowAddIngredinet
      && this.props.onAllowAddIngredinet()) {
      this.changeIngredientCount(this.props.count + 1)
    }
  }

  changeIngredientCount(count) {
    if (this.props.onChangeIngredientCount)
      this.props.onChangeIngredientCount(this.props.ingredient.Id, count)
  }

  ingredientResetToZero = () => {
    this.changeIngredientCount(0)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.addIngredient}>
        <View
          style={[
            Style.container,
            this.props.style.theme.dividerColor
          ]}>
          <IngredientCounter
            style={this.props.style}
            count={this.props.count}
            onResetToZero={this.ingredientResetToZero}
          />
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