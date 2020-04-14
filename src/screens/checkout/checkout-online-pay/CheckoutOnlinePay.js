import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import { sendNewOrder, checkOnlinePayNewOrder } from '../../../store/checkout/actions'
import { MAIN } from '../../../navigation/pointsNavigate'
import { getStocks } from '../../../store/main/actions'
import { timingAnimation } from '../../../animation/timingAnimation'
import {
  toggleProductInBasket,
  changeTotalCountProductInBasket,
  toggleConstructorProductInBasket
} from '../../../store/checkout/actions'
import { dropFetchFlag } from '../../../store/checkout/actions'
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Picker,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native'

import {
  Currency,
  Order,
  Receipt,
  Failure,
  Cloudipsp,
  CardInput,
  CardLayout,
  CloudipspWebView
} from 'react-native-cloudipsp'

import {
  CardFieldNumber,
  CardFieldExpMm,
  CardFieldExpYy,
  CardFieldCvv
} from '../../../components/card-field-override'
import Style from './style'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { showMessage } from 'react-native-flash-message'
import { convertRubToKopeks } from '../../../helpers/utils'
import { FondyPayResponseType } from '../../../helpers/fondy-pay-response-type'

class CheckoutOnlinePay extends React.Component {
  static navigationOptions = {
    headerTitle: 'Онлайн оплата',
  }

  constructor(props) {
    super(props)
    this.state = {
      showScaleAnimation: new Animated.Value(0),
      showScaleAnimationLoader: new Animated.Value(0),
      showScaleAnimationSuccess: new Animated.Value(0),
      showScaleAnimationError: new Animated.Value(0),
      merchant: this.props.deliverySettings.MerchantId,
      amount: convertRubToKopeks(this.props.order.amountPayDiscountDelivery),
      ccy: 'RUB',
      email: this.props.userData.email,
      description: this.props.orderNumber.toString(),
      mode: 'flexible',
      isError: false,
      isClickPay: false,
      success: false
    }
  }

