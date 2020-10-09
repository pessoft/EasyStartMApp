import React from 'react'
import { connect } from 'react-redux'
import {
  FlatList,
  ScrollView,
  Button,
  View,
  Text,
  Animated,
  Platform,
  ActivityIndicator
} from 'react-native'
import { timingAnimation } from '../../../animation/timingAnimation'
import Style from './style'
import { OrderHistoryProductItem } from '../../../components/order-history-product/OrderHistoryProductItem'
import { OrderHistoryConstructorProductItem } from '../../../components/order-history-constructor-product/OrderHistoryConstructorProductItem'
import { OrderHistoryProductWithOptionsItem } from '../../../components/order-history-product-with-options/OrderHistoryProductWithOptionsItem'
import {
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  toggleProductWithOptionsInBasket,
  changeTotalCountProductInBasket
} from '../../../store/basket/actions'
import { SHOPPING_BASKET } from '../../../navigation/pointsNavigate'
import { getProductsHistoryOrder } from '../../../store/history-order/actions'
import { CategoryType } from '../../../helpers/type-category'
import { generateRandomString } from '../../../helpers/utils'
import LottieView from 'lottie-react-native';

class OrderHistoryInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('orderInfo', 'Информация о заказе'),
    }
  }

  constructor(props) {
    super(props)

    this.props.navigation.setParams({ orderInfo: `Заказ #${this.props.selectHistoryOrder.Id}` })

    this.state = {
      showScaleAnimation: new Animated.Value(0),
      showLoaderScaleAnimation: new Animated.Value(0),
      toBasket: false
    }

    this.productToRepeat = []
  }

  componentDidMount = () => this.props.getProductsHistoryOrder(this.props.selectHistoryOrder.Id)

  componentDidUpdate = () => {
    if (this.props.isFetchingProductsHistory) {
      timingAnimation(this.state.showLoaderScaleAnimation, 1, 300, true)
    } else {
      timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    if (this.state.toBasket) {
      this.setState({ toBasket: false }, () => {
        this.changeTotalCountProductInBasket()
        this.props.navigation.navigate(SHOPPING_BASKET)
      })
    }
  }

  getProductById = productId => {
    for (let categoryId in this.props.products) {
      const findProducts = this.props.products[categoryId].filter(p => p.Id == productId)

      if (findProducts && findProducts.length > 0)
        return findProducts[0]
    }

    return null
  }

  productsTransform = () => {
    const productsForRender = []

    for (let productId in this.props.selectHistoryOrder.ProductCount) {
      const count = this.props.selectHistoryOrder.ProductCount[productId]

      if (count == 0) {
        continue
      }

      const item = this.getProductById(productId)

      if (!item || Object.keys(item).length == 0) {
        continue
      }

      this.productToRepeat.push({
        count: count,
        product: item
      })

      productsForRender.push({
        key: item.Id.toString(),
        id: item.Id,
        product: {
          caption: item.Name,
          imageSource: item.Image,
          additionInfo: item.AdditionInfo,
          price: item.Price,
          currencyPrefix: this.props.currencyPrefix,
          count: count
        }
      })
    }
    return productsForRender
  }

  getProducts = () => [...this.props.productsHistory, ...this.props.productsWithOptionsHistory, ...this.props.constructorProductsHistory]

  renderItem = ({ item }) => {
    switch (item.CategoryType) {
      case CategoryType.Default:
        return <OrderHistoryProductItem
          style={this.props.style}
          product={item}
          currencyPrefix={this.props.currencyPrefix}
        />
      case CategoryType.Constructor:
        return <OrderHistoryConstructorProductItem
          style={this.props.style}
          product={item}
          currencyPrefix={this.props.currencyPrefix}
        />
      case CategoryType.WithOptions:
        return <OrderHistoryProductWithOptionsItem
          style={this.props.style}
          product={item}
          currencyPrefix={this.props.currencyPrefix}
        />
    }
  }

  getCategoryById = id => {
    const categories = this.props.categories.filter(p => p.Id == id)

    if (categories && categories.length > 0)
      return categories[0]
    else
      return null
  }

  getConstructorIngredients = (categoryIdHistory, ingredientsHistory) => {
    const constructorCategories = this.props.constructorCategories[categoryIdHistory]
    let constructorIngredients = {}

    for (const constructorCategory of constructorCategories) {
      const ingredients = this.props.ingredients[constructorCategory.Id]
      constructorIngredients[constructorCategory.Id] = {
        constructorCategory: constructorCategory,
        ingredients: ingredients,
        ingredientsCount: this.initIngredientsCountFromHistory(ingredientsHistory, ingredients)
      }
    }

    return constructorIngredients
  }

  initIngredientsCountFromHistory = (ingredientsHistory, ingredients) => {
    let ingredientsCount = {}

    for (let ingredient of ingredients) {
      ingredientsCount[ingredient.Id] = 0
    }

    for (let ingredient of ingredientsHistory) {
      ingredientsCount[ingredient.Id] = ingredient.Count
    }

    return ingredientsCount
  }

  isAllowRepeatOrder = () => {
    let products = this.props.productsHistory.filter(p => !p.IsDeleted)
    let constructorProducts = this.props.constructorProductsHistory.filter(p => !p.IsDeleted)
    const productsWithOptions = this.productWithOptionsForRepeatOrder()

    return products.length > 0 || constructorProducts.length > 0 || productsWithOptions.length > 0
  }

  productWithOptionsForRepeatOrder = () => {
    const products = []

    for (const product of this.props.productsWithOptionsHistory) {
      let isAllow = true

      if (product.IsDeleted) {
        isAllow = false
        continue
      }

      if (Object.keys(product.AdditionalFillings).length) {
        for (let id in product.AdditionalFillings) {
          if (product.AdditionalFillings[id].IsDeleted) {
            isAllow = false
            break
          }
        }
      }

      if (Object.keys(product.AdditionalOptions).length) {
        for (let id in product.AdditionalOptions) {
          const additionalOption = product.AdditionalOptions[id]
          if (additionalOption.IsDeleted) {
            isAllow = false
            break
          }

          if (additionalOption.Items.length > 0)
            isAllow = additionalOption.Items.filter(p => p.IsDeleted).length == 0
        }
      }

      if (isAllow)
        products.push(product)
    }

    return products
  }

  repeatOrder = () => {
    let products = this.props.productsHistory.filter(p => !p.IsDeleted)
    let constructorProducts = this.props.constructorProductsHistory.filter(p => !p.IsDeleted)
    let productWithOptions = this.productWithOptionsForRepeatOrder()

    const basketProductModify = { ...this.props.basketProducts }

    for (let item of products) {
      basketProductModify[item.Id] = {
        categoryId: item.CategoryId,
        count: item.Count,
        index: this.props.products[item.CategoryId].findIndex(p => p.Id == item.Id)
      }
    }

    const basketConstructorProducts = { ...this.props.basketConstructorProducts }

    for (let constructorProduct of constructorProducts) {
      const uniqId = generateRandomString(10)
      const category = this.getCategoryById(constructorProduct.Id)
      const constructorIngredients = this.getConstructorIngredients(constructorProduct.Id, constructorProduct.Ingredients)
      if (!category || !constructorIngredients)
        continue

      basketConstructorProducts[uniqId] = {
        uniqId,
        category: category,
        price: constructorProduct.Price,
        count: constructorProduct.Count,
        constructorIngredients: constructorIngredients
      }
    }

    const basketProductWithOptionsModify = { ...this.props.basketProductsWithOptions }

    for (let product of productWithOptions) {
      const uniqId = generateRandomString()
      const additionalOptions = {}

      if(Object.keys(product.AdditionalOptions).length > 0) {
        for(const id in product.AdditionalOptions) {
          const additionalOptionItem = product.AdditionalOptions[id].Items[0]
          additionalOptions[id] = additionalOptionItem.Id
        }
      }

      basketProductWithOptionsModify[uniqId] = {
        uniqId,
        categoryId: product.CategoryId,
        count: product.Count,
        productId: product.Id,
        additionalOptions,
        additionalFillings: Object.keys(product.AdditionalFillings),
      }
    }

    if (products.length > 0
      || constructorProducts.length > 0
      || productWithOptions.length > 0) {
      products.length > 0 && this.props.toggleProductInBasket(basketProductModify)
      constructorProducts.length > 0 && this.props.toggleConstructorProductInBasket(basketConstructorProducts)
      productWithOptions.length > 0 && this.props.toggleProductWithOptionsInBasket(basketProductWithOptionsModify)
      this.setState({ toBasket: true })
    }
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

  renderLoader = () => {
    return (
      <Animated.View
        style={[
          Style.centerScreen,
          {
            opacity: this.state.showLoaderScaleAnimation,
            transform: [{ scale: this.state.showLoaderScaleAnimation }]
          }
        ]}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </Animated.View>
    )
  }

  renderWrong = () => {
    return (
      <View style={Style.wrongContainer}>
        <View style={Style.wrong}>
          <LottieView
            style={Style.loader}
            source={require('../../../animation/src/wrong.json')}
            autoPlay
            loop={true}
            resizeMode='contain'
            speed={1} />
        </View>
        <Text
          style={[
            Style.wrongText,
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
          ]}>
          Что-то пошло не так...
          </Text>
      </View>
    )
  }

  renderHistoryOrders = () => {
    return (
      <Animated.View
        style={[
          {
            marginTop: 5,
            paddingHorizontal: 12,
            opacity: this.state.showScaleAnimation,
            flex: 1,
            transform: [{ scale: this.state.showScaleAnimation }]
          }
        ]}>
        
          <FlatList
            windowSize={4}
            removeClippedSubviews={Platform.OS !== 'ios'}
            initialNumToRender={4}
            maxToRenderPerBatch={1}
            data={this.getProducts()}
            keyExtractor={item => `${generateRandomString()}_${item.Id.toString()}`}
            renderItem={this.renderItem}
          />
        
        <View
          style={[
            Style.footer,
            this.props.style.theme.dividerColor,
            this.props.style.theme.backdoor,
            this.props.style.theme.shadowColor,
          ]}>
          <Text
            style={[
              this.props.style.theme.primaryTextColor,
              this.props.style.fontSize.h8,
              { marginBottom: 10 }
            ]}>
            Сумма заказа {`${this.props.selectHistoryOrder.AmountPay} ${this.props.currencyPrefix}`}
          </Text>
          <View style={Style.buttonSize}>
            <Button
              disabled={!this.isAllowRepeatOrder()}
              title='Повторить заказ'
              onPress={this.repeatOrder}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.accentOther.backgroundColor}
            />
          </View>
        </View>
      </Animated.View>
    )
  }

  render() {
    if (this.props.isFetchingProductsHistory)
      return this.renderLoader()
    else if (this.props.productsHistory.length > 0 ||
      this.props.constructorProductsHistory.length > 0 ||
      this.props.productsWithOptionsHistory.length > 0)
      return this.renderHistoryOrders()
    else
      return this.renderWrong()
  }
}

const mapStateToProps = state => {
  return {
    serverDomain: state.appSetting.serverDomain,
    currencyPrefix: state.appSetting.currencyPrefix,
    products: state.main.products,
    categories: state.main.categories,
    style: state.style,
    selectHistoryOrder: state.historyOrder.selectOrder,
    basketProducts: state.basket.basketProducts,
    basketConstructorProducts: state.basket.basketConstructorProducts,
    basketProductsWithOptions: state.basket.basketProductsWithOptions,
    constructorCategories: state.main.constructorCategories,
    ingredients: state.main.ingredients,
    isFetchingProductsHistory: state.historyOrder.isFetching,
    productsHistory: state.historyOrder.productsHistory,
    productsWithOptionsHistory: state.historyOrder.productsWithOptionsHistory,
    constructorProductsHistory: state.historyOrder.constructorProductsHistory,
  }
}

const mapDispatchToProps = {
  toggleProductInBasket,
  toggleConstructorProductInBasket,
  toggleProductWithOptionsInBasket,
  changeTotalCountProductInBasket,
  getProductsHistoryOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryInfoScreen)