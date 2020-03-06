import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity

} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import { ButtonWithoutFeedback } from '../../../components/buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'

export class PartnersCode extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      code: null
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.toggle && this.props.toggle)
      this.Input.open()
    else if (prevProps.toggle && !this.props.toggle)
      this.Input.close()
  }

  onClose = () => {
    if (this.props.onClose)
      this.props.onClose()
  }

  isValidData = () => !!this.state.code

  changeCode = code => this.setState({ code })

  done = () => this.Input.close()

  render() {
    return (
      <RBSheet
        ref={ref => {
          this.Input = ref;
        }}
        height={60}
        animationType='fade'
        duration={200}
        onClose={this.onClose}
        customStyles={{
          container: {
            backgroundColor: this.props.style.theme.navigationBottom.backgroundColor
          }
        }}
      >
        <View style={[
          Style.inputContainer,
          this.props.style.theme.dividerColor,
          this.props.style.theme.navigationBottom,
        ]}>
          <TextInput style={[
            Style.input,
            this.props.style.fontSize.h9,
            this.props.style.theme.primaryTextColor,
            this.props.style.theme.dividerColor,
            this.props.style.theme.navigationBottom
          ]}
            value={this.state.code}
            autoFocus
            placeholder="Введите реферальный код ..."
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            onChangeText={this.changeCode}
          />
          <ButtonWithoutFeedback
            text='Готово'
            style={this.props.style}
            disabled={!this.isValidData()}
            borderRadius={5}
            fontSize={this.props.style.fontSize.h9.fontSize}
            onPress={this.done}
          />
        </View>
      </RBSheet>
    )
  }
}