import React from 'react'
import { View, Text } from 'react-native'
import Styles from './style'
import { DeliveryRadioGroup } from './DeliveryRadioGroup'

export class DeliveryType extends React.Component {
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
        Styles.container,
        this.props.style.theme.defaultPrimaryColor,
        this.props.style.theme.dividerColor
      ]}>
        <View style={Styles.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.textPrimaryColor,
          ]}>
            Способ получения
          </Text>
        </View>
        <View style={Styles.content}>
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