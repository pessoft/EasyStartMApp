import React from 'react'
import { connect } from 'react-redux'
import { Animated, View, Text, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native';
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { sendNewOrder } from '../../../store/checkout/actions'

class CheckoutCompleteScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Формирование заявки',
  }

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
    if(!this.props.isFetching && !this.props.isError) {
      timingAnimation(this.state.showScaleAnimationSuccess, 1, 200, true)
    } else if (!this.props.isFetching && this.props.isError) {
      timingAnimation(this.state.showScaleAnimationError, 1, 200, true)
    }
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
            Style.marginText,
          ]}>
          Пожалуйста подождите
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.marginText
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
            Style.marginText,
          ]}>
          Заказ # {this.props.orderNumber}
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.marginText
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
            Style.marginText,
          ]}>
          Заказ не оформлен
        </Text>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.marginText,
            {flexWrap: 'wrap'}
          ]}>
          При оформлении заказа что-то пошло не так
        </Text>
      </Animated.View>
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

export default connect(mapStateToProps, { sendNewOrder })(CheckoutCompleteScreen)