  componentDidMount = () => {
    this.props.sendNewOrder(this.props.order)
    timingAnimation(this.state.showScaleAnimationLoader, 1, 200, true)
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.isFetching && !this.props.isFetching) ||
      this.state.isError
    ) {
      this.resetBasketData()
    }

    if ((prevProps.isFetching && !this.props.isFetching && this.props.isError)
      || this.state.isError) {
      timingAnimation(this.state.showScaleAnimationError, 1, 200, true)

      if (!this.state.isError)
        this.showErrMessage(this.props.errorMessage)

    }

    if (this.props.isFetchingCheckOnlinePay)
      timingAnimation(this.state.showScaleAnimationLoader, 1, 200, true)

    if (prevProps.isFetchingCheckOnlinePay &&
      !this.props.isFetchingCheckOnlinePay &&
      !this.props.isErrorCheckOnlinePay) {
      this.setState({ success: true },
        () => timingAnimation(this.state.showScaleAnimationSuccess, 1, 200, true)
      )

      this.updateStocksAfterOrder()
    } else if (prevProps.isFetchingCheckOnlinePay &&
      !this.props.isFetchingCheckOnlinePay &&
      this.props.isErrorCheckOnlinePay) {
      timingAnimation(this.state.showScaleAnimationError, 1, 200, true)
      this.showErrMessage(this.props.errorMessageCheckOnlinePay)
    }
  }

  updateStocksAfterOrder() {
    const params = {
      clientId: this.props.userData.clientId,
      branchId: this.props.userData.branchId
    }

    this.props.getStocks(params)
  }

  resetBasketData = () => {
    this.props.toggleProductInBasket({})
    this.props.toggleConstructorProductInBasket({})
    this.props.changeTotalCountProductInBasket(0)
  }

  cloudipsp = () => {
    return new Cloudipsp(Number(this.state.merchant), (payConfirmator) => {
      this.setState({ webView: 1 })
      return payConfirmator(this.cloudipspWebView)
    })
  }

  showErrMessage = message => {
    showMessage({
      message: message,
      type: 'danger',
      duration: 10000
    })
  }

  getOrder = () => {
    return new Order(
      Number(this.state.amount),
      this.state.ccy,
      this.props.orderNumber,
      this.state.description,
      this.state.email
    );
  };

  pay = () => {
    const order = this.getOrder()
    const card = this.cardForm.getCard()
    if (!card.isValidCardNumber()) {
      this.errorCardDataInvalid('Некорректный номер карты')
    } else if (!card.isValidExpireMonth() ||
      !card.isValidExpireYear() ||
      !card.isValidExpireDate()) {
      this.errorCardDataInvalid('Cрок действия карты недействителен')
    } else if (!card.isValidCvv()) {
      this.errorCardDataInvalid('CVV не действителен')
    } else {
      const cloudipsp = this.cloudipsp()
      cloudipsp.pay(card, order)
        .then((receipt) => {
          this.setState({ webView: undefined })

          if (FondyPayResponseType.Approved == receipt.status) {
            this.props.checkOnlinePayNewOrder(this.props.orderNumber)
          } else {
            this.error('Платеж откланён')
          }
        })
        .catch((error) => {
          this.error(error.message)
        })
    }
  }

  errorCardDataInvalid = errMessage => {
    this.setState({ isClickPay: false })
    this.showErrMessage(errMessage)
  }

  error = message => {
    const actionShowMessage = message ? () => this.showErrMessage(message) : () => { }

    this.setState({ isError: true }, actionShowMessage)
  }

  renderScreen() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
        <KeyboardAvoidingView style={Style.screen} behavior='padding'>
          <View
            style={Style.body}>
            <Text style={[
              this.props.style.fontSize.h6,
              this.props.style.theme.primaryTextColor,
              Style.amountLabel
            ]}>
              Сумма к оплате: {this.props.order.amountPayDiscountDelivery} {this.props.currencyPrefix}
            </Text>
            <View style={Style.cardFrom}>
              {this.renderCardForm()}
            </View>
            <View style={Style.payButtonContainer}>
              <View style={Style.payButtonWrap}>
                {
                  this.state.isClickPay && <ActivityIndicator size='large' color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
                }
                {
                  !this.state.isClickPay &&
                  <SimpleTextButton
                    text='Оплатить'
                    onPress={this.onPressPay}
                    sizeText={this.props.style.fontSize.h6.fontSize}
                    color={this.props.style.theme.accentOther.backgroundColor}
                  />
                }
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }

  onPressPay = () => this.setState({ isClickPay: true }, this.pay)

  renderCardForm() {
    return (
      <CardLayout
        containerStyle={{ flex: 1 }}
        ref={(ref) => {
          this.cardForm = ref
        }}
        inputNumber={() => this.refs.inputNumber}
        inputExpMm={() => this.refs.inputMm}
        inputExpYy={() => this.refs.inputYy}
        inputCvv={() => this.refs.inputCvv}
      >
        <CardFieldNumber
          placeholder='Номер карты'
          ref='inputNumber'
          placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
          style={[
            Style.cardNumber,
            this.props.style.fontSize.h8,
            this.props.style.theme.primaryTextColor,
            this.props.style.theme.dividerColor,
          ]}
          onSubmitEditing={() => {
            this.refs.inputCvv.focus()
          }}
        />
        <CardFieldCvv
          placeholder='CVV код'
          ref='inputCvv'
          placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
          style={[
            Style.cvv,
            this.props.style.fontSize.h8,
            this.props.style.theme.primaryTextColor,
            this.props.style.theme.dividerColor
          ]}
          onSubmitEditing={() => {
            this.refs.inputMm.focus()
          }}
        />
        <View style={Style.cardExpiryDate}>
          <CardFieldExpMm
            ref='inputMm'
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.month,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor
            ]}
            placeholder='MM'
            onSubmitEditing={() => {
              this.refs.inputYy.focus()
            }}
          />
          <CardFieldExpYy
            ref='inputYy'
            placeholderTextColor={this.props.style.theme.secondaryTextColor.color}
            style={[
              Style.year,
              this.props.style.fontSize.h8,
              this.props.style.theme.primaryTextColor,
              this.props.style.theme.dividerColor
            ]}
            placeholder='YY'
            onSubmitEditing={() => {
              if (this.props.onCompletion) {
                this.props.onCompletion(this)
              }
            }}
          />
        </View>
      </CardLayout>)
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
          Пожалуйста подождите...
        </Text>
      </Animated.View>
    )
  }

  renderOnlinePayScreen = () => {
    return (
      <View style={[
        Style.screen,
        this.props.style.theme.secondaryThemeBody
      ]}>
        {this.state.webView === undefined
          ? this.renderScreen()
          : <CloudipspWebView
            ref={(ref) => {
              this.cloudipspWebView = ref
            }}
            decelerationRate='normal'
            onError={(error) => {
              this.error()
            }}
            style={{ flex: 1 }}
          />
        }
      </View>
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
        {this.renderButtonOk()}
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
        {this.renderButtonOk()}
      </Animated.View>
    )
  }

  goToMain = () => this.props.navigation.navigate(MAIN)

  renderButtonOk = () => {
    return (
      <View style={[Style.buttonOk]}>
        <Button
          title='ОK'
          onPress={this.goToMain}
          color={Platform.OS == 'ios' ?
            this.props.style.theme.accentOther.backgroundColor :
            this.props.style.theme.accentOther.backgroundColor} />
      </View>
    )
  }

  renderDynamicPage = () => {
    if (this.props.isFetching || this.props.isFetchingCheckOnlinePay)
      return this.renderLoader()

    if ((!this.props.isFetching && this.props.isError) ||
      (!this.props.isFetchingCheckOnlinePay && this.props.isErrorCheckOnlinePay) ||
      this.state.isError)
      return this.renderError()

    if (this.state.success)
      return this.renderSuccess()
  }

  render() {
    if (this.state.success ||
      this.props.isFetching ||
      (!this.props.isFetching && this.props.isError) ||
      this.props.isFetchingCheckOnlinePay ||
      (!this.props.isFetchingCheckOnlinePay && this.props.isErrorCheckOnlinePay) ||
      this.state.isError)
      return (
        <View style={[
          this.props.style.theme.secondaryThemeBody,
          Style.mainContainer,
        ]}>
          {
            this.renderDynamicPage()
          }
        </View>
      )

    if (!this.props.isFetching && !this.props.isError)
      return this.renderOnlinePayScreen()
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    currencyPrefix: state.appSetting.currencyPrefix,
    order: state.checkout.lastOrder,
    isFetching: state.checkout.isFetching,
    isError: state.checkout.isError,
    errorMessage: state.checkout.errorMessage,
    orderNumber: state.checkout.lastOrderNumber,
    userData: state.user,
    deliverySettings: state.main.deliverySettings,
    isFetchingCheckOnlinePay: state.checkout.isFetchingCheckOnlinePay,
    isErrorCheckOnlinePay: state.checkout.isErrorCheckOnlinePay,
    errorMessageCheckOnlinePay: state.checkout.errorMessageCheckOnlinePay,
  }
}

const mapDispatchToProps = {
  sendNewOrder,
  checkOnlinePayNewOrder,
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  changeTotalCountProductInBasket,
  getStocks,
  dropFetchFlag
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOnlinePay)