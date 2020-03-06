import React from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import Style from './style'
import Slider from '@react-native-community/slider';

export class NumberAppliances extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: this.props.numberAppliances
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.numberAppliances != this.props.numberAppliances &&
      this.props.numberAppliances != this.state.count) {
      this.setState({ count: this.props.numberAppliances })
    }
  }

  onChangeNumberAppliances = value => {
    if (this.props.changeNumberAppliances) {
      this.props.changeNumberAppliances(value)
    }
  }

  changeCount = count => this.setState({ count })

  render() {
    return (
      <View style={[
        Style.contacts,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
      ]}>
        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Количество приборов
          </Text>
        </View>
        <View
          style={Style.content}
        >
          <View style={[
            Style.counterContainer,
            Style.inputSize,
          ]}>
            <Text style={[
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
            ]}>
              {this.state.count}
            </Text>
          </View>
          <Slider
            style={Style.inputSize}
            minimumValue={1}
            maximumValue={20}
            value={this.props.numberAppliances}
            step={1}
            minimumTrackTintColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
            maximumTrackTintColor={this.props.style.theme.secondaryTextColor.color}
            thumbTintColor={this.props.style.theme.darkPrimaryColor.backgroundColor}
            onValueChange={this.changeCount}
            onSlidingComplete={this.onChangeNumberAppliances}
          />
        </View>
      </View>
    )
  }
}