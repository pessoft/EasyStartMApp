import React from 'react'
import { TouchableWithoutFeedback, Text } from 'react-native'
import Styles from './style'

export class SimpleListItem extends React.Component {
  onPress = () => {
    if (this.props.onPress)
      this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableWithoutFeedback
        underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
        onPress={this.onPress}
        style={Styles.bodyItem}>
        <Text style={[
          Styles.text,
          Styles.textWrap,
          this.props.style.theme.dividerColor,
          this.props.selected ? this.props.style.fontSize.h6 : this.props.style.fontSize.h9,
          this.props.selected ? Styles.primaryTextColor : this.props.style.theme.secondaryTextColor]}>
          {this.props.text}
        </Text>
      </TouchableWithoutFeedback  >
    )
  }
}