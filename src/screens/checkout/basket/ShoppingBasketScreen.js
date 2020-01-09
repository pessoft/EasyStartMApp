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
import { toggleProductInBasket, changeTotalCountProductInBasket } from '../../../store/checkout/actions'
import ShoppingBasketIcon from '../../../images/font-awesome-svg/shopping-basket.svg'
import Style from './style'
import { getSVGColor } from '../../../helpers/color-helper';
import { markFromBasket } from '../../../store/navigation/actions'
import { isWorkTime, getWorkTime } from '../../../helpers/work-time';
import { WorkTimeInfo } from '../../../components/information/work-time/WorkTimeInfo'
import LottieView from 'lottie-react-native';
import VirtualMoneyButton from '../../../components/buttons/VirtualMoneyButton/VirtualMoneyButton'
import { priceValid } from '../../../helpers/utils'

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
      refreshItems: false
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

  componentDidUpdate = (prevProps, prevState) => {
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

  /**
   * item - это productId в this.props.basketProducts
   */
  productTransform = item => {
    const basketProduct = this.props.basketProducts[item]

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

  renderItem = ({ item }) => {
    const itemTransform = this.productTransform(item)

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

  getOrderCost = () => {
    let cost = 0

    for (let productId in this.props.basketProducts) {
      const products = this.props.products[this.props.basketProducts[productId].categoryId]
      const item = this.getProductById(productId, products)

      cost += (item.Price * this.props.basketProducts[productId].count)
    }

    return cost
  }

  checkoutOrder = () => {
    this.props.navigation.navigate(CHECKOUT_ORDER)
  }

  changeTotalCountProductInBasket = () => {
    let count = 0

    if (this.props.basketProducts && Object.keys(this.props.basketProducts).length != 0) {
      for (let productId in this.props.basketProducts) {
        const itemBasket = this.props.basketProducts[productId]
        const productCount = itemBasket.count;

        count += productCount;
      }
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

  isEmptyBasket = () => {
    let isEmpty = true

    if (Object.keys(this.props.basketProducts).length > 0) {
      let countProducts = 0
      for (let key in this.props.basketProducts) {
        countProducts += this.props.basketProducts[key].count
      }

      isEmpty = countProducts == 0
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
  keyExtractor = item => {
    if (this.props.basketProducts[item]) {
      return `${item}-${this.props.basketProducts[item].count}`
    }

    return item.Id.toString()
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
            keyExtractor={this.keyExtractor}
            extraData={this.props.basketProducts}
            data={Object.keys(this.props.basketProducts)}
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
    totalCountProducts: state.checkout.totalCountProducts,
    style: state.style,
    deliverySettings: state.main.deliverySettings,
    promotionCashbackSetting: state.main.promotionCashbackSetting,
  }
}

const mapActionToProps = {
  setSelectedProduct,
  toggleProductInBasket,
  markFromBasket,
  changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapActionToProps)(ShoppingBasketScreen)