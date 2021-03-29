import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator } from 'react-native'
import Style from './style'
import { getHistoryOrders, setSelectOrder, setGoToOrderId} from '../../../store/history-order/actions'
import { timingAnimation } from '../../../animation/timingAnimation'
import { MenuItemWithoutImage } from '../../../components/menu-item-without-image/MenuItemWithoutImage'
import { ORDER_HISTORY_INFO_PROFILE } from '../../../navigation/pointsNavigate'
import { dateFormatted } from '../../../helpers/utils'
import BasketIcoWithBadge from '../../../components/badges/basket-badge/BasketIcoWithBadge'
import { MenuItemTwoTextImage } from '../../../components/menu-item-two-text-image/MenuItemTwoTextImage'
import OrderProcessingIcon from '../../../images/font-awesome-svg/hourglass-start.svg'
import OrderDeliveryIcon from '../../../images/font-awesome-svg/truck-container.svg'
import OrderProcessedIcon from '../../../images/font-awesome-svg/check.svg'
import OrderCancelIcon from '../../../images/font-awesome-svg/trash-alt.svg'
import { IntegrationOrderStatus, OrderStatus } from '../../../helpers/order-status'

class OrdersHistoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'История заказов',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
      },
      headerRight: () => <BasketIcoWithBadge
        containerStyle={{ paddingHorizontal: 20 }}
        navigation={navigation}
        width={28}
        height={28}
        animation={true} />
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showLoaderScaleAnimation: new Animated.Value(0),
      showHistoryScaleAnimation: new Animated.Value(0),
      showHistoryEmptyScaleAnimation: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    this.props.getHistoryOrders({
      clientId: this.props.clientId,
      branchId: this.props.branchId
    })
  }

  componentDidUpdate = () => {
    if (this.props.isFetching)
      timingAnimation(this.state.showLoaderScaleAnimation, 1, 300, true)
    else if (this.props.history.length > 0)
      timingAnimation(this.state.showHistoryScaleAnimation, 1, 300, true, this.goToOrderFromPush)
    else
      timingAnimation(this.state.showHistoryEmptyScaleAnimation, 1, 300, true)
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

  getHeaderText = orderNumber => `Заказ #${orderNumber}`
  getText = (date, price) => `${dateFormatted(date)} на ${price} ${this.props.currencyPrefix}`

  getHistoryOrderById = id => {
    let findResult = this.props.history.filter(p => p.Id == id)

    return findResult && findResult.length > 0 ? findResult[0] : null
  }

  goToOrderFromPush = () => {
    if(this.props.goToOrderIdFromPush) {
      this.onSelectOrderId(this.props.goToOrderIdFromPush)
      this.props.setGoToOrderId(0)
    }
  }

  onSelectOrderId = orderId => {
    const order = this.getHistoryOrderById(orderId)

    if (order) {
      this.props.setSelectOrder(order)
      this.props.navigation.navigate(ORDER_HISTORY_INFO_PROFILE)
    }
  }

  renderHistory = () => {
    return (
      <Animated.View
        style={[
          Style.container,
          {
            paddingHorizontal: 12,
            opacity: this.state.showHistoryScaleAnimation,
            transform: [{ scale: this.state.showHistoryScaleAnimation }]
          }
        ]}>
        <FlatList
          data={[...this.props.history].reverse()}
          keyExtractor={item => item.Id.toString()}
          renderItem={this.renderOrder}
        />
      </Animated.View>
    )
  }

  getOrderStatusInfo = order => {
    const status = {
      icon: {},
      iconColor: ''
    }

    if (!order.IntegrationOrderStatus || order.IntegrationOrderStatus == IntegrationOrderStatus.Unknown) {
      switch (order.OrderStatus) {
        case OrderStatus.Processing:
        case OrderStatus.PendingPay:
          status.icon = OrderProcessingIcon
          status.iconColor = this.props.style.theme.primaryTextColor.color
          break
        case OrderStatus.Processed:
          status.icon = OrderProcessedIcon
          status.iconColor = this.props.style.theme.successTextColor.color
          break
        case OrderStatus.Cancellation:
          status.icon = OrderCancelIcon
          status.iconColor = this.props.style.theme.errorTextColor.color
          break
      }
    } else {
      switch (order.IntegrationOrderStatus) {
        case IntegrationOrderStatus.New:
        case IntegrationOrderStatus.Preparing:
          status.icon = OrderProcessingIcon
          status.iconColor = this.props.style.theme.primaryTextColor.color
          break
        case IntegrationOrderStatus.Deliverid:
          status.icon = OrderDeliveryIcon
          status.iconColor = this.props.style.theme.accentOther.backgroundColor
          break
        case IntegrationOrderStatus.Done:
          status.icon = OrderProcessedIcon
          status.iconColor = this.props.style.theme.successTextColor.color
          break
        case IntegrationOrderStatus.Cancel:
          status.icon = OrderCancelIcon
          status.iconColor = this.props.style.theme.errorTextColor.color
          break
      }
    }

    return status
  }

  renderOrder = ({ item }) => {
    const status = this.getOrderStatusInfo(item)
    return <MenuItemTwoTextImage
      style={this.props.style}
      id={item.Id}
      icon={status.icon}
      iconColor={status.iconColor}
      headerText={this.getHeaderText(item.Id)}
      text={this.getText(item.Date, item.AmountPay)}
      onPress={this.onSelectOrderId}
    />
  }

  renderEmpty = () => {
    return (
      <Animated.View
        style={[
          Style.centerScreen,
          {
            opacity: this.state.showHistoryEmptyScaleAnimation,
            transform: [{ scale: this.state.showHistoryEmptyScaleAnimation }]
          }
        ]}>
        <LottieView
          style={Style.loader}
          source={require('../../../animation/src/search-empty.json')}
          autoPlay
          resizeMode='cover'
          autoSize={true}
          speed={1.5} />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            { marginTop: 20 }
          ]}
        >
          История заказов пуста
        </Text>
      </Animated.View>
    )
  }

  render() {
    if (this.props.isFetching)
      return this.renderLoader()

    if (this.props.history.length > 0)
      return this.renderHistory()
    else
      return this.renderEmpty()
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    isFetching: state.historyOrder.isFetching,
    history: state.historyOrder.history,
    goToOrderIdFromPush: state.historyOrder.goToOrderIdFromPush,
    clientId: state.user.clientId,
    branchId: state.user.branchId,
    currencyPrefix: state.appSetting.currencyPrefix
  }
}

const mapDispatchToProps = {
  setSelectOrder,
  getHistoryOrders,
  setGoToOrderId,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistoryScreen)
