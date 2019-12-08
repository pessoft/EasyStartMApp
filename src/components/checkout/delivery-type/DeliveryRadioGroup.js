import React from 'react'
import { RadioGroup } from '../../radio-group/RadioGroup'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeliveryType } from '../../../logic/promotion/delivery-type'

export class DeliveryRadioGroup extends React.Component {

  constructor(props) {
    super(props)

    this.radioProps = [
      { label: 'Доставка курьером', value: DeliveryType.Delivery },
      { label: 'Самовывоз', value: DeliveryType.TakeYourSelf },
    ]
  }

  render() {
    return (
      <RadioGroup
        radioProps={this.radioProps}
        initValue={this.props.initValue}
        changeRadio={this.props.changeRadio}
        style={this.props.style}
      />
    )
  }
}