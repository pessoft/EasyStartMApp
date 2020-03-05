import React from 'react'
import { View, Text, Platform, Animated, Switch } from 'react-native'
import Style from './style'
import { DeliveryDateType } from '../../../logic/promotion/delivery-date-type'
import { DeliveryType } from '../../../logic/promotion/delivery-type'
import DatePicker from 'react-native-date-picker'
import { timingAnimation } from '../../../animation/timingAnimation'

export class DeliveryDateSetting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      isDeliveryToDate: false,
      showDateTimePicker: false,
      date: null
    }

    this.setTypeDeliveryDateOptions()
  }

  showDateTimePicker = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 200, true)
  }
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

  onToggleSwitch = () => this.setState({ isDeliveryToDate: !this.state.isDeliveryToDate })

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isDeliveryToDate &&
      this.state.isDeliveryToDate) {
      this.setState({ showDateTimePicker: true, date: this.getMinDate() },
        () => this.showDateTimePicker())

    } else if (prevState.isDeliveryToDate &&
      !this.state.isDeliveryToDate)
      this.hideDateTimePicker()
  }

  setTypeDeliveryDateOptions() {
    this.typeDeliveryDateOptions = [
      { label: "Как можно быстрее", value: DeliveryDateType.Default },
      { label: "Ко времени", value: DeliveryDateType.ToDate }
    ]

    this.initDeliveryDateTypeValue = 0
  }

  changeDate = date => this.setState({ date })

  getMinDate = () => {
    let date = new Date()
    date.setHours(date.getHours() + 1)

    return date
  }

  getLabelDeliveryToDate = () => {
    if (this.props.deliveryType == DeliveryType.Delivery)
      return 'Доставить ко времени'
    else
      return 'Подготовить ко времени'
  }

  render() {
    return (
      <View>
        <View style={[
          Style.switch,
          this.props.style.theme.dividerColor
        ]}>
          <Text
            style={[
              this.props.style.fontSize.h8,
              (this.props.disabled ?
                this.props.style.theme.secondaryTextColor :
                this.props.style.theme.primaryTextColor)
            ]}>
            {this.getLabelDeliveryToDate()}
          </Text>
          <Switch
            backgroundColor={this.props.style.theme.backdoor.backgroundColor}
            onValueChange={this.onToggleSwitch}
            value={this.state.isDeliveryToDate}
            trackColor={{
              true: Platform.OS == 'ios' ?
                this.props.style.theme.applyPrimaryColor.color :
                this.props.style.theme.applySecondaryColor.color,
              false: this.props.style.theme.themeBody.backgroundColor
            }}
            thumbColor={[
              (this.state.isDeliveryToDate ?
                Platform.OS == 'android' ?
                  this.props.style.theme.applyPrimaryColor.color :
                  this.props.style.theme.textPrimaryColor.color :
                this.props.style.theme.secondaryTextColor.color)]}
            ios_backgroundColor={this.state.isDeliveryToDate ?
              this.props.style.theme.applyPrimaryColor.color :
              this.props.style.theme.themeBody.backgroundColor}
            style={[
              { borderWidth: 0.5 },
              this.props.style.theme.dividerColor]}
          />
        </View>
        {
          this.state.showDateTimePicker &&
          <Animated.View
            style={[
              this.props.style.theme.backdoor.backgroundColor,
              this.props.style.theme.dividerColor.borderColor,
              {
                opacity: this.state.showScaleAnimation,
                transform: [{ scale: this.state.showScaleAnimation }]
              }
            ]}>
            <DatePicker
              mode={'datetime'}
              textColor={this.props.style.theme.primaryTextColor.color}
              fadeToColor={this.props.style.theme.backdoor.backgroundColor}
              date={this.state.date}
              minimumDate={this.getMinDate()}
              onDateChange={this.changeDate}
            />
          </Animated.View>
        }
      </View>
    )
  }
}