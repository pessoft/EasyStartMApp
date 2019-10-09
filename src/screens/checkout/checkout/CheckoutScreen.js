import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Animated,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { Contacts } from '../../../components/checkout/contacts/Contacts'
import { DeliveryType } from '../../../components/checkout/delivery-type/DeliveryType'
import { PaymentType } from '../../../components/checkout/payment-type/PaymentType'
import { TypeDelivery } from '../../../helpers/type-delivery'
import { TypeStock } from '../../../helpers/stock-type'
import { TypePayment } from '../../../helpers/type-payment'
import { DeliveryAddressAnimation } from '../../../components/checkout/delivery-address/DeliveryAddressAnimation'
import { OrderComment } from '../../../components/checkout/order-comment/OrderComment'
import { CompleteCheckout } from '../../../components/checkout/complete-checkout/CompleteCheckout'
import { CHECKOUT_COMPLETE } from '../../../navigation/pointsNavigate'
import { addNewOrderData } from '../../../store/checkout/actions'

class CheckoutScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Оформление заказа',
  }

  constructor(props) {
    super(props)

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      userData: {
        userName: props.userData.userName,
        phoneNumber: props.userData.phoneNumber
      },
      deliveryType: TypeDelivery.Delivery,
      paymentData: {
        paymentType: TypePayment.Cash,
        needCashBack: false,
        cashBack: 0
      },
      deliveryAddress: {
        cityId: this.props.userData.cityId,
        deliveryArea: '',
        street: '',
        houseNumber: '',
        entrance: '',
        apartmentNumber: '',
        level: '',
        intercomCode: ''
      },
      commentText: ''
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  setContactsData = userData => this.setState({ userData })
  changeDeliveryType = deliveryType => this.setState({ deliveryType })
  changePaymentData = paymentData => this.setState({ paymentData })
  setDeliveryAddress = deliveryAddress => this.setState({ deliveryAddress })
  setCommentText = commentText => this.setState({ commentText })

  getOrderPrice = () => {
    let price = 0

    for (let productId in this.props.basketProducts) {
      const products = this.props.products[this.props.basketProducts[productId].categoryId]
      const item = this.getProductById(productId, products)

      price += (item.Price * this.props.basketProducts[productId].count)
    }

    return price
  }

  getProductById = (productId, products) => {
    return products.filter(p => p.Id == productId)[0]
  }

  getDeliveryPrice = () => {
    if (this.state.deliveryType == TypeDelivery.TakeYourSelf)
      return 0
    else
      return this.props.deliverySettings.PriceDelivery
  }

  getDiscount = () => {
    if (this.state.deliveryType == TypeDelivery.TakeYourSelf) {
      const stock = this.getStockByType(TypeStock.OrderTakeYourself)

      return stock.Discount
    }

    //добавить проверку на то что это точно первый заказ
    if (this.state.deliveryType == TypeDelivery.Delivery) {
      const stock = this.getStockByType(TypeStock.FirstOrder)

      return stock.Discount
    }

    return 0
  }

  getStockByType = stockType => {
    let stockFind = this.props.stocks.filter(p => p.StockType == stockType)

    if (stockFind.length > 0)
      return stockFind[0]
    else
      return {
        Discount: 0
      }
  }

  getToPayPrice = () => {
    const orderPrice = parseFloat(this.getOrderPrice())
    const deliveryPrice = parseFloat(this.getDeliveryPrice())
    const discount = parseFloat(this.getDiscount())

    return orderPrice - (orderPrice * discount / 100) + deliveryPrice
  }

  getProductCountJson = () => {
    const productCount = {}

    for (let productId in this.props.basketProducts) {
      if (this.props.basketProducts[productId].count > 0)
        productCount[productId] = this.props.basketProducts[productId].count
    }

    return JSON.stringify(productCount)
  }

  getOrderData = () => {
    return {
      branchId: this.props.userData.branchId,
      cityId: this.props.userData.cityId,
      clientId: this.props.userData.clientId,
      name: this.state.userData.userName,
      phoneNumber: this.state.userData.phoneNumber,
      deliveryType: this.state.deliveryType,
      street: this.state.deliveryAddress.street,
      homeNumber: this.state.deliveryAddress.houseNumber,
      entranceNumber: this.state.deliveryAddress.entrance,
      apartamentNumber: this.state.deliveryAddress.apartmentNumber,
      level: this.state.deliveryAddress.level,
      intercomCode: this.state.deliveryAddress.intercomCode,
      buyType: this.state.paymentData.paymentType,
      comment: this.state.commentText,
      cashBack: this.state.paymentData.cashBack,
      needCashBack: this.state.paymentData.needCashBack,
      discount: this.getDiscount(),
      deliveryPrice: this.getDeliveryPrice(),
      amountPay: this.getOrderPrice(),
      amountPayDiscountDelivery: this.getToPayPrice(),
      productCountJSON: this.getProductCountJson()
    }
  }

  completeCheckout = () => {
    const newOrderData = this.getOrderData()
    this.props.addNewOrderData(newOrderData)

    this.props.navigation.navigate(CHECKOUT_COMPLETE)
  }

  isValidDeliveryAddress = () => {
    if (this.state.deliveryAddress.street
      && this.state.deliveryAddress.houseNumber
      && this.state.deliveryAddress.entrance
      && this.state.deliveryAddress.apartmentNumber
      && this.state.deliveryAddress.level) {
      return true
    }

    return false
  }

  isValidData = () => {

    if (!this.state.userData.userName ||
      !this.state.userData.phoneNumber) {
      return false
    }

    if (this.state.paymentData.paymentType == TypePayment.Cash
      && this.state.paymentData.needCashBack
      && this.state.paymentData.cashBack < this.getToPayPrice()) {
      return false
    }

    if (this.state.deliveryType == TypeDelivery.Delivery
      && !this.isValidDeliveryAddress()) {
      return false
    }

    return true
  }

  render() {
    return (
      <Animated.View
        style={[
          {
            marginTop: 5,
            opacity: this.state.showScaleAnimation,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          behavior='padding'
          enabled>
          <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="always">
            <Contacts
              changeContacts={this.setContactsData}
              style={this.props.style}
              userName={this.props.userData.userName}
              phoneNumber={this.props.userData.phoneNumber}
            />
            <PaymentType
              style={this.props.style}
              initValue={this.state.paymentData.paymentType}
              changePaymentData={this.changePaymentData}
            />
            <DeliveryType
              style={this.props.style}
              initValue={this.state.deliveryType}
              changeDeliveryType={this.changeDeliveryType}
            />
            <DeliveryAddressAnimation
              cityId={this.state.deliveryAddress.cityId}
              style={this.props.style}
              changeDeliveryAddress={this.setDeliveryAddress}
              isShow={this.state.deliveryType == TypeDelivery.Delivery}
            />
            <OrderComment
              style={this.props.style}
              changeCommentText={this.setCommentText}
            />
            <CompleteCheckout
              style={this.props.style}
              orderPrice={this.getOrderPrice()}
              currencyPrefix={this.props.currencyPrefix}
              deliveryPrice={this.getDeliveryPrice()}
              stock={this.getDiscount()}
              toPay={this.getToPayPrice()}
              onCompleteCheckout={this.completeCheckout}
              disabled={!this.isValidData()}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    userData: state.user,
    currencyPrefix: state.appSetting.currencyPrefix,
    basketProducts: state.checkout.basketProducts,
    products: state.main.products,
    deliverySettings: state.main.deliverySettings,
    stocks: state.main.stocks
  }
}

export default connect(mapStateToProps, { addNewOrderData })(CheckoutScreen)