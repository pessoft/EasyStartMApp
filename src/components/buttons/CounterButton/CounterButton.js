import React from 'react'
import { View, Text } from 'react-native'
import { MinusButton } from '../Square/MinusButton'
import { PlusButton } from '../Square/PlusButton'
import Styles from './style'

export class CounterButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: this.props.startCount || 0
    }
  }

  onPress = () => {
    if (this.props.onPress)
      this.props.onPress(this.state.count)
  }

  onMinus = () => {
    this.setState(
      {
        count: this.state.count - 1
      },
      this.onPress)
  }

  onPlus = () => {
    this.setState(
      {
        count: this.state.count + 1
      },
      this.onPress)
  }

  render() {
    return (
      <View style={Styles.contentButton}>
        <MinusButton {...this.props} onPress={this.onMinus} />
        <Text style={[
          Styles.valueContainer,
          { color: this.props.color }]}>{this.state.count}</Text>
        <PlusButton {...this.props} onPress={this.onPlus} />
      </View>
    )
  }
}