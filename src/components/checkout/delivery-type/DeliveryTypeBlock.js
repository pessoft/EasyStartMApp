import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { DeliveryRadioGroup } from './DeliveryRadioGroup'
import SwitchSelector from "react-native-switch-selector";
import { DeliveryType } from '../../../logic/promotion/delivery-type'
import { DeliveryDateType } from '../../../logic/promotion/delivery-date-type'
import { DeliveryDateSetting } from './DeliveryDateSetting';

export class DeliveryTypeBlock extends React.Component {
  constructor(props) {
    super(props)

    this.setTypeDeliveryOptions()
    this.state = {
      deliveryType: props.initValue
    }
  }

  setTypeDeliveryOptions() {
    this.typeDeliveryOptions = [
      { label: "Доставка на дом", value: DeliveryType.Delivery },
      { label: "Забрать самому", value: DeliveryType.TakeYourSelf }
    ]

    this.initDeliveryTypeValue = this.typeDeliveryOptions.findIndex(p => p.value == this.props.initValue)
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
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Параметры доставки
          </Text>
        </View>
        <View style={Style.content}>
          <SwitchSelector
            options={this.typeDeliveryOptions}
            initial={this.initDeliveryTypeValue}
            height={34}
            borderRadius={3}
            fontSize={this.props.style.fontSize.h8.fontSize}
            textColor={this.props.style.theme.primaryTextColor.color}
            selectedColor={this.props.style.theme.primaryTextColor.color}
            backgroundColor={this.props.style.theme.backdoor.backgroundColor}
            buttonColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
            style={{ marginBottom: 10, borderWidth: 1, borderRadius: 4, borderColor: this.props.style.theme.darkPrimaryColor.backgroundColor }}
            onPress={this.onChangeDeliveryType}
          />
          <DeliveryDateSetting
            style={this.props.style}
          />
        </View>
      </View>
    )
  }
}