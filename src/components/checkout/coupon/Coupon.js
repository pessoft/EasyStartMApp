import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Platform
} from 'react-native'
import Style from './style'
import LottieView from 'lottie-react-native';
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'

export class Coupon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      promotionCode: '',
    }
  }

  componentDidUpdate() {

  }

  onPromotionCodeChange = promotionCode => this.setState({ promotionCode })

  isDisabled = () => {
    if (!this.state.promotionCode
      || this.props.isProcessingActivation
      || this.props.isActivated) {
      return true
    }

    return false
  }

  activateCoupon = () => {
    if (this.props.onActivateCoupon)
      this.props.onActivateCoupon(this.state.promotionCode)
  }

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
            Активировать купон
          </Text>
        </View>
        <View
          style={Style.content}
        >
          <View style={Style.itemContainer}>
            <TextInput
              placeholder='Промокод'
              value={this.state.promotionCode}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor,
                this.props.style.theme.dividerColor]}
              onChangeText={this.onPromotionCodeChange}
            />
          </View>
          {
            !this.props.isProcessingActivation &&
            !this.props.isActivated &&
            <View style={Style.itemContainer}>
              <SimpleTextButton
                text='Активировать'
                onPress={this.activateCoupon}
                disabled={this.isDisabled()}
                sizeText={this.props.style.fontSize.h8.fontSize}
                color={this.props.style.theme.primaryTextColor.color}
                disabledColor={this.props.style.theme.secondaryTextColor.color}
              />
            </View>
          }
          {
            this.props.isProcessingActivation &&
            !this.props.isActivated &&
            <View style={Style.itemContainer}>
              <ActivityIndicator size={30} color={this.props.style.theme.lightPrimaryColor.backgroundColor} />
            </View>
          }
          {
            this.props.isActivated &&
            <View style={{ flex: 0.5 }}>
              <LottieView
                style={Style.loader}
                source={require('../../../animation/src/success.json')}
                autoPlay
                loop={false}
                resizeMode='contain'
                speed={1} />
            </View>
          }
        </View>
      </View>
    )
  }
}