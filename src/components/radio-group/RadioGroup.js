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

  onChange = value => {
    this.setState({ value: value }, () => {
      if (this.props.changeRadio) {
        this.props.changeRadio(this.state.value)
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
                style={this.props.radioProps.length - 1 == i ? {} : { marginBottom: 15 }}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.state.value == obj.value}
                  onPress={this.onChange}
                  borderWidth={1}
                  buttonInnerColor={this.props.style.theme.defaultPrimaryColor.backgroundColor}
                  buttonOuterColor={this.props.style.theme.accentColor.backgroundColor}
                  buttonSize={14}
                  buttonOuterSize={20}
                  buttonStyle={[this.props.style.theme.themeBody]}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={this.onChange}
                  labelStyle={{
                    fontSize: this.props.style.fontSize.h8.fontSize,
                    color: this.props.style.theme.primaryTextColor.color
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