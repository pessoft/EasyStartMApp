import React from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Platform,
  Dimensions
} from 'react-native'
import Style from './style'
import LottieView from 'lottie-react-native';
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { showMessage } from 'react-native-flash-message'

const min320 = Dimensions.get('window').width <= 320

export class Coupon extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      promotionCode: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isProcessingActivation &&
      !this.props.isProcessingActivation &&
      !this.props.isActivated) {
      const msg = 'Промокод не верен или недействителен'

      this.showErrorMessage(msg)
    }
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

  showErrorMessage = message => {
    showMessage({
      message: message,
      type: 'danger',
      duration: 3000
    });
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
          style={[
            Style.content,
            this.props.style.theme.dividerColor
          ]}
        >
          <View style={[
            Style.itemContainer,
            Style.borderRight,
            this.props.style.theme.dividerColor
          ]}>
            <TextInput
              placeholder='Промокод'
              value={this.state.promotionCode}
              placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
              style={[
                Style.inputText,
                min320 ?
                  this.props.style.fontSize.h10 :
                  this.props.style.fontSize.h8,
                this.props.style.theme.primaryTextColor
              ]}
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
                sizeText={min320 ?
                  this.props.style.fontSize.h10.fontSize :
                  this.props.style.fontSize.h8.fontSize}
                color={this.props.style.theme.primaryTextColor.color}
                disabledColor={this.props.style.theme.secondaryTextColor.color}
              />
            </View>
          }
          {
            this.props.isProcessingActivation &&
            !this.props.isActivated &&
            <View style={Style.itemContainer}>
              <ActivityIndicator size='small' color={this.props.style.theme.lightPrimaryColor.backgroundColor} />
            </View>
          }
          {
            this.props.isActivated &&
            <View style={{ flex: 0.3 }}>
              <LottieView
                style={Style.loader}
                source={require('../../../animation/src/check-success.json')}
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