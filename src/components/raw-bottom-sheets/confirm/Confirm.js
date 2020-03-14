import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import { ButtonWithoutFeedback } from '../../../components/buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'
import { ButtonWithoutFeedbackOutline } from '../../../components/buttons/ButtonWithoutFeedbackOutline/ButtonWithoutFeedbackOutline'
export class Confirm extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.toggle && this.props.toggle)
      this.Message.open()
    else if (prevProps.toggle && !this.props.toggle)
      this.Message.close()
  }

  onCancel = () => {
    if (this.props.cancel) {
      this.props.cancel()
    }
  }

  onConfirm = () => {
    if (this.props.confirm) {
      this.props.confirm()
    }
  }

  render() {
    return (
      <RBSheet
        ref={ref => {
          this.Message = ref;
        }}
        animationType='fade'
        duration={200}
        customStyles={{
          container: {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            backgroundColor: this.props.style.theme.navigationBottom.backgroundColor,
          }
        }}
        onClose={this.onCancel}
      >
        <View style={Style.container}>
          <View style={Style.messageContainer}>
            <Text style={[
              Style.messageTitle,
              this.props.style.fontSize.h5,
              this.props.style.theme.primaryTextColor
            ]}>
              {this.props.title}
            </Text>
            <Text style={[
              Style.message,
              this.props.style.fontSize.h7,
              this.props.style.theme.primaryTextColor
            ]}>
              {this.props.message}
            </Text>
          </View>
          <View style={Style.messageButtonContainer}>
            <View style={Style.buttonContainer}>
              <ButtonWithoutFeedbackOutline
                text='НЕТ'
                height={40}
                style={this.props.style}
                borderRadius={5}
                onPress={this.onCancel}
              />
            </View>
            <View style={Style.buttonContainer}>
              <ButtonWithoutFeedback
                text='ДА'
                height={40}
                style={this.props.style}
                borderRadius={5}
                onPress={this.onConfirm}
              />
            </View>
          </View>
        </View>
      </RBSheet>
    )
  }
}