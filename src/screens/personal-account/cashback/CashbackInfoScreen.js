import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator, View } from 'react-native'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { ViewMoneyBlock } from '../../../components/big-header-content-block/ViewMoneyBlock';
import { priceValid, dateFormatted } from '../../../helpers/utils'
import { getCashbackTransaction } from '../../../store/promotion-transaction/actions'
import { TransactionItem } from '../../../components/transaction-item/TransactionItem'
import { PromotionTransactionType } from '../../../logic/promotion/promotion-transaction-type';
import { CashbackTransactionType } from '../../../logic/promotion/cashback-transaction-type'

class CashbackInfoScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Кешбек',
  }

  constructor(props) {
    super(props)

    this.secondText = `Кешбек ${props.cashbackSetting.ReturnedValue}% с каждого заказа`
    this.state = {
      showAnimation: new Animated.Value(0),
      showAnimationLoader: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showAnimationLoader, 1, 300, true)
    this.props.getCashbackTransaction(this.props.clientId)
  }

  componentDidUpdate = () => {
    if (!this.props.isFetching)
      timingAnimation(this.state.showAnimation, 1, 300, true)
  }

  renderLoader = () => {
    return (
      <Animated.View
        style={[
          Style.centerScreen,
          {
            opacity: this.state.showAnimationLoader,
            transform: [{ scale: this.state.showAnimationLoader }]
          }
        ]}>
        <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
      </Animated.View>
    )
  }

  cashbackToString = (value) => {
    return `${priceValid(value)} ${this.props.currencyPrefix}`
  }

  renderContentAdditionalBlock = () => {
    if (!this.props.cashbackTransactions ||
      this.props.cashbackTransactions.length == 0) {
      return this.renderEmpty()
    } else {
      return this.renderTransactions()
    }
  }

  getHeaderText = (cashbackTransactionType, orderId) => {
    switch (cashbackTransactionType) {
      case CashbackTransactionType.EnrollmentPurchase:
        return `Кешбек за заказ #${orderId}`
      case CashbackTransactionType.OrderPayment:
        return `Оплата заказа #${orderId}`
    }
  }

  convertCasbackTransactionToPromotionTransaction = cashbackTransactionType => {
    switch (cashbackTransactionType) {
      case CashbackTransactionType.EnrollmentPurchase:
        return PromotionTransactionType.Income
      case CashbackTransactionType.OrderPayment:
        return PromotionTransactionType.Expense
    }
  }

  renderTransaction = ({ item }) => {
    return <TransactionItem
      style={this.props.style}
      headerText={this.getHeaderText(item.TransactionType, item.OrderId)}
      text={dateFormatted(item.Date)}
      money={priceValid(item.Money)}
      transactionType={this.convertCasbackTransactionToPromotionTransaction(item.TransactionType)}
    />
  }

  renderTransactions = () => {
    return (
      <FlatList
        data={this.props.cashbackTransactions}
        keyExtractor={item => item.Id.toString()}
        renderItem={this.renderTransaction}
      />
    )
  }

  renderContent = () => {
    return (
      <Animated.ScrollView
        style={[
          Style.container,
          {
            opacity: this.state.showAnimation,
            transform: [{ scale: this.state.showAnimation }]
          }
        ]}>
        <ViewMoneyBlock
          style={this.props.style}
          mainText={priceValid(this.props.virtualMoney)}
          secondText={this.secondText}
        />
        {this.renderContentAdditionalBlock()}
      </Animated.ScrollView>
    )
  }

  renderEmpty = () => {
    return (
      <View style={[Style.centerScreen, Style.emptyContainer]}>
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
          История кешбека пуста
        </Text>
      </View>
    )
  }

  render() {
    if (this.props.isFetching)
      return this.renderLoader()

    return this.renderContent()
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    clientId: state.user.clientId,
    virtualMoney: state.user.virtualMoney,
    currencyPrefix: state.appSetting.currencyPrefix,
    cashbackSetting: state.main.promotionCashbackSetting,
    isFetching: state.promotionTransaction.isFetching,
    cashbackTransactions: state.promotionTransaction.cashbackTransactions
  }
}

const mapDispatchToProps = {
  getCashbackTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(CashbackInfoScreen)