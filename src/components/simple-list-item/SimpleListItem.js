import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import Styles from './style'

export class SimpleListItem extends React.Component {
  onPress = () => {
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onPress}
        style={Styles.simpleListItem}>
        <Text style={[Styles.ph_10, this.props.selected ? Styles.selectedItem : null]}>
          {this.props.text}
        </Text>
      </TouchableHighlight >
    )
  }
}