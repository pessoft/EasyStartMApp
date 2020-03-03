import React from 'react'
import {
  View,
  Text,
  TextInput,
  Picker
} from 'react-native'
import Style from './style'
import { getSVGColor } from '../../../helpers/color-helper'
import IcoDeliveryAddress from '../../../images/font-awesome-svg/truck-loading.svg'

export class DeliveryAddress extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cityId: props.cityId,
      areaDeliveryId: -1,
      street: '',
      houseNumber: '',
      entrance: '',
      apartmentNumber: '',
      level: '',
      intercomCode: ''
    }
  }

  onChangeDeliveryAddress = () => {
    if (this.props.changeDeliveryAddress)
      this.props.changeDeliveryAddress({ ...this.state })
  }

  onChangeStreet = street => this.setState({ street }, () => this.onChangeDeliveryAddress())
  onChangeHouseNumber = houseNumber => this.setState({ houseNumber }, () => this.onChangeDeliveryAddress())
  onChangeEntrance = entrance => this.setState({ entrance }, () => this.onChangeDeliveryAddress())
  onChangeApartmentNumber = apartmentNumber => this.setState({ apartmentNumber }, () => this.onChangeDeliveryAddress())
  onChangeLevel = level => this.setState({ level }, () => this.onChangeDeliveryAddress())
  onChangeIntercomCode = intercomCode => this.setState({ intercomCode }, () => this.onChangeDeliveryAddress())
  onChangeDeliveryArea = areaDeliveryId => this.setState({ areaDeliveryId }, () => this.onChangeDeliveryAddress())

  render() {
    return (
      <View style={[
        Style.container,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor,
        this.props.style.theme.shadowColor,
      ]}>

        <View style={Style.header}>
          <Text style={[
            this.props.style.fontSize.h6,
            this.props.style.theme.primaryTextColor,
          ]}>
            Адрес доставки
          </Text>
        </View>
        <View style={Style.content}>

          <Picker
            selectedValue={this.state.areaDeliveryId}
            style={[
              this.props.style.theme.secondaryTextColor,
              this.props.style.fontSize.h8,

            ]}
            itemStyle={[
              { height: 100 },
              this.props.style.theme.secondaryTextColor,
              this.props.style.fontSize.h8]}
            onValueChange={(this.onChangeDeliveryArea)
            }>
            <Picker.Item label="Выберите район доставки" value="-1" />
            {this.props.areaDeliveries &&
              this.props.areaDeliveries.map(p => <Picker.Item key={p.UniqId.toString()} label={p.NameArea} value={p.UniqId} />)}

          </Picker>
          <TextInput
            placeholder='Улица'
            value={this.state.street}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.inputBigSize,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onChangeStreet}
            returnKeyType={'next'}
            onSubmitEditing={() => { this.houseNumberTextInput.focus() }}
            blurOnSubmit={false}
          />
          <View style={Style.wrapperRow}>
            <TextInput
              placeholder='Дом, корпус'
              ref={(input) => { this.houseNumberTextInput = input; }}
              value={this.state.houseNumber}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSmallSize,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onChangeHouseNumber}
              returnKeyType={'next'}
              onSubmitEditing={() => { this.entranceTextInput.focus() }}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder='Подъезд'
              ref={(input) => { this.entranceTextInput = input; }}
              value={this.state.entrance}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSmallSize,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onChangeEntrance}
              returnKeyType={'next'}
              onSubmitEditing={() => { this.apartmentNumberTextInput.focus() }}
              blurOnSubmit={false}
            />
          </View>
          <View style={Style.wrapperRow}>
            <TextInput
              placeholder='Квартира (офис)'
              ref={(input) => { this.apartmentNumberTextInput = input; }}
              value={this.state.apartmentNumber}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSmallSize,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onChangeApartmentNumber}
              returnKeyType={'next'}
              onSubmitEditing={() => { this.levelTextInput.focus() }}
              blurOnSubmit={false}
            />
            <TextInput
              placeholder='Этаж'
              ref={(input) => { this.levelTextInput = input; }}
              value={this.state.level}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSmallSize,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onChangeLevel}
              returnKeyType={'next'}
              onSubmitEditing={() => { this.intercomCodeTextInput.focus() }}
              blurOnSubmit={false}
            />
          </View>
          <View style={Style.wrapperRow}>
            <TextInput
              placeholder='Код домофона'
              ref={(input) => { this.intercomCodeTextInput = input; }}
              value={this.state.intercomCode}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.inputSmallSize,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onChangeIntercomCode}
            />
            <View
              style={[
                Style.inputSmallSize,
                Style.icoDeliveryAddress
              ]}>
              <IcoDeliveryAddress
                width={32}
                height={32}
                color={getSVGColor(this.props.style.theme.secondaryTextColor.color)} />
            </View>
          </View>

        </View>
      </View>
    )
  }
}