import React from 'react'
import { connect } from 'react-redux'
import {
  ScrollView,
  Animated,
  TouchableHighlightBase,
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
import { CHECKOUT_COMPLETE, SHOPPING_BASKET, CASHBACK_PROFILE, CHECKOUT_ONLINE_PAY } from '../../../navigation/pointsNavigate'
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
import VirtualMoneyButton from '../../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { setDeliveryAddress } from '../../../store/user/actions'
import { showMessage } from "react-native-flash-message"
import { isWorkTime, getWorkTime } from '../../../helpers/work-time'
import { OrderStatus } from '../../../helpers/order-status'

class CheckoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const isShowVirtualMoney = navigation.getParam('isShowVirtualMoney', false)
    const onPress = navigation.getParam('onPress', null)
    if (isShowVirtualMoney)
      return {
        headerTitle: 'Оформление заказа',
        headerTitleStyle: {
          textAlign: Platform.OS == 'ios' ? 'center' : 'left',
          flex: 1,
        },
        headerRight: () => <VirtualMoneyButton onPress={onPress} />
      }

    return {
      headerTitle: 'Оформление заказа'
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({
      isShowVirtualMoney: this.props.promotionCashbackSetting.IsUseCashback,
      onPress: () => this.goToCashbackScreen()
    })
    const isWorkTimeCurrent = isWorkTime(this.props.deliverySettings.TimeDelivery)
    this.state = {
      isWorkTime: isWorkTimeCurrent,
      showScaleAnimation: new Animated.Value(0),
      userData: {
        userName: props.userData.userName,
        phoneNumber: props.userData.phoneNumber
      },
      deliveryType: this.props.deliverySettings.IsDelivery ? DeliveryType.Delivery : DeliveryType.TakeYourSelf,
      paymentData: {
        paymentType: TypePayment.Cash,
        needCashBack: false,
        cashBack: 0
      },
      deliveryAddress: {
        cityId: props.userData.cityId,
        areaDeliveryId: this.getIdAreaDelivery(props.userData.areaDeliveryId),
        street: props.userData.street,
        houseNumber: props.userData.houseNumber,
        entrance: props.userData.entrance,
        apartmentNumber: props.userData.apartmentNumber,
        level: props.userData.level,
        intercomCode: props.userData.intercomCode,
      },
      numberAppliances: this.isRequestNumberAppliances() ? 1 : 0,
      dateDelivery: isWorkTimeCurrent ? null : new Date(),
      commentText: '',
      promotion: this.getPromotionLogic(true),
      amountPayCashBack: 0,
      selectedProductsBonus: [],
      limitSelectProductBonus: this.getPromotionLogic(true).getAllowedCountSelectBonusProduct()
    }
  }

  goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

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

    if (!isRequest) {
      for (const uniqId in this.props.basketProductsWithOptions) {
        const basketProduct = this.props.basketProductsWithOptions[uniqId]

        if (basketProduct.count == 0)
          continue

        const category = this.getCategoryById(basketProduct.categoryId)

        if (category && category.NumberAppliances) {
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
      this.props.promotionSectionSettings)
  }

  getCoupon = () => {
    return this.props.coupon &&
      Object.keys(this.props.coupon).length > 0 ?
      this.props.coupon :
      null
  }

  getStocks = () => {
    if (this.props.stocks && this.props.stocks.length > 0)
      return this.props.stocks.filter(p => !p.OnlyShowNews)

    return []
  }

  getStockOption = (isDefault) => {
    return {
      stocks: this.getStocks(),
      deliveryType: isDefault ? DeliveryType.Delivery : this.state.deliveryType,
      orderSum: this.getOrderPrice(),
      basketProducts: this.props.basketProducts,
      basketProductsWithOptions: this.props.basketProductsWithOptions,
      stockInteractionType: this.props.promotionSetting.StockInteractionType,
      productDictionary: this.props.productDictionary,
      additionalOptions: this.props.additionalOptions,
      additionalFillings: this.props.additionalFillings
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  }

  componentDidUpdate = (prevProps, prevSate) => {
    if (this.isEmptyBasket() && !this.isEmptyCoupon()) {
      this.props.cleanCoupon()
    }

    if (this.state.numberAppliances > 0 && !this.isRequestNumberAppliances())
      this.setState({ numberAppliances: 0 })
    else if (this.state.numberAppliances == 0 && this.isRequestNumberAppliances())
      this.setState({ numberAppliances: 1 })

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

    if (isEmpty
      && Object.keys(this.props.basketProductsWithOptions).length > 0) {
      isEmpty = countProductsCalc(this.props.basketProductsWithOptions) == 0
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
  changeDeliveryType = deliveryType => this.setState({ deliveryType })
  changeDeliveryDate = dateDelivery => { this.setState({ dateDelivery }) }
  changePaymentData = paymentData => this.setState({ paymentData })
  setDeliveryAddress = deliveryAddress => this.setState({ deliveryAddress })
  setCommentText = commentText => this.setState({ commentText })
  setAmountPayCashBack = amountPayCashBack => this.setState({ amountPayCashBack })
  changeNumberAppliances = numberAppliances => this.setState({ numberAppliances })
  saveDeliveryAddress = () => {
    this.props.setDeliveryAddress(this.state.deliveryAddress)
    this.showSuccessMessage('Адрес доставки сохранен')
  }

  showSuccessMessage = msg => {
    showMessage({
      message: msg,
      type: 'success',
    });
  }

  showWarningMessage = msg => {
    showMessage({
      message: msg,
      type: 'warning',
    });
  }

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

    cost += this.getOrderCostProductWithOptions()

    return cost
  }

  getOrderCostProductWithOptions = () => {
    let cost = 0

    for (let uniqId in this.props.basketProductsWithOptions) {
      const basketItem = this.props.basketProductsWithOptions[uniqId]
      const product = this.props.productDictionary[basketItem.productId]
      let costProduct = product.Price

      for (const id in basketItem.additionalOptions) {
        const additionalOption = this.props.additionalOptions[id]
        const additionalOptionItemId = basketItem.additionalOptions[id]
        const additionalOptionItem = additionalOption.Items.find(p => p.Id == additionalOptionItemId)

        costProduct += additionalOptionItem.Price
      }

      for (const id of basketItem.additionalFillings) {
        const additionalFilling = this.props.additionalFillings[id]

        costProduct += additionalFilling.Price
      }

      costProduct *= basketItem.count
      cost += costProduct
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

  getIdAreaDelivery = uniqId => {
    const findResults = this.props.deliverySettings.AreaDeliveries.filter(p => p.UniqId == uniqId)

    if (findResults && findResults.length > 0)
      return uniqId
    else
      return -1
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

  isFreeDeliveryAnyArea = () => {
    const paidDeliveryAreas = this.props.deliverySettings.AreaDeliveries.filter(p => p.MinPrice > this.getOrderPrice())

    return paidDeliveryAreas.length == 0
  }

  isFreeDelivery = () => {
    if (this.isFreeDeliveryAnyArea())
      return true

    if (!this.state.deliveryAddress.areaDeliveryId ||
      this.state.deliveryAddress.areaDeliveryId == -1)
      return false
    else {
      const areaDelivery = this.getCurrentAreaDelivery()

      if (areaDelivery)
        return this.getOrderPrice() >= areaDelivery.MinPrice
      else
        return false
    }

  }

  getDeliveryPrice = () => {
    if (this.state.deliveryType == DeliveryType.TakeYourSelf
      || this.isFreeDelivery())
      return 0
    else
      return this.getCurrentAreaDeliveryPrice()
  }

  getAreaDeliveryId = () => {
    if (this.state.deliveryType == DeliveryType.TakeYourSelf
      || this.isFreeDelivery()
      || this.state.deliveryAddress.areaDeliveryId == -1)
      return null
    else
      return this.state.deliveryAddress.areaDeliveryId
  }

  getLabelDiscount = discountType => {
    let discount = this.state.promotion.getDiscount(discountType)
    const partialDiscount = this.state.promotion.getPartialDiscount(discountType)

    if (partialDiscount && partialDiscount.length > 0)
      discount += partialDiscount.reduce((acc, value) => acc.discount + value.discount, { discount: 0 })

    return discount
  }

  applyDiscount = orderPrice => {
    let discountPercent = parseFloat(this.state.promotion.getDiscount(DiscountType.Percent))
    const discountRuble = parseFloat(this.state.promotion.getDiscount(DiscountType.Ruble))
    
    let partialDiscountPercent = this.state.promotion.getPartialDiscount(DiscountType.Percent)
    partialDiscountPercent = partialDiscountPercent.length == 0 ? [{ discountValueCurrency: 0 }] : partialDiscountPercent
    let partialDiscountRubel = this.state.promotion.getPartialDiscount(DiscountType.Ruble)
    partialDiscountRubel = partialDiscountRubel.length == 0 ? [{ discountValueCurrency: 0 }] : partialDiscountRubel

    const reduce = (acc, value) => acc.partialDiscountValueCurrency + value.discountValueCurrency

    let partialDiscountValueCurrency = partialDiscountPercent.reduce(reduce, { partialDiscountValueCurrency: 0 })
    partialDiscountValueCurrency += partialDiscountRubel.reduce(reduce, { partialDiscountValueCurrency: 0 })
    let price = orderPrice - discountRuble - partialDiscountValueCurrency

    var detailsInfoDiscountPercent = this.state.promotion.getDetailsInfoDiscountPercent()
    for(const discountInfo of detailsInfoDiscountPercent){
      discountPercent -= discountInfo.percent
      price -= discountInfo.discountValueRuble
    }

    price = price - (price * discountPercent / 100)
    
    return price
  }

  getToPayPriceWithoutCashback = () => {
    const orderPrice = parseFloat(this.getOrderPrice())
    const deliveryPrice = parseFloat(this.getDeliveryPrice())
    const orderPriceWithDiscount = this.applyDiscount(orderPrice)

    return orderPriceWithDiscount + deliveryPrice
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
        IngredientCount: ingredientsCount
      })
    }

    return JSON.stringify(constructorProducts)
  }

  getProductWithOptionsCountJson = () => {
    const products = []

    for (let uniqId in this.props.basketProductsWithOptions) {
      const basketItem = this.props.basketProductsWithOptions[uniqId]

      if (basketItem.count > 0) {
        products.push({
          CategoryId: basketItem.categoryId,
          ProductId: basketItem.productId,
          Count: basketItem.count,
          AdditionalOptions: basketItem.additionalOptions, //object
          AdditionalFillings: basketItem.additionalFillings //array
        })
      }
    }

    return JSON.stringify(products)
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
      discountPercent: this.getLabelDiscount(DiscountType.Percent),
      discountRuble: this.getLabelDiscount(DiscountType.Ruble),
      deliveryPrice: this.getDeliveryPrice(),
      areaDeliveryId: this.getAreaDeliveryId(),
      amountPay: this.getOrderPrice(),
      amountPayDiscountDelivery: this.getToPayPrice(),
      productCountJSON: this.getProductCountJson(),
      productConstructorCountJSON: this.getProductConstructorCountJson(),
      productWithOptionsCountJSON: this.getProductWithOptionsCountJson(),
      productBonusCountJSON: this.getProductBonusCountJson(),
      amountPayCashBack: this.state.amountPayCashBack,
      numberAppliances: parseInt(this.state.numberAppliances),
      stockIds: this.state.promotion.getApplyStockIds(),
      couponId: this.state.promotion.getApplyCouponId(),
      referralDiscount: this.state.promotion.getReferralDiscount(),
      dateDelivery: this.state.dateDelivery,
      OrderStatus: this.state.paymentData.paymentType == TypePayment.OnlinePay ? OrderStatus.PendingPay : OrderStatus.Processing
    }
  }

  completeCheckout = () => {
    if(this.state.deliveryType == DeliveryType.Delivery && !this.isValidDeliveryArea()) {
      this.showWarningMessage('Выберите район доставки в разделе "Адрес доставки"')
      return
    }

    const newOrderData = this.getOrderData()
    this.props.addNewOrderData(newOrderData)
    this.props.cleanCoupon()
    this.updateVirtualMoney()
    this.updateClientReferralDiscount(newOrderData.referralDiscount)

    if (this.state.paymentData.paymentType == TypePayment.OnlinePay)
      this.props.navigation.navigate(CHECKOUT_ONLINE_PAY)
    else
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
      && this.state.deliveryAddress.houseNumber) {
      return true
    }

    return false
  }

  isValidDeliveryArea = () => {
    return this.state.deliveryAddress.areaDeliveryId != -1 || this.isFreeDeliveryAnyArea()
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
          enabled
          keyboardShouldPersistTaps='handled'
        >
          <ScrollView
            contentContainerStyle={{ flex: 1, paddingHorizontal: 10 }}
            keyboardShouldPersistTaps='always'>
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
                additionalOptions={this.props.additionalOptions}
                additionalFillings={this.props.additionalFillings}
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
              cashbackLabel={this.props.cashbackLabel}
              hasCard={this.props.deliverySettings.PayCard}
              hasCash={this.props.deliverySettings.PayCash}
              hasOnlinePay={this.props.deliverySettings.PayOnline}
              initValue={this.state.paymentData.paymentType}
              changePaymentData={this.changePaymentData}
            />
            <DeliveryTypeBlock
              style={this.props.style}
              initValue={this.state.deliveryType}
              dateDelivery={this.state.dateDelivery}
              deliverySettings={this.props.deliverySettings}
              changeDeliveryType={this.changeDeliveryType}
              changeDeliveryDate={this.changeDeliveryDate}
              isWorkTime={this.state.isWorkTime}
            />
            <DeliveryAddressAnimation
              address={this.state.deliveryAddress}
              style={this.props.style}
              changeDeliveryAddress={this.setDeliveryAddress}
              isShow={this.state.deliveryType == DeliveryType.Delivery}
              isHideArea={this.isFreeDeliveryAnyArea()}
              areaDeliveries={this.props.deliverySettings.AreaDeliveries}
              saveDeliveryAddress={this.saveDeliveryAddress}
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
              discountPercent={this.getLabelDiscount(DiscountType.Percent)}
              discountRuble={this.getLabelDiscount(DiscountType.Ruble)}
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
    cashbackLabel: state.appSetting.cashbackLabel,
    basketProducts: state.basket.basketProducts,
    basketProductsWithOptions: state.basket.basketProductsWithOptions,
    basketConstructorProducts: state.basket.basketConstructorProducts,
    products: state.main.products,
    productDictionary: state.main.productDictionary,
    categories: state.main.categories,
    deliverySettings: state.main.deliverySettings,
    promotionSetting: state.main.promotionSetting,
    promotionSectionSettings: state.main.promotionSectionSettings,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
    stocks: state.main.stocks,
    coupon: state.main.coupon,
    isFetchingCoupon: state.main.isFetchingCoupon,
    isFetchErrorCoupon: state.main.isFetchErrorCoupon,
    additionalOptions: state.main.additionalOptions,
    additionalFillings: state.main.additionalFillings,
  }
}

const mapDispatchToProps = {
  addNewOrderData,
  getCoupon,
  cleanCoupon,
  updateVirtualMoney,
  updateReferralDiscount,
  setDeliveryAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)