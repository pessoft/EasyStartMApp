import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { DeliveryRadioGroup } from './DeliveryRadioGroup'

export class DeliveryTypeBlock extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      deliveryType: props.initValue
    }
  }

  onChangeDeliveryType = deliveryType => {
    this.setState({ deliveryType },
      () => {
        if (this.props.changeDeliveryType)
          this.props.changeDeliveryType(this.state.deliveryType)
      })
  }

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Способ получения
          </Text>
        </View>
        <View style={Style.content}>
          <DeliveryRadioGroup
            style={this.props.style}
            initValue={this.state.deliveryType}
            changeRadio={this.onChangeDeliveryType}
          />
        </View>
      </View>
    )
  }
}