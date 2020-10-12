import React from 'react'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import { Picker } from '@react-native-community/picker'
import Style from './style'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'

export class DeliveryAddress extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      cityId: props.address.cityId,
      areaDeliveryId: props.address.areaDeliveryId,
      street: props.address.street,
      houseNumber: props.address.houseNumber,
      entrance: props.address.entrance,
      apartmentNumber: props.address.apartmentNumber,
      level: props.address.level,
      intercomCode: props.address.intercomCode,
      isShowSaveButton: false,
      isHideArea: this.isOneArea()
    }
  }

  componentDidMount() {
    if (this.isOneArea()) {
      const areaDelivery = this.props.areaDeliveries[0]

      if(areaDelivery.UniqId != this.state.areaDeliveryId)
        this.onChangeDeliveryArea(areaDelivery.UniqId)
    }
      
  }

  isOneArea = () => {
    return this.props.areaDeliveries.length == 1
  }

  onChangeDeliveryAddress = () => {
    if (this.props.changeDeliveryAddress) {
      this.props.changeDeliveryAddress({
        cityId: this.state.cityId,
        areaDeliveryId: this.state.areaDeliveryId,
        street: this.state.street,
        houseNumber: this.state.houseNumber,
        entrance: this.state.entrance,
        apartmentNumber: this.state.apartmentNumber,
        level: this.state.level,
        intercomCode: this.state.intercomCode,
      })

      this.setState({ isShowSaveButton: true })
    }
  }

  onChangeStreet = street => this.setState({ street }, () => this.onChangeDeliveryAddress())
  onChangeHouseNumber = houseNumber => this.setState({ houseNumber }, () => this.onChangeDeliveryAddress())
  onChangeEntrance = entrance => this.setState({ entrance }, () => this.onChangeDeliveryAddress())
  onChangeApartmentNumber = apartmentNumber => this.setState({ apartmentNumber }, () => this.onChangeDeliveryAddress())
  onChangeLevel = level => this.setState({ level }, () => this.onChangeDeliveryAddress())
  onChangeIntercomCode = intercomCode => this.setState({ intercomCode }, () => this.onChangeDeliveryAddress())
  onChangeDeliveryArea = areaDeliveryId => this.setState({ areaDeliveryId }, () => this.onChangeDeliveryAddress())
  onSaveDeliveryAddress = () => {
    if (this.props.saveDeliveryAddress) {
      this.props.saveDeliveryAddress()
      this.setState({ isShowSaveButton: false })
    }

  }

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
          {
            !(this.props.isHideArea || this.state.isHideArea) &&
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
              <Picker.Item label="Выберите район доставки" value={-1} />
              {this.props.areaDeliveries &&
                this.props.areaDeliveries.map(p => <Picker.Item key={p.UniqId.toString()} label={p.NameArea} value={p.UniqId} />)}

            </Picker>
          }

          <TextInput
            placeholder='Улица*'
            value={this.state.street}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.mr_bt_0,
              Style.b_bt_l_r_0,
              Style.b_bt_r_r_0,
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
              placeholder='Дом, корпус*'
              ref={(input) => { this.houseNumberTextInput = input; }}
              value={this.state.houseNumber}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.b_r_0,
                Style.mr_tp_0,
                Style.b_tp_w_0,
                Style.b_r_w_0,
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
                Style.b_r_0,
                Style.mr_tp_0,
                Style.b_tp_w_0,
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
              placeholder='№ кв-ры/офиса'
              ref={(input) => { this.apartmentNumberTextInput = input; }}
              value={this.state.apartmentNumber}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                Style.b_r_0,
                Style.mr_tp_0,
                Style.b_tp_w_0,
                Style.b_bt_w_0,
                Style.b_r_w_0,
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
                Style.b_r_0,
                Style.mr_tp_0,
                Style.b_tp_w_0,
                Style.b_bt_w_0,
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
          <TextInput
            placeholder='Код домофона'
            ref={(input) => { this.intercomCodeTextInput = input; }}
            value={this.state.intercomCode}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.mr_tp_0,
              Style.b_tp_l_r_0,
              Style.b_tp_r_r_0,
              Style.inputBigSize,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onChangeIntercomCode}
          />
        </View>
        {
          this.state.isShowSaveButton &&
          <SimpleTextButton
            text='Запомнить адрес'
            onPress={this.onSaveDeliveryAddress}
            sizeText={this.props.style.fontSize.h9.fontSize}
            color={this.props.style.theme.primaryTextColor.color}
            alignItems={'flex-end'}
          />
        }
      </View>
    )
  }
}