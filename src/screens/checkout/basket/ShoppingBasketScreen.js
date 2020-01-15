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
import { PRODUCT_INFO_FROM_BASKET, CHECKOUT_ORDER } from '../../../navigation/pointsNavigate'
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

class ShoppingBasketScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const isShowVirtualMoney = navigation.getParam('isShowVirtualMoney', false)

    if (isShowVirtualMoney)
      return {
        headerTitle: 'Корзина',
        headerTitleStyle: {
          textAlign: "left",
          flex: 1,
        },
        headerRight: () => <VirtualMoneyButton />
      }

    return {
      headerTitle: 'Корзина'
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({ isShowVirtualMoney: this.props.promotionCashbackSetting.IsUseCashback })

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      showScaleAnimationEmptyBasket: new Animated.Value(0),
      showScaleAnimationWorkTimeInfo: new Animated.Value(0),
      refreshItems: false,
      price: this.getOrderCost()
    }

    this.props.setSelectedProduct({})
  }

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
    } else if (this.state.showScaleAnimation && !this.isEmptyBasket()) {
      if (isWorkTime(this.props.deliverySettings.TimeDelivery))
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
      else
        timingAnimation(this.state.showScaleAnimationWorkTimeInfo, 1, 300, true)
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
    const basketProduct = this.props.basketConstructoProducts[uniqId]

    if (basketProduct.count == 0)
      return null

    let ingredients = []
    
    for(const constructorCategoryId in basketProduct.constructorIngredients) {
      const categoryConstructor = this.state.constructorIngredients[constructorCategoryId]
      for(const ingredient of categoryConstructor.ingredients) {
        const ingedientCount = categoryConstructor.ingredientsCount[ingredient.Id]

        if(ingedientCount == 0)
          continue

        ingredients.push(`${ingredient.Name} x ${ingedientCount}`)
      }
    }

    return {
        caption: basketProduct.category.Name,
        imageSource:  basketProduct.category.Image,
        ingredients: ingredients,
        price: basketProduct.price,
        currencyPrefix: this.props.currencyPrefix,
        startCount: basketProduct.count,
    }
  }

  renderConstroctorProduct = uniqId => {
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
        return this.renderConstroctorProduct(item.id)
    }
  }

  getOrderCost = () => {
    let cost = 0

    for (let productId in this.props.basketProducts) {
      const products = this.props.products[this.props.basketProducts[productId].categoryId]
      const item = this.getProductById(productId, products)

      cost += (item.Price * this.props.basketProducts[productId].count)
    }

    for (let uniqId in this.props.basketConstructoProducts) {
      const basketItem = this.props.basketConstructoProducts[uniqId]
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

    if (this.props.basketConstructoProducts && Object.keys(this.props.basketConstructoProducts).length != 0) {
      countCalc(this.props.basketConstructoProducts)
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
    const basketConstructorProductModify = { ...this.props.basketConstructoProducts }
   
    if(basketProduct.count > 0) {
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

    if(isEmpty
      && Object.keys(this.props.basketConstructoProducts).length > 0) {
        isEmpty = countProductsCalc(this.props.basketConstructoProducts) == 0
    }

    return isEmpty
  }

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

    if (this.props.basketConstructoProducts
      && Object.keys(this.props.basketConstructoProducts).length > 0) {
      addeddProducts(this.props.basketConstructoProducts, CategoryType.Constructor)
    }

    return products
  }

  renderBasketContents = () => {
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
        <View
          style={[
            Style.footer,
            this.props.style.theme.dividerColor
          ]}>
          <Text
            style={[
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8,
              { marginBottom: 15 }
            ]}>
            Сумма заказа {`${priceValid(this.getOrderCost())} ${this.props.currencyPrefix}`}
          </Text>
          <View style={Style.buttonSize}>
            <Button
              title='Перейти к оформлению'
              onPress={this.checkoutOrder}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.defaultPrimaryColor.backgroundColor}
            />
          </View>
        </View>
      </Animated.View>
    )
  }

  renderWorkTimeInfo = () => {
    return (
      <Animated.View
        style={[
          {
            marginTop: 5,
            opacity: this.state.showScaleAnimationWorkTimeInfo,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimationWorkTimeInfo }]
          }
        ]}>
        <View style={[
          Style.workTimeInfonAnimationContainer,
          this.props.style.theme.backdoor,
          this.props.style.theme.dividerColor
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
    basketConstructoProducts: state.checkout.basketConstructoProducts,
    totalCountProducts: state.checkout.totalCountProducts,
    style: state.style,
    deliverySettings: state.main.deliverySettings,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
  }
}

const mapActionToProps = {
  setSelectedProduct,
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  markFromBasket,
  changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(ShoppingBasketScreen)