import React from 'react'
import { View, Text } from 'react-native'
import Style from './style'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'

export class PartnersHeaderBlock extends React.Component {

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.shadowColor,
        this.props.style.theme.navigationHeader,
        this.props.style.theme.dividerColor,
      ]}>
        <View style={[
          Style.itemRow,
          Style.buttonRefCodeContainer
        ]}>
          <SimpleTextButton
            text='Ввести реферальный код'
            // onPress={this.goToRegistrationPage}
            alignItems='flex-start'
            sizeText={this.props.style.fontSize.h9.fontSize}
            color={this.props.style.theme.primaryTextColor.color}
          />
        </View>
        <View style={Style.itemRow}>
          <Text
            style={[
              Style.textCenter,
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h0,
            ]}>
            {this.props.mainText}
          </Text>
        </View>
        <View style={[
          Style.itemRow,
          Style.secondTextContainer
        ]}>
          <Text
            style={[
              Style.textCenter,
              this.props.style.theme.textPrimaryColor,
              this.props.style.fontSize.h9,
            ]}>
            {this.props.secondText}
          </Text>
        </View>
      </View>
    )
  }
}