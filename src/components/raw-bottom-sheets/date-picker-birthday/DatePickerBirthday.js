import React from 'react'
import {
  View,
} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import DatePicker from 'react-native-date-picker'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'

export class DatePickerBirthday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: props.date ? new Date(props.date) : new Date()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.toggle && this.props.toggle)
      this.DatePicker.open()
    else if (prevProps.toggle && !this.props.toggle)
      this.DatePicker.close()
  }

  changeDate = date => this.setState({ date })

  onClose = () => {
    if (this.props.onClose)
      this.props.onClose()
  }

  onDone = () => {
    if (this.props.onDone) {
      let date = new Date(this.state.date)
      date.setHours(6)
      this.props.onDone(date)
    }
  }

  render() {
    return (
      <RBSheet
        onClose={this.onClose}
        animationType='fade'
        duration={200}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: this.props.style.theme.navigationBottom.backgroundColor,
          }
        }}
        ref={ref => {
          this.DatePicker = ref;
        }}
      >
        <View style={[
          Style.dateHeaderContainer,
          this.props.style.theme.dividerColor
        ]}>
          <View style={Style.button}>
            <SimpleTextButton
              text='Отмена'
              onPress={() => this.DatePicker.close()}
              sizeText={this.props.style.fontSize.h7.fontSize}
              color={this.props.style.theme.primaryTextColor.color}
              margin={10}
            />
          </View>
          <View style={Style.button}>
            <SimpleTextButton
              text='Готово'
              onPress={() => this.onDone()}
              sizeText={this.props.style.fontSize.h7.fontSize}
              color={this.props.style.theme.primaryTextColor.color}
              margin={10}
            />
          </View>
        </View>
        <View style={Style.datePickerContainer}>
          <DatePicker
            androidVariant='nativeAndroid'
            mode={'date'}
            textColor={this.props.style.theme.primaryTextColor.color}
            fadeToColor={this.props.style.theme.backdoor.backgroundColor}
            date={this.state.date}
            onDateChange={this.changeDate}
          />
        </View>
      </RBSheet>
    )
  }
}