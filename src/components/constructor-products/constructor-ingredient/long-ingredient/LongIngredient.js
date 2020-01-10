import React from 'react'
import Style from './style'
import { TouchableWithoutFeedback, Text, View, Image } from 'react-native'

export class LongIngredient extends React.Component {
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
        </View>
      </TouchableWithoutFeedback>
    )
  }
}