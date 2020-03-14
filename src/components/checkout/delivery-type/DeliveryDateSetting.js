import React from 'react'
import { View, Text, Platform, Animated, Switch } from 'react-native'
import Style from './style'
import { DeliveryDateType } from '../../../logic/promotion/delivery-date-type'
import { DeliveryType } from '../../../logic/promotion/delivery-type'
import DatePicker from 'react-native-date-picker'
import { timingAnimation } from '../../../animation/timingAnimation'
import { showMessage } from 'react-native-flash-message'
import {
  isValidDay,
  isValidTime,
  isWorkTime,
  toStringDate,
  getTimePeriodByDayFromDate,
  nearestWorkingStartDate,
  nearestWorkingEndDate
} from '../../../helpers/work-time'

export class DeliveryDateSetting extends React.Component {
  constructor(props) {
    super(props)

    this.maxDate = this.getMaxDate()
    this.state = {
      showScaleAnimation: this.props.dateDelivery ? new Animated.Value(1) : new Animated.Value(0),
      isDeliveryToDate: !!this.props.dateDelivery,
      showDateTimePicker: !!this.props.dateDelivery,
      date: this.props.dateDelivery
    }

    this.setTypeDeliveryDateOptions()
  }

  componentDidMount() {
    if (!this.props.isWorkTime)
      this.setState({ date: this.getMinDate() },
        () => this.onChangeDate())
  }

  showDateTimePicker = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 200, true,
      () => this.onChangeDate())
  }
  hideDateTimePicker = () => {
    timingAnimation(this.state.showScaleAnimation,
      0,
      200,
      true,
      () => this.setState({
        showDateTimePicker: false,
        date: null,
      },
        () => this.onChangeDate()
      )
    )

  }

  showInfoMessage = message => {
    showMessage({
      message: message,
      type: 'info',
      duration: 5000
    });
  }

  onToggleSwitch = () => {
    this.setState({ isDeliveryToDate: !this.state.isDeliveryToDate })
  }

  isAllowPreorderCheckout = () => {
    const minDate = this.getMinDate()
    const maxDate = this.getMaxDate()

    return true
  }

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

  onChangeDate = () => {
    if (this.props.changeDeliveryDate)
      this.props.changeDeliveryDate(this.state.date)
  }

  changeDate = date => {
    let isWorkTimeForDelivery = isWorkTime(this.props.deliverySettings.TimeDelivery, date)
    let isValidDayForDelivery = isWorkTimeForDelivery || isValidDay(date, this.props.deliverySettings.TimeDelivery)

    if (isWorkTimeForDelivery)
      this.setState({ date }, this.onChangeDate)
    else if (!isValidDayForDelivery) {
      this.invalidDayMessage(date)
      this.setState({ date: this.getMinDate() }, this.onChangeDate)
    } else {
      this.invalidTimeMessage(date)
      this.setState({ date: this.getMinDate() }, this.onChangeDate)
    }
  }

  invalidDayMessage = date => {
    this.showInfoMessage(`${toStringDate(date)} выходной день`)
  }

  invalidTimeMessage = date => {
    const timeWorkPeriod = getTimePeriodByDayFromDate(this.props.deliverySettings.TimeDelivery, date)

    if (timeWorkPeriod.isHoliday)
      this.invalidDayMessage(date)
    else {
      const msg = `Режим работы ${toStringDate(date)} c ${timeWorkPeriod.periodStart} до ${timeWorkPeriod.periodEnd}`
      this.showInfoMessage(msg)
    }
  }

  getMinDate = () => {
    let date = new Date()
    let minTimeProcessingOrder = this.props.deliverySettings ?
      this.props.deliverySettings.MinTimeProcessingOrder.split(':').map(p => parseInt(p)) : [1, 0]
    const shiftHours = minTimeProcessingOrder[0]
    const shiftMinutes = minTimeProcessingOrder[1]
    const setShift = dateForShift => {
      dateForShift.setHours(dateForShift.getHours() + shiftHours)
      dateForShift.setMinutes(dateForShift.getMinutes() + shiftMinutes)
    }

    setShift(date)

    let isWorkTimeForDelivery = isWorkTime(this.props.deliverySettings.TimeDelivery, date)

    if (!isWorkTimeForDelivery) {
      date = nearestWorkingStartDate(this.props.deliverySettings.TimeDelivery, new Date())
      setShift(date)
    }

    return date
  }

  getMaxDate = () => {
    let shiftDay = this.props.deliverySettings ? this.props.deliverySettings.MaxPreorderPeriod : 0;
    let date = new Date()

    date.setHours(23, 59, 0, 0)

    if (shiftDay != 0)
      date.setDate(date.getDate() + shiftDay)
    else if (!this.props.isWorkTime || date < this.getMinDate()) {
      date = nearestWorkingEndDate(this.props.deliverySettings.TimeDelivery, new Date())
    }

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
            disabled={!this.props.isWorkTime}
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
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
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
              maximumDate={this.maxDate}
              onDateChange={this.changeDate}
            />
          </Animated.View>
        }
      </View>
    )
  }
}