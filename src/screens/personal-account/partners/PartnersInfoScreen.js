import React from 'react'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';
import { Animated, FlatList, Text, ActivityIndicator, View } from 'react-native'
import Style from './style'
import { timingAnimation } from '../../../animation/timingAnimation'
import { PartnersHeaderBlock } from '../../../components/big-header-content-block/partners-header-block/PartnersHeaderBlock';
import { getPartnersTransaction } from '../../../store/promotion-transaction/actions'
import { priceValid, dateFormatted } from '../../../helpers/utils'
import { TransactionItem } from '../../../components/transaction-item/TransactionItem'
import { PromotionTransactionType } from '../../../logic/promotion/promotion-transaction-type';

class PartnersInfoScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Партнерская программа',
  }

  constructor(props) {
    super(props)

    this.secondText = 'Ваш реферальный код'
    this.state = {
      showAnimation: new Animated.Value(0),
      showAnimationLoader: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    timingAnimation(this.state.showAnimationLoader, 1, 300, true)
    this.props.getPartnersTransaction(this.props.clientId)
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

  renderContentAdditionalBlock = () => {
    if (!this.props.partnerTransactions ||
      this.props.partnerTransactions.length == 0) {
      return this.renderEmpty()
    } else {
      return this.renderTransactions()
    }
  }

  renderTransaction = ({ item }) => {
    return <TransactionItem
      style={this.props.style}
      headerText={this.getHeaderText(item.ReferralPhone)}
      text={dateFormatted(item.Date)}
      money={priceValid(item.Money)}
      transactionType={PromotionTransactionType.Income}
    />
  }

  getHeaderText = referralPhone => {
    return `Реф. ${referralPhone}`
  }

  renderTransactions = () => {
    return (
      <FlatList
        data={this.props.partnerTransactions}
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
            paddingHorizontal: 12,
            opacity: this.state.showAnimation,
            transform: [{ scale: this.state.showAnimation }]
          }
        ]}>
        <PartnersHeaderBlock
          style={this.props.style}
          mainText={this.props.referralCode}
          secondText={this.secondText}
        />
        {this.renderContentAdditionalBlock()}
      </Animated.ScrollView>
    )
  }

  renderEmpty = () => {
    return (
      <View style={[Style.centerScreen, , Style.emptyContainer]}>
        <LottieView
          style={Style.loader}
          source={require('../../../animation/src/search-empty.json')}
          autoPlay
          resizeMode='contain'
          autoSize={true}
          speed={1.5} />
        <Text
          style={[
            this.props.style.theme.primaryTextColor,
            this.props.style.fontSize.h8,
            { marginTop: 20 }
          ]}
        >
          У вас пока нет рефералов
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
    referralCode: state.user.referralCode,
    isFetching: state.promotionTransaction.isFetching,
    partnerTransactions: state.promotionTransaction.partnerTransactions
  }
}

const mapDispatchToProps = {
  getPartnersTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnersInfoScreen)