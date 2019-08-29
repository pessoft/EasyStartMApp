import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import Styles from './style'

export class SimpleListItem extends React.Component {
  onPress = () => {
    if(this.props.onPress)
      this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor='#f9f9f9'
        onPress={this.onPress}
        style={Styles.bodyItem}>
        <Text style={[Styles.ph_10, Styles.text, this.props.selected ? Styles.selectedItem : null]}>
          {this.props.text}
        </Text>
      </TouchableHighlight >
    )
  }
}