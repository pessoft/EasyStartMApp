import React from 'react'
import { connect } from 'react-redux'
import { Animated, View, Text, Dimensions, Button } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { sendNewOrder } from '../../../store/checkout/actions'
import { MAIN } from '../../../navigation/pointsNavigate'
import {
  toggleProductInBasket,
  changeTotalCountProductInBasket,
  toggleConstructorProductInBasket
} from '../../../store/checkout/actions'

class CheckoutCompleteScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimationLoader: new Animated.Value(0),
      showScaleAnimationSuccess: new Animated.Value(0),
      showScaleAnimationError: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    this.props.sendNewOrder(this.props.order)
    timingAnimation(this.state.showScaleAnimationLoader, 1, 200, true)
  }

  componentDidUpdate = () => {
    if (!this.props.isFetching && !this.props.isError) {
      timingAnimation(this.state.showScaleAnimationSuccess, 1, 200, true)
    } else if (!this.props.isFetching && this.props.isError) {
      timingAnimation(this.state.showScaleAnimationError, 1, 200, true)
    }
  }

  onFinishCheckout = () => {
    this.props.toggleProductInBasket({})
    this.props.toggleConstructorProductInBasket({})
    this.props.changeTotalCountProductInBasket(0)

    this.props.navigation.navigate(MAIN)
  }

  renderLoader = () => {
    return (
      <Animated.View
        style={[
          Style.container,
          {
            opacity: this.state.showScaleAnimationLoader,
            transform: [{ scale: this.state.showScaleAnimationLoader }]
          }]}>
        <LottieView
          style={Style.loader}
          source={require('../../../animation/src/food-loader.json')}
          autoPlay
          resizeMode='cover'
          autoSize={true}
          speed={1.5} />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText,
          ]}>
          Пожалуйста подождите
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText
          ]}>
          Идет формирование заявки...
        </Text>
      </Animated.View>
    )
  }

  renderSuccess = () => {
    return (
      <Animated.View
        style={[
          Style.container,
          {
            opacity: this.state.showScaleAnimationSuccess,
            transform: [{ scale: this.state.showScaleAnimationSuccess }]
          }]}>
        <LottieView
          style={Style.success}
          source={require('../../../animation/src/success.json')}
          autoPlay
          loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} />

        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText,
          ]}>
          Заказ #{this.props.orderNumber}
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText
          ]}>
          Успешно оформлен
        </Text>
      </Animated.View>
    )
  }

  renderError = () => {
    return (
      <Animated.View
        style={[
          Style.container,
          {
            opacity: this.state.showScaleAnimationError,
            transform: [{ scale: this.state.showScaleAnimationError }]
          }]}>
        <LottieView
          style={Style.error}
          source={require('../../../animation/src/error.json')}
          autoPlay
          loop={false}
          resizeMode='cover'
          autoSize={true}
          speed={1} />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText,
          ]}>
          Заказ не оформлен
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.infoText,
            { flexWrap: 'wrap' }
          ]}>
          При оформлении заказа что-то пошло не так
        </Text>
      </Animated.View>
    )
  }

  renderButtonOk = () => {
    return (
      <View style={[Style.buttonOk]}>
        <Button
          title='Готово'
          onPress={this.onFinishCheckout}
          color={Platform.OS == 'ios' ?
            this.props.style.theme.primaryTextColor.color :
            this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </View>
    )
  }

  render() {
    return (
      <View style={[
        this.props.style.theme.themeBody,
        Style.container,
      ]}>
        {this.props.isFetching && this.renderLoader()}
        {!this.props.isFetching && !this.props.isError && this.renderSuccess()}
        {!this.props.isFetching && this.props.isError && this.renderError()}
        {!this.props.isFetching && this.renderButtonOk()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    order: state.checkout.lastOrder,
    isFetching: state.checkout.isFetching,
    isError: state.checkout.isError,
    orderNumber: state.checkout.lastOrderNumber,
  }
}

const mapActionToProps = {
  sendNewOrder,
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(CheckoutCompleteScreen)