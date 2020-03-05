import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  ScrollView,
  Button,
  View,
  Text,
  Animated,
  Platform
} from 'react-native'
import { BasketProductItem } from '../../../components/basket-product/BasketProductItem';
import { setSelectedProduct } from '../../../store/catalog/actions'
import { PRODUCT_INFO_FROM_BASKET, CHECKOUT_ORDER, AUTH_LOGIN, CASHBACK_PROFILE } from '../../../navigation/pointsNavigate'
import { timingAnimation } from '../../../animation/timingAnimation'
import {
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  changeTotalCountProductInBasket
} from '../../../store/checkout/actions'
import ShoppingBasketIcon from '../../../images/font-awesome-svg/shopping-basket.svg'
import Style from './style'
import { getSVGColor } from '../../../helpers/color-helper';
import { markFromBasket } from '../../../store/navigation/actions'
import { isWorkTime, getWorkTime } from '../../../helpers/work-time';
import { WorkTimeInfo } from '../../../components/information/work-time/WorkTimeInfo'
import LottieView from 'lottie-react-native';
import VirtualMoneyButton from '../../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { priceValid } from '../../../helpers/utils'
import { CategoryType } from '../../../helpers/type-category'
import { BasketConstructorProductItem } from '../../../components/basket-constructor-product/BasketConstructorProductItem';
import { cleanCoupon } from '../../../store/main/actions'

class ShoppingBasketScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const isShowVirtualMoney = navigation.getParam('isShowVirtualMoney', false)
    const onPress = navigation.getParam('onPress', null)
    if (isShowVirtualMoney)
      return {
        headerTitle: 'Корзина',
        headerTitleStyle: {
          textAlign: Platform.OS == 'ios' ? 'center' : 'left',
          flex: 1,
        },
        headerRight: () => <VirtualMoneyButton onPress={onPress} />
      }

    return {
      headerTitle: 'Корзина'
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({
      isShowVirtualMoney: this.props.promotionCashbackSetting.IsUseCashback,
      onPress: () => this.goToCashbackScreen()
    })

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      showScaleAnimationEmptyBasket: new Animated.Value(0),
      showScaleAnimationWorkTimeInfo: new Animated.Value(0),
      refreshItems: false,
      price: this.getOrderCost()
    }

    this.props.setSelectedProduct({})
  }

  goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

  componentDidMount = () => {
    if (this.isEmptyBasket())
      timingAnimation(this.state.showScaleAnimationEmptyBasket, 1, 300, true)
    else
      timingAnimation(this.state.showScaleAnimation, 1, 300, true)

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.props.setSelectedProduct({})
      this.setState({ refreshItems: !this.state.refreshItems })
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  componentDidUpdate = () => {
    if (Object.keys(this.props.selectedProduct).length > 0
      && this.props.selectedProduct.Id > 0
      && this.props.navigation.isFocused()) {
      this.props.navigation.navigate(PRODUCT_INFO_FROM_BASKET)
    } else if (this.state.showScaleAnimationEmptyBasket && this.isEmptyBasket()) {
      timingAnimation(this.state.showScaleAnimationEmptyBasket, 1, 300, true)
      this.props.cleanCoupon()
    } else if (this.state.showScaleAnimation && !this.isEmptyBasket()) {
      if (isWorkTime(this.props.deliverySettings.TimeDelivery))
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
      else {
        this.props.cleanCoupon()
        timingAnimation(this.state.showScaleAnimationWorkTimeInfo, 1, 300, true)
      }
        
    }

    this.changeTotalCountProductInBasket()
  }

  onSelectedProduct = productId => {
    const categoryId = this.props.basketProducts[productId].categoryId
    const products = this.props.products[categoryId]
    const product = this.getProductById(productId, products)

    this.props.markFromBasket(true)
    this.props.setSelectedProduct({})
    this.props.setSelectedProduct(product)
  }

  getProductById = (productId, products) => {
    return products.filter(p => p.Id == productId)[0]
  }

  productTransform = productId => {
    const basketProduct = this.props.basketProducts[productId]

    if (basketProduct.count == 0)
      return null

    const categoryId = basketProduct.categoryId
    const products = this.props.products[categoryId]
    const product = products[basketProduct.index]

    let countProduct = 0
    if (basketProduct) {
      countProduct = basketProduct.count
    }

    return {
      id: product.Id,
      product: {
        caption: product.Name,
        imageSource: product.Image,
        additionInfo: product.AdditionInfo,
        price: product.Price,
        currencyPrefix: this.props.currencyPrefix,
        startCount: countProduct,
        index: basketProduct.index
      }
    }
  }

  renderDefaultProduct = productId => {
    const itemTransform = this.productTransform(productId)

    if (itemTransform == null)
      return null

    return <BasketProductItem
      style={this.props.style}
      animation={itemTransform.animation}
      id={itemTransform.id}
      product={itemTransform.product}
      onPress={this.onSelectedProduct}
      onToggleProduct={this.toggleProductInBasket}
    />
  }

  constructorProductTransform = uniqId => {
    const basketProduct = this.props.basketConstructorProducts[uniqId]

    if (basketProduct.count == 0)
      return null

    let ingredients = []

    for (const constructorCategoryId in basketProduct.constructorIngredients) {
      const categoryConstructor = basketProduct.constructorIngredients[constructorCategoryId]
      for (const ingredient of categoryConstructor.ingredients) {
        const ingredientCount = categoryConstructor.ingredientsCount[ingredient.Id]

        if (ingredientCount == 0)
          continue

        ingredients.push(`${ingredient.Name} x ${ingredientCount}`)
      }
    }

    return {
      caption: basketProduct.category.Name,
      imageSource: basketProduct.category.Image,
      ingredients: ingredients,
      price: basketProduct.price,
      currencyPrefix: this.props.currencyPrefix,
      startCount: basketProduct.count,
    }
  }

  renderConstructorProduct = uniqId => {
    const constructorProduct = this.constructorProductTransform(uniqId)

    if (constructorProduct == null)
      return null

    return <BasketConstructorProductItem
      style={this.props.style}
      uniqId={uniqId}
      product={constructorProduct}
      onToggleProduct={this.toggleConstructorProductInBasket}
    />
  }

  renderItem = ({ item }) => {
    switch (item.type) {
      case CategoryType.Default:
        return this.renderDefaultProduct(item.id)
      case CategoryType.Constructor:
        return this.renderConstructorProduct(item.id)
    }
  }

  getOrderCost = () => {
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

  checkoutOrder = () => {
    this.props.navigation.navigate(CHECKOUT_ORDER)
  }

  changeTotalCountProductInBasket = () => {
    let count = 0

    const countCalc = items => {
      for (const id in items) {
        count += items[id].count;
      }
    }

    if (this.props.basketProducts && Object.keys(this.props.basketProducts).length != 0) {
      countCalc(this.props.basketProducts)
    }

    if (this.props.basketConstructorProducts && Object.keys(this.props.basketConstructorProducts).length != 0) {
      countCalc(this.props.basketConstructorProducts)
    }

    this.props.changeTotalCountProductInBasket(count)
  }

  toggleProductInBasket = basketProduct => {
    const basketProductModify = { ...this.props.basketProducts }
    basketProductModify[basketProduct.id] = {
      categoryId: this.props.basketProducts[basketProduct.id].categoryId,
      count: basketProduct.count,
      index: basketProduct.index
    }

    this.props.toggleProductInBasket(basketProductModify)
  }

  toggleConstructorProductInBasket = basketProduct => {
    const basketConstructorProductModify = { ...this.props.basketConstructorProducts }

    if (basketProduct.count > 0) {
      const item = basketConstructorProductModify[basketProduct.uniqId]
      basketConstructorProductModify[basketProduct.uniqId] = {
        uniqId: basketProduct.uniqId,
        category: item.category,
        price: item.price,
        count: basketProduct.count,
        constructorIngredients: item.constructorIngredients
      }
    } else {
      delete basketConstructorProductModify[basketProduct.uniqId]
    }

    this.props.toggleConstructorProductInBasket(basketConstructorProductModify)
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

  goToAuthLoginPage = () => this.props.navigation.navigate(AUTH_LOGIN)

  renderEmptyBasket = () => {
    return (
      <Animated.View style={[
        Style.centerScreen,
        { opacity: this.state.showScaleAnimationEmptyBasket },
        { transform: [{ scale: this.state.showScaleAnimationEmptyBasket }] }]} >

        <ShoppingBasketIcon
          width={90}
          height={90}
          color={getSVGColor(this.props.style.theme.secondaryTextColor.color)}
        />
        <Text style={[
          this.props.style.fontSize.h7,
          this.props.style.theme.secondaryTextColor]}>
          Ваша корзина пуста
        </Text>
      </Animated.View>
    )
  }

  getDataFromBasket = () => {
    let products = []
    const addeddProducts = (items, type) => {
      for (const id in items) {
        products.push({ id, type })
      }
    }

    if (this.props.basketProducts
      && Object.keys(this.props.basketProducts).length > 0) {
      addeddProducts(this.props.basketProducts, CategoryType.Default)
    }

    if (this.props.basketConstructorProducts
      && Object.keys(this.props.basketConstructorProducts).length > 0) {
      addeddProducts(this.props.basketConstructorProducts, CategoryType.Constructor)
    }

    return products
  }

  renderBasketContents = () => {
    return (
      <Animated.View
        style={[
          {
            paddingHorizontal: 12,
            marginTop: 5,
            opacity: this.state.showScaleAnimation,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        <ScrollView Style={Style.basketProducts}>
          <FlatList
            windowSize={4}
            removeClippedSubviews={Platform.OS !== 'ios'}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            keyExtractor={item => item.id.toString()}
            extraData={this.props.totalCountProducts}
            data={this.getDataFromBasket()}
            renderItem={this.renderItem}
          />
        </ScrollView>
        {this.props.isLogin && this.renderCheckoutFooter()}
        {!this.props.isLogin && this.renderLoginInfoFooter()}
      </Animated.View>
    )
  }

  renderCheckoutFooter = () => {
    return (
      <View
        style={[
          Style.footer,
          this.props.style.theme.backdoor,
          this.props.style.theme.shadowColor,
          this.props.style.theme.dividerColor
        ]}>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.footerText
          ]}>
          Сумма заказа {`${priceValid(this.getOrderCost())} ${this.props.currencyPrefix}`}
        </Text>
        <View style={Style.buttonSize}>
          <Button
            title='Перейти к оформлению'
            onPress={this.checkoutOrder}
            color={Platform.OS == 'ios' ?
              this.props.style.theme.accentColor.backgroundColor :
              this.props.style.theme.accentColor.backgroundColor}
          />
        </View>
      </View>
    )
  }

  renderLoginInfoFooter = () => {
    return (
      <View
        style={[
          Style.footer,
          this.props.style.theme.backdoor,
          this.props.style.theme.dividerColor,
          this.props.style.theme.shadowColor,
        ]}>
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            Style.footerText
          ]}>
          Для оформления заказа войдите в аккаунт или зарегистрируйтесь
        </Text>
        <View style={Style.buttonSize}>
          <Button
            title='Вход / Регистрация'
            onPress={this.goToAuthLoginPage}
            color={Platform.OS == 'ios' ?
              this.props.style.theme.accentOther.backgroundColor :
              this.props.style.theme.accentOther.backgroundColor}
          />
        </View>
      </View>
    )
  }

  renderWorkTimeInfo = () => {
    return (
      <Animated.View
        style={[
          {
            paddingHorizontal: 12,
            marginTop: 5,
            opacity: this.state.showScaleAnimationWorkTimeInfo,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimationWorkTimeInfo }]
          }
        ]}>
        <View style={[
          Style.workTimeInfonAnimationContainer,
          this.props.style.theme.backdoor,
          this.props.style.theme.dividerColor,
          this.props.style.theme.shadowColor,
        ]}>
          <LottieView
            style={Style.workTimeInfonAnimationSize}
            source={require('../../../animation/src/close.json')}
            autoPlay
            resizeMode='cover'
            autoSize={true}
            speed={0.8} />
        </View>
        <WorkTimeInfo
          style={this.props.style}
          data={getWorkTime(this.props.deliverySettings.TimeDelivery)}
        />
      </Animated.View>
    )
  }

  render() {
    if (this.isEmptyBasket())
      return this.renderEmptyBasket()
    else if (isWorkTime(this.props.deliverySettings.TimeDelivery))
      return this.renderBasketContents()
    else
      return this.renderWorkTimeInfo()
  }
}

const mapStateToProps = state => {
  return {
    serverDomain: state.appSetting.serverDomain,
    currencyPrefix: state.appSetting.currencyPrefix,
    products: state.main.products,
    selectedProduct: state.catalog.selectedProduct,
    basketProducts: state.checkout.basketProducts,
    basketConstructorProducts: state.checkout.basketConstructorProducts,
    totalCountProducts: state.checkout.totalCountProducts,
    style: state.style,
    deliverySettings: state.main.deliverySettings,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
    isLogin: state.user.isLogin
  }
}

const mapActionToProps = {
  setSelectedProduct,
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  markFromBasket,
  changeTotalCountProductInBasket,
  cleanCoupon
}

export default connect(mapStateToProps, mapActionToProps)(ShoppingBasketScreen)