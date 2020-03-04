import React from 'react'
import { View, Text, Platform, Animated } from 'react-native'
import Style from './style'
import SwitchSelector from "react-native-switch-selector";
import { DeliveryDateType } from '../../../logic/promotion/delivery-date-type'
import DatePicker from 'react-native-date-picker'
import { timingAnimation } from '../../../animation/timingAnimation'

export class DeliveryDateSetting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      deliveryDateType: DeliveryDateType.Default,
      showDateTimePicker: false,
      date: null,
    }

    this.setTypeDeliveryDateOptions()
  }

  showDateTimePicker = () => timingAnimation(this.state.showScaleAnimation, 1, 200, true)
  hideDateTimePicker = () => {
    timingAnimation(this.state.showScaleAnimation,
      0,
      200,
      true,
      () => this.setState({
        showDateTimePicker: false,
        date: null,
      })
    )

  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.deliveryDateType != DeliveryDateType.ToDate &&
      this.state.deliveryDateType == DeliveryDateType.ToDate) {
      this.setState({ showDateTimePicker: true, date: new Date() })
      this.showDateTimePicker()
    } else if (prevState.deliveryDateType != DeliveryDateType.Default &&
      this.state.deliveryDateType == DeliveryDateType.Default)
      this.hideDateTimePicker()
  }

  setTypeDeliveryDateOptions() {
    this.typeDeliveryDateOptions = [
      { label: "Как можно быстрее", value: DeliveryDateType.Default },
      { label: "Ко времени", value: DeliveryDateType.ToDate }
    ]

    this.initDeliveryDateTypeValue = 0
  }

  onChangeDeliveryDateType = deliveryDateType => this.setState({ deliveryDateType })

  changeDate = date => this.setState({ date })

  gitMinDate = () => {
    let date = new Date()
    date.setHours(date.getHours() + 1)

    return date
  }

  render() {

    return (
      <View>
        <SwitchSelector
          options={this.typeDeliveryDateOptions}
          initial={this.initDeliveryDateTypeValue}
          height={34}
          borderRadius={3}
          fontSize={this.props.style.fontSize.h8.fontSize}
          textColor={this.props.style.theme.primaryTextColor.color}
          selectedColor={this.props.style.theme.primaryTextColor.color}
          backgroundColor={this.props.style.theme.backdoor.backgroundColor}
          buttonColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
          style={{ marginBottom: 10, borderWidth: 1, borderRadius: 4, borderColor: this.props.style.theme.darkPrimaryColor.backgroundColor }}
          onPress={this.onChangeDeliveryDateType}
        />
        {
          this.state.showDateTimePicker &&
          <Animated.View
            style={
              {
                backgroundColor: this.props.style.theme.backdoor.backgroundColor,
                borderWidth: 0.7,
                borderColor: this.props.style.theme.dividerColor.borderColor,
                borderRadius: 3,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
                opacity: this.state.showScaleAnimation,
                transform: [{ scale: this.state.showScaleAnimation }]
              }
            }>
            <DatePicker
              mode={'datetime'}
              textColor={this.props.style.theme.primaryTextColor.color}
              fadeToColor={this.props.style.theme.backdoor.backgroundColor}
              date={this.state.date}
              minimumDate={this.gitMinDate()}

              onDateChange={this.changeDate}
            />
          </Animated.View>
        }
      </View>
    )
  }
}