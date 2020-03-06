import React from 'react'
import {
  View,
  TextInput,
  ActivityIndicator

} from 'react-native'
import Style from './style'
import RBSheet from 'react-native-raw-bottom-sheet'
import { ButtonWithoutFeedback } from '../../../components/buttons/ButtonWithoutFeedback/ButtonWithoutFeedback'

export class PartnersCode extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      code: null,
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

  done = () => {
    if (this.props.setParentReferral)
      this.props.setParentReferral(this.state.code)
  }

  renderLoad = () => {
    return (
      <View style={[
        Style.loader,
        this.props.style.theme.defaultPrimaryColor
      ]}>
        <ActivityIndicator size='small' color={this.props.style.theme.textPrimaryColor.color} />
      </View>
    )
  }

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
          <View style={[
            Style.container,
            {
              borderColor: this.props.style.theme.darkPrimaryColor.backgroundColor
            }
          ]}>
            <TextInput style={[
              Style.input,
              this.props.style.fontSize.h9,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.navigationBottom
            ]}
              value={this.state.code}
              autoFocus
              placeholder="Введите реферальный код ..."
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              onChangeText={this.changeCode}
            />
            {
              !this.props.isFetching &&
              <ButtonWithoutFeedback
                text='Готово'
                style={this.props.style}
                disabled={!this.isValidData()}
                borderRadius={4}
                borderLeftRadius={0}
                fontSize={this.props.style.fontSize.h9.fontSize}
                onPress={this.done}
              />
            }
            {
              this.props.isFetching &&
              this.renderLoad()
            }
          </View>
        </View>
      </RBSheet>
    )
  }
}