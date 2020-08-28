import React from 'react'
import { View, Text } from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from '../radio-button/RadioButton'

/**
 * initValue
 * radioProps = [
 *  {label: 'label', value: 0}
 * ],
 * changeRadio = function(value)
 */
export class RadioGroup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.initValue
    }
  }

  componentDidUpdate(prevPros) {
    if (typeof (this.props.value) !== 'undefined' &&
      prevPros.value != this.props.value &&
      this.props.value != this.state.value)
      this.setState({ value: this.props.value })
  }

  onChange = (value, index) => {
    this.setState({ value: value }, () => {
      if (this.props.changeRadio) {
        const returnedValue = this.props.returnObject ? this.props.radioProps[index] : this.state.value
        this.props.changeRadio(returnedValue)
      }
    })
  }

  render() {
    return (
      <View>
        <RadioForm onPress={this.onChange} animation={true}>
          {this.props.radioProps.map((obj, i) => {
            return (
              <RadioButton
                labelHorizontal={true}
                key={i}
                disabled={obj.disabled || false}
                style={this.props.radioProps.length - 1 == i ? {} : { marginBottom: 15 }}>
                <RadioButtonInput
                  disabled={obj.disabled || false}
                  obj={obj}
                  index={i}
                  isSelected={this.state.value == obj.value}
                  onPress={this.onChange}
                  borderWidth={1}
                  buttonInnerColor={this.props.style.theme.secondaryTextColor.color}
                  buttonOuterColor={this.props.style.theme.secondaryTextColor.color}
                  buttonSize={12}
                  buttonOuterSize={20}
                  buttonStyle={[this.props.style.theme.themeBody]}
                />
                <RadioButtonLabel
                  disabled={obj.disabled || false}
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={this.onChange}
                  labelStyle={{
                    fontSize: this.props.style.fontSize.h8.fontSize,
                    color: !obj.disabled ? this.props.style.theme.primaryTextColor.color : this.props.style.theme.secondaryTextColor.color
                  }}
                  labelWrapStyle={{}}
                />
              </RadioButton>)
          })}
        </RadioForm>
      </View>
    )
  }
}