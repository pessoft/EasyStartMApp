import React from 'react'
import { View, Text } from 'react-native'
import { MinusButton } from '../Square/MinusButton'
import { PlusButton } from '../Square/PlusButton'
import Style from './style'

export class CounterButton extends React.Component {
  constructor(props) {
    super(props)
  }

  onPress = count => this.props.onPress && this.props.onPress(count)

  onMinus = () => this.onPress(this.props.startCount - 1)

  onPlus = () => {
    if (this.props.limit == 0
      || this.props.startCount == this.props.maxCount)
      return

    this.onPress(this.props.startCount + 1)
  }

  render() {
    return (
      <View style={Style.contentButton}>
        <MinusButton {...this.props} onPress={this.onMinus} />
        <Text style={[
          Style.valueContainer,
          { color: this.props.tintColor }]}>{this.props.startCount}</Text>
        <PlusButton {...this.props} onPress={this.onPlus} />
      </View>
    )
  }
}