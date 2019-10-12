import React from 'react'
import {
  TouchableWithoutFeedback,
  Text
} from 'react-native'
import Style from './style'

export class ColorThemeItem extends React.Component {

  onPress = () => {
    if (this.props.onPress)
      this.props.onPress()
  }

  render() {
    return (
      <TouchableWithoutFeedback
        underlayColor={this.props.style.backdoor.backgroundColor}
        onPress={this.onPress}
        style={[
          Style.bodyItem,

        ]}>
        <Text style={[
          { fontSize: this.props.fontSize },
          Style.text,
          Style.textWrap, ,
          this.props.style.defaultPrimaryColor,
          this.props.style.textPrimaryColor]}>
          {this.props.text}
        </Text>
      </TouchableWithoutFeedback>
    )
  }
}