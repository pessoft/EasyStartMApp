import React from 'react'
import {
  View,
  Text,
  TouchableOpacity

} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import DatePicker from 'react-native-date-picker'

export class DatePickerBirthday extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: props.date
    }
  }

  changeDate = date => this.setState({ date })

  render() {
    return (
      <RBSheet
        ref={ref => {
          this.DatePicker = ref;
        }}
      >
        <View style={Style.dateHeaderContainer}>
          <TouchableOpacity
            onPress={() => this.DatePicker.close()}
            style={Style.dateHeaderButton}
          >
            <Text style={Style.dateHeaderButtonCancel}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.DatePicker.close()}
            style={[Style.dateHeaderButton]}
          >
            <Text style={Style.dateHeaderButtonDone}>Готово</Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          mode={'date'}
          textColor={this.props.style.theme.primaryTextColor.color}
          fadeToColor={this.props.style.theme.backdoor.backgroundColor}
          date={this.state.date}
          onDateChange={this.changeDate}
        />
      </RBSheet>
    )
  }
}