import React from 'react'
import { Animated, Text, Switch, View, TextInput, Platform } from 'react-native'
import { timingAnimation } from '../../../animation/timingAnimation'
import Styles from './style'

export class CheckoutCashback extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: this.props.animation ? new Animated.Value(0) : 0,
      needCashBack: this.props.needCashBackInit,
      cashBack: 0,
      isHideInputCashBack: !this.props.needCashBackInit
    }

    if (this.state.needCashBack)
      this.state.showScaleAnimation.addListener(({ value }) => this._value = value);
  }

  toggleHideInputCashBack = callback => {
    this.setState(
      {
        isHideInputCashBack: !this.state.needCashBack
      },
      () => {
        if (callback)
          callback()
      })
  }

  disabledAction = () => {
    if (this.state.needCashBack)
      this.setState(
        {
          needCashBack: false,
          cashBack: 0
        },
        () => this.changeCashback())
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.disabled)
      this.disabledAction()

    if (this.state.needCashBack != prevState.needCashBack) {
      if (this.props.animation)
        this.toggleAnimationInputCashBack()
      else
        this.toggleInputCashBack()
    }
  }

  toggleAnimationInputCashBack = () => {
    if (this.state.needCashBack) {
      const show = () => timingAnimation(this.state.showScaleAnimation, 1, 200, true)
      this.toggleHideInputCashBack(show)
    }
    else
      timingAnimation(this.state.showScaleAnimation, 0, 200, true, () => this.toggleHideInputCashBack())
  }

  toggleInputCashBack = () => {
    if (this.state.needCashBack)
      this.setState({ showScaleAnimation: 1 }, () => this.toggleHideInputCashBack())
    else
      this.setState({ showScaleAnimation: 0 }, () => this.toggleHideInputCashBack())
  }

  onToggleSwitch = () => {
    this.setState(
      {
        needCashBack: !this.state.needCashBack,
        cashBack: 0
      },
      () => this.changeCashback())
  }

  changeCashback = () => {
    if (this.props.changeCashBack)
      this.props.changeCashBack(
        {
          needCashBack: this.state.needCashBack,
          cashBack: this.state.cashBack
        }
      )
  }

  onChangeCashBack = cashBack => {
    try {
      cashBack = parseFloat(cashBack)
      if (cashBack == '' || Number.isNaN(cashBack))
        cashBack = 0
    } catch {
      cashBack = 0
    }

    this.setState({ cashBack },
      () => this.changeCashback())
  }

  renderTextInputCashBack = () => {
    return (
      <Animated.View
        style={[
          Styles.cashBackInputContainer,
          {
            opacity: this.state.showScaleAnimation,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        <TextInput
          placeholder='Нужна сдача с ...'
          keyboardType={'decimal-pad'}
          value={this.state.cashBack == 0 ? '' : this.state.cashBack.toString()}
          placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
          style={[
            Styles.inputText,
            Styles.inputSize,
            this.props.style.fontSize.h8,
            this.props.style.theme.primaryTextColor,
            this.props.style.theme.dividerColor]}
          onChangeText={this.onChangeCashBack}
        />
      </Animated.View>
    )
  }

  render() {
    return (
      <View>
        <View style={[
          Styles.switch,
          this.props.style.theme.dividerColor
        ]}>
          <Text
            style={[
              this.props.style.fontSize.h8,
              (this.props.disabled ? this.props.style.theme.secondaryTextColor : this.props.style.theme.textPrimaryColor)
            ]}>
            Нужна сдача
          </Text>
          <Switch
            disabled={this.props.disabled}
            onValueChange={this.onToggleSwitch}
            value={this.state.needCashBack}
            trackColor={{
              true: this.props.style.theme.themeBody.backgroundColor,
              false: this.props.style.theme.themeBody.backgroundColor
            }}
            thumbColor={[
              (this.state.needCashBack ?
                this.props.style.theme.textPrimaryColor.color :
                this.props.style.theme.secondaryTextColor.color)]}
            ios_backgroundColor={this.props.style.theme.themeBody.backgroundColor}
            style={[this.props.style.theme.dividerColor]}
          />
        </View>
        {
          !this.state.isHideInputCashBack && this.renderTextInputCashBack()
        }

      </View>
    )
  }
}