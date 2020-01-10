import React from 'react'
import Style from './style'
import { TouchableWithoutFeedback, Text, View } from 'react-native'

export class LongIngredient extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View
          style={[
            Style.container,
            this.props.style.theme.dividerColor
          ]}>

        </View>
      </TouchableWithoutFeedback>
    )
  }
}