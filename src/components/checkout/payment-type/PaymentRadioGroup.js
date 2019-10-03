import React from 'react'
import { RadioGroup } from '../../radio-group/RadioGroup'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { TypePayment } from '../../../helpers/type-payment'

export class PaymentRadioGroup extends React.Component {

  constructor(props) {
    super(props)

    this.radioProps = [
      { label: 'Оплата картой', value: TypePayment.Card },
      { label: 'Оплата наличными', value: TypePayment.Cash },
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