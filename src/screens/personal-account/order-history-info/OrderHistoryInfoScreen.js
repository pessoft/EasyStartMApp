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
import { timingAnimation } from '../../../animation/timingAnimation'
import Style from './style'
import { OrderHistoryProductItem } from '../../../components/order-history-product/OrderHistoryProductItem';
import { toggleProductInBasket, changeTotalCountProductInBasket } from '../../../store/checkout/actions'
import { SHOPPING_BASKET } from '../../../navigation/pointsNavigate'

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
      toBasket: false
    }

    this.productToRepeat = []
  }

  componentDidMount = () => timingAnimation(this.state.showScaleAnimation, 1, 300, true)
  componentDidUpdate = () => {


    if (this.state.toBasket) {
      this.setState({ toBasket: false }, () => {
        this.changeTotalCountProductInBasket()
        this.props.navigation.navigate(SHOPPING_BASKET)
      })
    }
  }

  getImageSource = imagePath => {
    return { uri: `${this.props.serverDomain}${imagePath}` }
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
          imageSource: this.getImageSource(item.Image),
          additionInfo: item.AdditionInfo,
          price: item.Price,
          currencyPrefix: this.props.currencyPrefix,
          count: count
        }
      })
    }
    return productsForRender
  }

  renderItem = ({ item }) => {
    return <OrderHistoryProductItem
      style={this.props.style}
      product={item.product}
    />
  }

  repeatOrder = () => {
    const basketProductModify = { ...this.props.basketProducts }

    for (let item of this.productToRepeat) {

      basketProductModify[item.product.Id] = {
        categoryId: item.product.CategoryId,
        count: item.count
      }
    }
    this.props.toggleProductInBasket(basketProductModify)
    this.setState({ toBasket: true })
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
        <ScrollView Style={Style.basketProducts}>
          <FlatList
            windowSize={4}
            removeClippedSubviews={Platform.OS !== 'ios'}
            initialNumToRender={4}
            maxToRenderPerBatch={1}
            data={this.productsTransform()}
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
              { marginBottom: 10 }
            ]}>
            Сумма заказа {`${this.props.selectHistoryOrder.AmountPay} ${this.props.currencyPrefix}`}
          </Text>
          <View style={Style.buttonSize}>
            <Button
              title='Повторить заказ'
              onPress={this.repeatOrder}
              color={Platform.OS == 'ios' ?
                this.props.style.theme.accentOther.backgroundColor :
                this.props.style.theme.defaultPrimaryColor.backgroundColor}
            />
          </View>
        </View>
      </Animated.View>
    )
  }
}

const mapStateToProps = state => {
  return {
    serverDomain: state.appSetting.serverDomain,
    currencyPrefix: state.appSetting.currencyPrefix,
    products: state.main.products,
    style: state.style,
    selectHistoryOrder: state.historyOrder.selectOrder,
    basketProducts: state.checkout.basketProducts
  }
}

const mapDispatchToProps = {
  toggleProductInBasket,
  changeTotalCountProductInBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistoryInfoScreen)