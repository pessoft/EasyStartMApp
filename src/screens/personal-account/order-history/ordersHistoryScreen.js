import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator } from 'react-native'
import Style from './style'
import { getHistoryOrder } from '../../../store/history-order/actions'
import { timingAnimation } from '../../../animation/timingAnimation'
import { MenuItemWithoutImage } from '../../../components/menu-item-without-image/MenuItemWithoutImage';

class OrdersHistoryScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'История заказов',
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
    this.props.getHistoryOrder(this.props.clientId)
  }

  componentDidUpdate = () => {
    if (this.props.isFetching)
      timingAnimation(this.state.showLoaderScaleAnimation, 1, 300, true)
    else if (this.props.history.length > 0)
      timingAnimation(this.state.showHistoryScaleAnimation, 1, 300, true)
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
  getText = (date, price) => `${this.getDateFormatted(date)} на ${price} ${this.props.currencyPrefix}`

  getDateFormatted = dateToFormatted => {
    const date = new Date(dateToFormatted)
    return `${date.getHours()}.${date.getMinutes()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} `
  }

  renderHistory = () => {
    return (
      <Animated.ScrollView
        style={[
          Style.container,
          {
            opacity: this.state.showHistoryScaleAnimation,
            transform: [{ scale: this.state.showHistoryScaleAnimation }]
          }
        ]}>
        <FlatList
          data={this.props.history}
          keyExtractor={item => item.Id.toString()}
          renderItem={({ item }) => <MenuItemWithoutImage
            style={this.props.style}
            headerText={this.getHeaderText(item.Id)}
            text={this.getText(item.Date, item.AmountPay)}
          />}
        />
      </Animated.ScrollView>
    )
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
    clientId: state.user.clientId,
    currencyPrefix: state.appSetting.currencyPrefix
  }
}

export default connect(mapStateToProps, { getHistoryOrder })(OrdersHistoryScreen)