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
import { DeliveryTypeBlock } from '../../../components/checkout/delivery-type/DeliveryTypeBlock'
import { PaymentType } from '../../../components/checkout/payment-type/PaymentType'
import { DeliveryType } from '../../../logic/promotion/delivery-type'
import { TypePayment } from '../../../helpers/type-payment'
import { DeliveryAddressAnimation } from '../../../components/checkout/delivery-address/DeliveryAddressAnimation'
import { OrderComment } from '../../../components/checkout/order-comment/OrderComment'
import { CompleteCheckout } from '../../../components/checkout/complete-checkout/CompleteCheckout'
import { CHECKOUT_COMPLETE, SHOPPING_BASKET } from '../../../navigation/pointsNavigate'
import { addNewOrderData } from '../../../store/checkout/actions'
import { PromotionLogic } from '../../../logic/promotion/promotion-logic'
import { DiscountType } from '../../../logic/promotion/discount-type'
import { BonusProducts } from '../../../components/checkout/bonus-products/BonusProducts'
import { Coupon } from '../../../components/checkout/coupon/Coupon'
import { PayVirtualMoney } from '../../../components/checkout/pay-virtual-money/PayVirtualMoney'
import { getCoupon } from '../../../store/main/actions'
import { NavigationEvents } from 'react-navigation';
import { cleanCoupon } from '../../../store/main/actions'
import { updateVirtualMoney, updateReferralDiscount } from '../../../store/user/actions'
import { NumberAppliances } from '../../../components/checkout/number-appliances/NumberAppliances'

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
      deliveryType: DeliveryType.Delivery,
      paymentData: {
        paymentType: TypePayment.Cash,
        needCashBack: false,
        cashBack: 0
      },
      deliveryAddress: {
        cityId: props.userData.cityId,
        areaDeliveryId: -1,
        street: '',
        houseNumber: '',
        entrance: '',
        apartmentNumber: '',
        level: '',
        intercomCode: ''
      },
      numberAppliances: this.isRequestNumberAppliances() ? 1 : 0,
      commentText: '',
      promotion: this.getPromotionLogic(true),
      amountPayCashBack: 0,
      selectedProductsBonus: [],
      limitSelectProductBonus: this.getPromotionLogic(true).getAllowedCountSelectBonusProduct()
    }
  }

  isRequestNumberAppliances = () => {
    let isRequest = false

    for (const productId in this.props.basketProducts) {
      const basketProduct = this.props.basketProducts[productId]

      if (basketProduct.count == 0)
        continue

      const category = this.getCategoryById(basketProduct.categoryId)

      if (category && category.NumberAppliances) {
        isRequest = true
        break
      }
    }

    if (!isRequest) {
      for (const uniqId in this.props.basketConstructorProducts) {
        const basketConstructorProduct = this.props.basketConstructorProducts[uniqId]

        if (basketConstructorProduct && basketConstructorProduct.category.NumberAppliances) {
          isRequest = true
          break
        }
      }
    }

    return isRequest
  }

  getCategoryById = id => {
    const category = this.props.categories.find(p => p.Id == id)

    return category
  }

  getPromotionLogic = (isDefault = false) => {
    return new PromotionLogic(
      this.getStockOption(isDefault),
      this.getCoupon(),
      this.props.userData.referralDiscount,
      this.props.promotionSettings)
  }

  getCoupon = () => {
    return this.props.coupon &&
      Object.keys(this.props.coupon).length > 0 ?
      this.props.coupon :
      null
  }

  getStockOption = (isDefault) => {
    return {
      stocks: this.props.stocks,
      deliveryType: isDefault ? DeliveryType.Delivery : this.state.deliveryType,
      orderSum: this.getOrderPrice(),
      basketProducts: this.props.basketProducts
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate = (prevProps, prevSate) => {
    if (this.isEmptyBasket() && !this.isEmptyCoupon()) {
      this.props.cleanCoupon()
    }

    const promotionData = this.getPromotionDataForEquals()
    if (!this.state.promotion.equalsPromotionData(promotionData)) {
      const promotion = this.getPromotionLogic()
      let selectedProductsBonus = promotion.getBonusProducts().length == 0 ? [] : this.state.selectedProductsBonus
      let limitSelectProductBonus = promotion.getAllowedCountSelectBonusProduct()

      this.setState({ promotion, selectedProductsBonus, limitSelectProductBonus })
    }
  }

  isEmptyCoupon = () => {
    if (!this.props.coupon || Object.keys(this.props.coupon).length == 0)
      return true

    return false
  }

  isEmptyBasket = () => {
    let isEmpty = true
    const countProductsCalc = items => {
      let countProducts = 0

      for (let key in items) {
        countProducts += items[key].count
      }

      return countProducts
    }
    if (Object.keys(this.props.basketProducts).length > 0) {
      isEmpty = countProductsCalc(this.props.basketProducts) == 0
    }

    if (isEmpty
      && Object.keys(this.props.basketConstructorProducts).length > 0) {
      isEmpty = countProductsCalc(this.props.basketConstructorProducts) == 0
    }

    return isEmpty
  }

  getPromotionDataForEquals = () => {
    return {
      deliveryType: this.state.deliveryType,
      orderSum: this.getOrderPrice(),
      coupon: this.getCoupon()
    }
  }

  setContactsData = userData => this.setState({ userData })
  changeDeliveryType = deliveryType => this.setState({ deliveryType, deliveryAddress: { areaDeliveryId: -1 } })
  changePaymentData = paymentData => this.setState({ paymentData })
  setDeliveryAddress = deliveryAddress => this.setState({ deliveryAddress })
  setCommentText = commentText => this.setState({ commentText })
  setAmountPayCashBack = amountPayCashBack => this.setState({ amountPayCashBack })
  changeNumberAppliances = numberAppliances => this.setState({ numberAppliances })

  getOrderPrice = () => {
    let cost = 0

    for (let productId in this.props.basketProducts) {
      const products = this.props.products[this.props.basketProducts[productId].categoryId]
      const item = this.getProductById(productId, products)

      cost += (item.Price * this.props.basketProducts[productId].count)
    }

    for (let uniqId in this.props.basketConstructorProducts) {
      const basketItem = this.props.basketConstructorProducts[uniqId]
      cost += basketItem.price * basketItem.count
    }

    return cost
  }

  getProductById = (productId, products) => {
    return products.filter(p => p.Id == productId)[0]
  }

  getCurrentAreaDelivery = () => {
    const findResults = this.props.deliverySettings.AreaDeliveries.filter(p => p.UniqId == this.state.deliveryAddress.areaDeliveryId)

    if (findResults && findResults.length > 0)
      return findResults[0]
    else
      return null
  }

  getCurrentAreaDeliveryPrice = () => {
    let deliveryPrice = 0

    try {
      const findResults = this.props.deliverySettings.AreaDeliveries.filter(p => p.UniqId == this.state.deliveryAddress.areaDeliveryId)

      if (findResults && findResults.length > 0)
        deliveryPrice = findResults[0].DeliveryPrice
    } catch (ex) {
      deliveryPrice = 0
    }

    return deliveryPrice
  }

  isFreeDelivery = () => {
    if (this.state.deliveryAddress.areaDeliveryId == -1)
      return false
    else
      return this.getOrderPrice() >= this.getCurrentAreaDelivery().MinPrice
  }

  getDeliveryPrice = () => {
    if (this.state.deliveryType == DeliveryType.TakeYourSelf
      || this.isFreeDelivery())
      return 0
    else
      return this.getCurrentAreaDeliveryPrice()
  }

  getDiscount = (discountType) => {
    return this.state.promotion.getDiscount(discountType)
  }

  getToPayPriceWithoutCashback = () => {
    const orderPrice = parseFloat(this.getOrderPrice())
    const deliveryPrice = parseFloat(this.getDeliveryPrice())
    const discountPercent = parseFloat(this.getDiscount(DiscountType.Percent))
    const discountRuble = parseFloat(this.getDiscount(DiscountType.Ruble))

    return orderPrice - ((orderPrice * discountPercent / 100) + discountRuble) + deliveryPrice
  }

  getToPayPrice = () => {
    const priceWithoutCashback = this.getToPayPriceWithoutCashback()

    return priceWithoutCashback - this.state.amountPayCashBack
  }

  getProductCountJson = () => {
    const productCount = {}

    for (let productId in this.props.basketProducts) {
      if (this.props.basketProducts[productId].count > 0)
        productCount[productId] = this.props.basketProducts[productId].count
    }

    return JSON.stringify(productCount)
  }

  getProductConstructorCountJson = () => {
    const constructorProducts = []

    for (const uniqId in this.props.basketConstructorProducts) {
      const constructorItem = this.props.basketConstructorProducts[uniqId]
      let ingredientsCount = {}

      for (const id in constructorItem.constructorIngredients) {
        const constructorIngredient = constructorItem.constructorIngredients[id]

        for (const ingredientId in constructorIngredient.ingredientsCount) {
          const count = constructorIngredient.ingredientsCount[ingredientId]

          if (count == 0)
            continue

          ingredientsCount[ingredientId] = count
        }
      }

      constructorProducts.push({
        CategoryId: constructorItem.category.Id,
        Count: constructorItem.count,
        IngrdientCount: ingredientsCount
      })
    }

    return JSON.stringify(constructorProducts)
  }

  getProductBonusCountJson = () => {
    const productCount = {}

    for (let productId of this.state.selectedProductsBonus) {
      productCount[productId] = 1
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
      discountPercent: this.getDiscount(DiscountType.Percent),
      discountRuble: this.getDiscount(DiscountType.Ruble),
      deliveryPrice: this.getDeliveryPrice(),
      amountPay: this.getOrderPrice(),
      amountPayDiscountDelivery: this.getToPayPrice(),
      productCountJSON: this.getProductCountJson(),
      productConstructorCountJSON: this.getProductConstructorCountJson(),
      productBonusCountJSON: this.getProductBonusCountJson(),
      amountPayCashBack: this.state.amountPayCashBack,
      numberAppliances: parseInt(this.state.numberAppliances),
      stockIds: this.state.promotion.getApplyStockIds(),
      couponId: this.state.promotion.getApplyCouponId(),
      referralDiscount: this.state.promotion.getReferralDiscount(),
    }
  }

  completeCheckout = () => {
    const newOrderData = this.getOrderData()
    this.props.addNewOrderData(newOrderData)
    this.props.cleanCoupon()
    this.updateVirtualMoney()
    this.updateClientReferralDiscount(newOrderData.referralDiscount)

    this.props.navigation.navigate(CHECKOUT_COMPLETE)
  }

  updateVirtualMoney = () => {
    if (this.state.amountPayCashBack > 0) {
      let newValue = this.props.userData.virtualMoney - this.state.amountPayCashBack
      this.props.updateVirtualMoney(newValue)
    }
  }

  updateClientReferralDiscount = referralDiscount => {
    if (referralDiscount > 0) {
      this.props.updateReferralDiscount(0)
    }
  }

  isValidDeliveryAddress = () => {
    if (this.state.deliveryAddress.street
      && this.state.deliveryAddress.houseNumber
      && this.state.deliveryAddress.entrance
      && this.state.deliveryAddress.apartmentNumber
      && this.state.deliveryAddress.level
      && this.state.deliveryAddress.areaDeliveryId != -1) {
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

    if (this.state.deliveryType == DeliveryType.Delivery
      && !this.isValidDeliveryAddress()) {
      return false
    }

    if (this.isRequestNumberAppliances() && Number.isNaN(parseInt(this.state.numberAppliances)))
      return false

    return true
  }

  changeBonusProducts = products => this.setState({ selectedProductsBonus: products })

  activateCoupon = (promotionCode) => {
    const params = {
      clientId: this.props.userData.clientId,
      branchId: this.props.userData.branchId,
      promocode: promotionCode
    }

    this.props.getCoupon(params)
  }

  exitCurrentPage = () => {
    if (this.isEmptyBasket() && this.props.navigation.isFocused()) {
      this.props.cleanCoupon()
      this.props.navigation.navigate(SHOPPING_BASKET)
    }
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
        <NavigationEvents onWillFocus={this.exitCurrentPage} />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          behavior='padding'
          enabled>
          <ScrollView
            contentContainerStyle={{ flex: 1, paddingHorizontal: 6 }}
            keyboardShouldPersistTaps="always">
            <Coupon
              style={this.props.style}
              isProcessingActivation={this.props.isFetchingCoupon}
              isActivated={this.props.coupon && Object.keys(this.props.coupon).length > 0}
              onActivateCoupon={this.activateCoupon}
            />
            {
              this.state.promotion.getBonusProducts().length > 0
              && <BonusProducts
                style={this.props.style}
                products={this.props.products}
                currencyPrefix={this.props.currencyPrefix}
                bonusProductIds={this.state.promotion.getBonusProducts()}
                selectedProductsBonus={this.state.selectedProductsBonus}
                allowedCountSelect={this.state.limitSelectProductBonus}
                onChangeBonusProducts={this.changeBonusProducts}
              />
            }
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
            <DeliveryTypeBlock
              style={this.props.style}
              initValue={this.state.deliveryType}
              changeDeliveryType={this.changeDeliveryType}
            />
            <DeliveryAddressAnimation
              cityId={this.state.deliveryAddress.cityId}
              style={this.props.style}
              changeDeliveryAddress={this.setDeliveryAddress}
              isShow={this.state.deliveryType == DeliveryType.Delivery}
              areaDeliveries={this.props.deliverySettings.AreaDeliveries}
            />
            {
              this.isRequestNumberAppliances() &&
              <NumberAppliances
                style={this.props.style}
                numberAppliances={this.state.numberAppliances}
                changeNumberAppliances={this.changeNumberAppliances}
              />
            }
            <OrderComment
              style={this.props.style}
              changeCommentText={this.setCommentText}
            />
            {
              this.props.promotionCashbackSetting.IsUseCashback &&
              this.props.userData.virtualMoney > 0 &&
              <PayVirtualMoney
                style={this.props.style}
                currencyPrefix={this.props.currencyPrefix}
                availableVirtualMoney={this.props.userData.virtualMoney}
                toPay={this.getToPayPriceWithoutCashback()}
                setting={this.props.promotionCashbackSetting}
                onChangeAmountPayCashBack={this.setAmountPayCashBack}
              />
            }
            <CompleteCheckout
              style={this.props.style}
              orderPrice={this.getOrderPrice()}
              currencyPrefix={this.props.currencyPrefix}
              deliveryPrice={this.getDeliveryPrice()}
              discountPercent={this.getDiscount(DiscountType.Percent)}
              discountRuble={this.getDiscount(DiscountType.Ruble)}
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
    basketConstructorProducts: state.checkout.basketConstructorProducts,
    products: state.main.products,
    categories: state.main.categories,
    deliverySettings: state.main.deliverySettings,
    promotionSettings: state.main.promotionSectionSettings,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
    stocks: state.main.stocks,
    coupon: state.main.coupon,
    isFetchingCoupon: state.main.isFetchingCoupon,
    isFetchErrorCoupon: state.main.isFetchErrorCoupon,
  }
}

const mapDispatchToProps = {
  addNewOrderData,
  getCoupon,
  cleanCoupon,
  updateVirtualMoney,
  updateReferralDiscount
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)