import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native'
import Style from './style'
import LottieView from 'lottie-react-native';

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
    if (this.props.oncActivateCoupon)
      this.props.oncActivateCoupon(this.state.promotionCode)
  }

  render() {
    return (
      <View style={[
        Style.contacts,
        this.props.style.theme.backdoor,
        this.props.style.theme.dividerColor
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
          <TextInput
            placeholder='Промокод'
            value={this.state.promotionCode}
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.inputText,
              Style.inputSize,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor]}
            onChangeText={this.onPromotionCodeChange}
          />
          {
            !this.props.isProcessingActivation &&
            !this.props.isActivated &&
            <Button
              title='Активировать'
              onPress={this.activateCoupon}
              disabled={this.isDisabled()}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.primaryTextColor.color :
                this.props.style.theme.defaultPrimaryColor.backgroundColor}
            />
          }
          {
            this.props.isProcessingActivation &&
            !this.props.isActivated &&
            <View style={{ flex: 0.3 }}>
              <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
            </View>
          }
          {
            this.props.isActivated &&
            <View style={{ flex: 0.3 }}>
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