import React from 'react'
import { RadioGroup } from '../../RadioGroup/RadioGroup'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { TypeDelivery } from '../../../helpers/type-delivery'

export class DeliveryRadioGroup extends React.Component {

  constructor(props) {
    super(props)

    this.radioProps = [
      { label: 'Доставка курьером', value: TypeDelivery.Delivery },
      { label: 'Самовывоз', value: TypeDelivery.TakeYourSelf },
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