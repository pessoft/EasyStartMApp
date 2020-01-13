import React from 'react'
import { View } from 'react-native'
import { BasketButton } from '../Square/BasketButton'
import { CounterButton } from '../CounterButton/CounterButton'
import Style from './style'

export class ShoppingButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: props.startCount || 0
    }
  }

  onPressBasket = () => {
    this.onChangeCount(1)
  }

  onChangeCount = count => {
    if ((this.props.limit == 0 || this.state.count == this.props.maxCount) && count >= this.state.count)
      return

    this.setState({
      count: count
    },
      () => {
        if (this.props.onPress)
          this.props.onPress(this.state.count)
      })
  }

  renderButton = () => {
    if (this.state.count == 0)
      return <BasketButton {...this.props} onPress={this.onPressBasket} />
    else
      return <CounterButton
        {...this.props}
        onPress={this.onChangeCount}
        startCount={this.state.count}
      />
  }

  render() {
    return (
      <View style={Style.shoppingButton}>
        {this.renderButton()}
      </View>
    )
  }
}